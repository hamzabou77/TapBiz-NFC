import React, { useEffect, useState } from 'react';
import { QrCode, Download, Copy, Check, X, ExternalLink, Smartphone } from 'lucide-react';
import { generateQrDataUrl, downloadDataUrl } from '../../lib/qrcode';
import { ClientProfile } from '../../types';

interface QrModalProps {
  client: ClientProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({ client, isOpen, onClose }) => {
  const [qrUrl, setQrUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const fullUrl = `${window.location.origin}/${client.slug}`;

  useEffect(() => {
    if (isOpen) {
      generateQrDataUrl(fullUrl, 400).then((url) => setQrUrl(url));
    }
  }, [isOpen, fullUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (qrUrl) {
      downloadDataUrl(qrUrl, `${client.slug}-qr-code.png`);
    }
  };

  return (
    <div
      id="qr-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="qr-modal-container"
        className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="qr-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mb-3">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-1">{client.business_name}</h3>
        <p className="text-xs text-slate-500 mb-5">Scan with any smartphone camera or NFC tag</p>

        {/* QR Code Container */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center justify-center mb-5">
          {qrUrl ? (
            <img
              src={qrUrl}
              alt={`${client.business_name} QR Code`}
              className="w-56 h-56 rounded-xl shadow-inner bg-white p-2"
            />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center text-slate-400">
              Generating QR Code...
            </div>
          )}
          <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs max-w-full truncate">
            <Smartphone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">{fullUrl}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            id="qr-copy-btn"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-slate-700 font-semibold text-sm transition-all shadow-xs active:scale-98"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Copied!' : 'Copy URL'}</span>
          </button>

          <button
            id="qr-download-btn"
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20 active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>Save QR</span>
          </button>
        </div>
      </div>
    </div>
  );
};

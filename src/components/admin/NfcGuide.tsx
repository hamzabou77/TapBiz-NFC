import React from 'react';
import {
  Smartphone,
  Radio,
  CheckCircle2,
  HelpCircle,
  Download,
  ExternalLink,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles
} from 'lucide-react';

export const NfcGuide: React.FC = () => {
  return (
    <div id="nfc-guide-root" className="space-y-8 max-w-4xl">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">NFC Card Programming & Deployment Guide</h2>
        <p className="text-sm text-slate-500 mt-1">
          Complete practical instructions on how to write client profile URLs onto NFC business cards
        </p>
      </div>

      {/* Primary Workflow Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-600" />
          <span>Step-by-Step NFC Writing Workflow</span>
        </h3>

        <div className="space-y-5">
          {/* Step 1 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Copy the Client's Generated URL</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                In your Admin Dashboard under <strong>Clients</strong>, click the <strong>Copy NFC URL</strong> button next to the client (for example: <code className="text-blue-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">https://mydomain.com/ahmed-car-rental</code>).
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Open Free NFC Writing App</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Download and open <strong>NFC Tools</strong> (Free on Apple App Store & Google Play Store) or <strong>NFC TagWriter by NXP</strong> on your smartphone.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="text-[11px] font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  📱 iPhone (iOS 13+ compatible)
                </span>
                <span className="text-[11px] font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  📱 Android (All NFC-enabled devices)
                </span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Write the URL to the NFC Card</h4>
              <ul className="text-xs text-slate-600 mt-1.5 space-y-1 list-disc list-inside">
                <li>Tap <strong>Write</strong> in NFC Tools</li>
                <li>Tap <strong>Add a record</strong> → Choose <strong>URL / URI</strong></li>
                <li>Paste the copied client URL</li>
                <li>Tap <strong>Write / 38 Bytes</strong></li>
                <li>Hold the NFC card against the top back of your phone until it beeps and confirms <strong>"Write Complete"</strong>!</li>
              </ul>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
              4
            </div>
            <div>
              <h4 className="font-bold text-emerald-950 text-sm">Deliver Card to Client</h4>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                The card is ready. When any client or customer taps it with their smartphone, it instantly opens the client's branded digital card with 1-tap phone, WhatsApp, Google Maps, vCard saving, and Google Reviews!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended NFC Hardware Specifications */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          <span>Recommended NFC Card Hardware</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-900 text-sm mb-1">NTAG213 / NTAG215</div>
            <p className="text-slate-600">
              Standard universal chip. Highly recommended for storing URLs. Read/write memory of 144–504 bytes (more than enough for URLs).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-900 text-sm mb-1">Card Formats</div>
            <p className="text-slate-600">
              Matte Black PVC, Brushed Metal, Bamboo Wood, or NFC Keychain stickers. Any ISO 14443-A standard NFC product works perfectly.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-900 text-sm mb-1">Backside QR Code</div>
            <p className="text-slate-600">
              Always print the client's generated QR code on the back of the physical card as a fail-safe backup for older phones without NFC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Save,
  Check,
  Globe,
  DollarSign,
  Phone,
  Mail,
  Shield,
  Server,
  Terminal,
  ExternalLink,
  Plus,
  Trash2
} from 'lucide-react';
import { SiteSettings, PricingPlan } from '../../types';

interface SettingsViewProps {
  settings: SiteSettings;
  onSaveSettings: (settings: SiteSettings) => Promise<void>;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onSaveSettings,
}) => {
  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handlePriceChange = (planId: string, newPrice: number) => {
    setFormData((prev) => ({
      ...prev,
      pricing_plans: prev.pricing_plans.map((p) =>
        p.id === planId ? { ...p, price: newPrice } : p
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      await onSaveSettings(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div id="settings-view-root" className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Platform Settings & Pricing</h2>
        <p className="text-sm text-slate-500 mt-1">
          Customize your NFC agency branding, editable customer pricing tiers, and custom domain config
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2 animate-fadeIn">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Platform settings and pricing updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Agency Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Globe className="w-5 h-5 text-blue-600" />
            <span>NFC Agency Branding</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Platform / Agency Name
              </label>
              <input
                id="settings-site-name"
                type="text"
                value={formData.site_name}
                onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 text-slate-900 text-sm outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Currency Symbol
              </label>
              <input
                id="settings-currency"
                type="text"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                placeholder="MAD / USD / EUR"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 text-slate-900 text-sm outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Contact Phone / WhatsApp
              </label>
              <input
                id="settings-phone"
                type="tel"
                value={formData.contact_phone}
                onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 text-slate-900 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Contact Email
              </label>
              <input
                id="settings-email"
                type="email"
                value={formData.contact_email}
                onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 text-slate-900 text-sm outline-none"
              />
            </div>
          </div>
        </div>

        {/* Pricing Tiers Editor */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span>Public Homepage Pricing Plans</span>
            </h3>
            <span className="text-xs text-slate-500">Live prices shown to visitors</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formData.pricing_plans.map((plan) => (
              <div
                key={plan.id}
                className={`p-5 rounded-2xl border ${
                  plan.popular ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200 bg-slate-50/50'
                } flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 text-sm">{plan.name}</span>
                    {plan.popular && (
                      <span className="text-[10px] font-bold uppercase bg-blue-600 text-white px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Price ({formData.currency})
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        value={plan.price}
                        onChange={(e) => handlePriceChange(plan.id, Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 font-bold text-slate-900 text-lg outline-none focus:border-blue-500"
                        min="0"
                      />
                      <span className="text-xs font-bold text-slate-600">{formData.currency}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mb-3">{plan.description}</p>
                </div>

                <div className="text-[11px] text-slate-400 font-mono">
                  {plan.billing_period}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
        <div>
          <button
            id="save-settings-btn"
            type="submit"
            disabled={saving}
            className="py-3.5 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 active:scale-98 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Settings & Pricing'}</span>
          </button>
        </div>
      </form>

      {/* Production Deployment & Custom Domain Guide */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Server className="w-5 h-5 text-blue-400" />
          <span>Production Deployment & Custom Domain Setup</span>
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed">
          When you connect your custom domain (e.g. <code className="text-blue-300">touchbizz.ma</code> or <code className="text-blue-300">mydomain.com</code>), all generated client URLs like <code className="text-blue-300">https://touchbizz.ma/ahmed-car-rental</code> work automatically.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
            <div className="font-bold text-white text-sm">DNS Record Configuration</div>
            <div className="font-mono text-[11px] text-slate-300 bg-slate-900 p-2.5 rounded-xl space-y-1">
              <div>Type: A | Host: @ | Value: [Your Server IP]</div>
              <div>Type: CNAME | Host: www | Value: @</div>
            </div>
            <p className="text-slate-400 text-[11px]">
              Set this up with your domain registrar (Namecheap, GoDaddy, Hostinger, etc.).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
            <div className="font-bold text-white text-sm">Production Start Command</div>
            <div className="font-mono text-[11px] text-slate-300 bg-slate-900 p-2.5 rounded-xl">
              npm run build && npm start
            </div>
            <p className="text-slate-400 text-[11px]">
              Automatically starts the high-performance unified server and serves all dynamic client URLs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

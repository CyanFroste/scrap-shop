import React, { useState } from 'react';
import clsx from 'clsx';

interface PickupFormProps {
  whatsappNumber: string;
}

export default function PickupForm({ whatsappNumber }: PickupFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [requestType, setRequestType] = useState<'pickup' | 'call'>('pickup');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const cleanPhone = phone.trim().replace(/\D/g, '');

    if (!trimmedName) {
      setError('Please enter your name.');
      return;
    }

    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setError('');
    setSubmitted(true);

    const actionText = requestType === 'pickup' ? 'Schedule a Doorstep Pickup' : 'Request a Callback';
    const messageLines = [
      `👋 *New Service Request: ${actionText}*`,
      `━━━━━━━━━━━━━━━━━━`,
      `👤 *Name:* ${trimmedName}`,
      `📞 *Customer Phone:* ${cleanPhone}`,
      details.trim() ? `📝 *Details / Scrap Items:* ${details.trim()}` : `📝 *Details:* General scrap pickup`,
      `━━━━━━━━━━━━━━━━━━`,
      `Sent via Website Booking Form`,
    ];

    const encodedMessage = encodeURIComponent(messageLines.join('\n'));
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Non-blocking if popup blocked
    }
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setDetails('');
    setSubmitted(false);
    setError('');
  };

  return (
    <section id="schedule-pickup" className="scroll-mt-20 py-16 bg-white dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <span>Fast & Convenient</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Schedule a Call / Pickup
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Fill in your details below and our coordinator will call you to confirm your scrap pickup time.
          </p>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-800/80 rounded-2xl p-6 sm:p-10 shadow-lg border border-zinc-200 dark:border-zinc-700">
          {submitted ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl">
                ✓
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Pickup Request Submitted!
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-zinc-900 dark:text-white">{name}</span>. We have recorded your request and our dispatch team will call you at <span className="font-mono font-semibold text-zinc-900 dark:text-white">{phone}</span> shortly.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-xl bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 text-sm font-semibold transition-colors cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Request Type Toggle */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                  What would you like to do?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRequestType('pickup')}
                    className={clsx(
                      'py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer',
                      requestType === 'pickup'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:border-emerald-500'
                    )}
                  >
                    <span>🚚</span>
                    <span>Doorstep Pickup</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRequestType('call')}
                    className={clsx(
                      'py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer',
                      requestType === 'call'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:border-emerald-500'
                    )}
                  >
                    <span>📞</span>
                    <span>Request Callback</span>
                  </button>
                </div>
              </div>

              {/* Field 1: Name */}
              <div>
                <label htmlFor="customer-name" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-1.5">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="customer-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                />
              </div>

              {/* Field 2: Customer Phone Number */}
              <div>
                <label htmlFor="customer-phone" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-1.5">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                    +91
                  </span>
                  <input
                    id="customer-phone"
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full pl-14 pr-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm font-mono"
                  />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  We will call you on this number to confirm the appointment and timing.
                </p>
              </div>

              {/* Field 3: Optional Details */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="customer-details" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    Details of Scrap / Service Request
                  </label>
                  <span className="text-xs text-zinc-500 font-normal">Optional</span>
                </div>
                <textarea
                  id="customer-details"
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="e.g. Approx 20kg old newspapers, 2 broken plastic chairs, 1 split AC, or preferred pickup time..."
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm resize-none"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-medium">
                  ⚠️ {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>📅</span>
                <span>
                  {requestType === 'pickup' ? 'Schedule a Pickup' : 'Request a Callback'}
                </span>
              </button>

              <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
                🔒 Free doorstep service. No hidden charges. Verified digital weighing scale.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

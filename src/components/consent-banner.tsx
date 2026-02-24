import { useState } from "react";

const CONSENT_KEY = "analytics-consent";

export type ConsentStatus = "accepted" | "declined" | null;

export function getConsentStatus(): ConsentStatus {
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "accepted" || stored === "declined") {
    return stored;
  }
  return null;
}

export function hasAnalyticsConsent(): boolean {
  return getConsentStatus() === "accepted";
}

const ConsentBanner = () => {
  const [visible, setVisible] = useState(() => getConsentStatus() === null);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full z-500 p-4 px-6 bg-white/95 backdrop-blur-sm border-t-2 border-[var(--blue)] shadow-lg">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-center sm:text-left min-w-0">
          <span className="block text-xs text-gray-800 mb-1">
            This site doesn't use cookies or collect any personally-identifyable data, but it does use anonymized analytics to see which pages people visit most often. It's more than okay to opt-out anytime! 
          </span>
          <span className="block text-xs text-gray-500">
            I'm asking because of the{" "}
            <a
              href="https://gdpr.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[--purple]"
            >
              GDPR
            </a>
            {" "}and{" "}
            <a
              href="https://digital-strategy.ec.europa.eu/en/policies/eprivacy-regulation"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--purple)]"
            >
              ePrivacy Directive
            </a>
            {" "}— EU regulations intended to give you control over how your data is used.
          </span>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-[var(--blue)] text-white rounded-md hover:opacity-90 transition-opacity"
          >
            yes 👍
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="px-4 py-2 text-sm border border-[var(--blue)] text-[var(--blue)] rounded-md hover:bg-gray-100 transition-colors"
          >
            no 👎
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;

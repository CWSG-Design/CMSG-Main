import { useState } from "react";
import { Link2, Check } from "lucide-react";

interface ShareBarProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
  /** "icon-only" renders just icon buttons; "full" renders labelled buttons */
  variant?: "icon-only" | "full";
}

// Twitter/X SVG icon (lucide doesn't have X/Twitter)
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function ShareBar({ url, title, description, className = "", variant = "icon-only" }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title ?? "Canadian Wholesale Sign Group — Premium LED Channel Letters";
  const shareDescription = description ?? "Canada's dedicated wholesale signage partner since 2014. Premium LED channel letters, fascia signs, pylon signs, and custom interior signage shipped coast-to-coast.";

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);
  const encodedDesc = encodeURIComponent(shareDescription);

  const platforms = [
    {
      label: "Share on X",
      shortLabel: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <XIcon className="h-4 w-4" />,
      color: "hover:bg-black hover:text-white hover:border-black",
    },
    {
      label: "Share on LinkedIn",
      shortLabel: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDesc}`,
      icon: <LinkedInIcon className="h-4 w-4" />,
      color: "hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]",
    },
    {
      label: "Share on Facebook",
      shortLabel: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon className="h-4 w-4" />,
      color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select text
    }
  };

  if (variant === "full") {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        <span className="text-xs uppercase tracking-[0.18em] text-stone-500 font-semibold mr-1">Share</span>
        {platforms.map((p) => (
          <a
            key={p.label}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={p.label}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-300 text-stone-600 text-xs font-medium transition-all duration-150 ${p.color}`}
          >
            {p.icon}
            {p.shortLabel}
          </a>
        ))}
        <button
          onClick={handleCopy}
          aria-label="Copy link"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-300 text-stone-600 text-xs font-medium transition-all duration-150 hover:bg-sage hover:text-forest hover:border-sage"
        >
          {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    );
  }

  // icon-only variant
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {platforms.map((p) => (
        <a
          key={p.label}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={p.label}
          className={`h-9 w-9 rounded-full border border-stone-300 flex items-center justify-center text-stone-500 transition-all duration-150 ${p.color}`}
        >
          {p.icon}
        </a>
      ))}
      <button
        onClick={handleCopy}
        aria-label="Copy link"
        className="h-9 w-9 rounded-full border border-stone-300 flex items-center justify-center text-stone-500 transition-all duration-150 hover:bg-sage hover:text-forest hover:border-sage"
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}

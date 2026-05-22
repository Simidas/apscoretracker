export default function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Logo & Copyright */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 48 L24 32 L36 40 L56 16"
                  stroke="#00E5CC"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M52 16 L56 16 L56 20"
                  stroke="#00E5CC"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-display font-semibold text-text-primary">
                AP Score Tracker
              </span>
            </a>
            <p className="text-sm text-text-secondary">
              © 2026 Weldon. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href="#"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="mailto:weldonz2026@gmail.com"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Contact
            </a>
          </div>

          {/* AP Trademark */}
          <div>
            <p className="text-xs text-text-secondary leading-relaxed">
              &quot;AP&quot; is a registered trademark of College Board. AP Score Tracker
              is not affiliated with, endorsed by, or approved by College Board.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

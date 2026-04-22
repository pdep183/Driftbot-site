"use client";
import { useState } from "react";

const COLORS = {
  bg: "#060A14",
  bgCard: "#0C1222",
  bgCardHover: "#111B2E",
  blue: "#3B82F6",
  blueLight: "#60A5FA",
  blueDim: "rgba(59,130,246,0.08)",
  blueBorder: "rgba(59,130,246,0.15)",
  green: "#10B981",
  greenDim: "rgba(16,185,129,0.1)",
  white: "#F8FAFC",
  gray100: "#E2E8F0",
  gray300: "#94A3B8",
  gray400: "#64748B",
  gray500: "#475569",
  gray800: "#1E293B",
};

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{
        fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700,
        color: COLORS.white, marginBottom: 16, letterSpacing: "-0.01em",
        paddingBottom: 12, borderBottom: `1px solid ${COLORS.blueBorder}`
      }}>{title}</h2>
      <div style={{ fontSize: 15, color: COLORS.gray300, lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.blue} strokeWidth="2.5" strokeLinecap="round" style={{ marginTop: 3, flexShrink: 0 }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const section = { maxWidth: 1100, margin: "0 auto", padding: "0 24px" };

  return (
    <div style={{ background: COLORS.bg, color: COLORS.white, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(59,130,246,0.3); }
        button:hover { opacity: 0.92; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-nav { display: flex !important; }
          .footer-inner { flex-direction: column !important; text-align: center !important; gap: 16px !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-nav { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ ...section, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 10 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.white }}>drift<span style={{ color: COLORS.blue }}>bot</span><span style={{ color: COLORS.gray500, fontWeight: 400 }}>.ai</span></span>
        </a>
        <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <a href="/#features" style={{ color: COLORS.gray400, textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Features</a>
          <a href="/#pricing" style={{ color: COLORS.gray400, textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Pricing</a>
          <a href="/#faq" style={{ color: COLORS.gray400, textDecoration: "none", fontSize: 14, fontWeight: 500 }}>FAQ</a>
          <a href="/#waitlist" style={{
            background: COLORS.blue, color: "#fff", padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600,
            textDecoration: "none", border: "none"
          }}>Get early access</a>
        </div>
        <div className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", flexDirection: "column", gap: 5, cursor: "pointer", padding: 4 }}>
          <span style={{ width: 22, height: 2, background: COLORS.gray300, borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ width: 22, height: 2, background: COLORS.gray300, borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 22, height: 2, background: COLORS.gray300, borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-nav" style={{ display: "none", flexDirection: "column", gap: 16, padding: "16px 24px 24px", background: COLORS.bgCard, borderBottom: `1px solid ${COLORS.blueBorder}`, position: "relative", zIndex: 10 }}>
          <a href="/#features" onClick={() => setMenuOpen(false)} style={{ color: COLORS.gray300, textDecoration: "none", fontSize: 16, fontWeight: 500 }}>Features</a>
          <a href="/#pricing" onClick={() => setMenuOpen(false)} style={{ color: COLORS.gray300, textDecoration: "none", fontSize: 16, fontWeight: 500 }}>Pricing</a>
          <a href="/#faq" onClick={() => setMenuOpen(false)} style={{ color: COLORS.gray300, textDecoration: "none", fontSize: 16, fontWeight: 500 }}>FAQ</a>
          <a href="/#waitlist" onClick={() => setMenuOpen(false)} style={{
            background: COLORS.blue, color: "#fff", padding: "12px 20px", borderRadius: 8, fontSize: 15, fontWeight: 600,
            textDecoration: "none", border: "none", textAlign: "center"
          }}>Get early access</a>
        </div>
      )}

      {/* HEADER */}
      <div style={{ borderBottom: `1px solid ${COLORS.blueBorder}`, padding: "60px 0 48px" }}>
        <div style={section}>
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.blue, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>Legal</div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 15, color: COLORS.gray500 }}>Effective date: April 2026 · Driftbot AI · Montreal, Quebec, Canada</p>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ ...section, padding: "60px 24px 100px", maxWidth: 780 }}>

        <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.blueBorder}`, borderRadius: 12, padding: "20px 24px", marginBottom: 48, fontSize: 14, color: COLORS.gray400, lineHeight: 1.7 }}>
          Your privacy matters to us. This policy explains what data Driftbot AI collects, how we use it, and what rights you have. We've written it in plain language — no legalese. If you have questions, email us at{" "}
          <a href="mailto:support@driftbot.ai" style={{ color: COLORS.blueLight, textDecoration: "none" }}>support@driftbot.ai</a>.
        </div>

        <Section title="1. Who We Are">
          <p>Driftbot AI is a company incorporated in Montreal, Quebec, Canada. We operate the Driftbot platform — an AI-powered sales agent that businesses embed on their websites to engage visitors, qualify leads, and book meetings.</p>
          <p style={{ marginTop: 12 }}>When this policy refers to <strong style={{ color: COLORS.white }}>"Driftbot," "we," "us,"</strong> or <strong style={{ color: COLORS.white }}>"our,"</strong> it means Driftbot AI. When it refers to <strong style={{ color: COLORS.white }}>"you,"</strong> it means either a business customer using our platform or an end user visiting a website that has Driftbot installed.</p>
        </Section>

        <Section title="2. What Data We Collect">
          <p>We collect the minimum data needed to provide and improve our service.</p>

          <p style={{ marginTop: 20, marginBottom: 4, fontWeight: 600, color: COLORS.white }}>From business customers (you, if you sign up for Driftbot):</p>
          <BulletList items={[
            "Name and email address (used to create and manage your account)",
            "Website URL (so we can scan your site and configure your AI agent)",
            "Billing information (processed by Stripe — we never store your card details)",
            "Account preferences and settings",
          ]} />

          <p style={{ marginTop: 20, marginBottom: 4, fontWeight: 600, color: COLORS.white }}>From end users (visitors who chat with Driftbot on your website):</p>
          <BulletList items={[
            "Name and email address (if voluntarily provided during a conversation)",
            "Chat conversation content (the messages exchanged with the Driftbot agent)",
            "Booking details (name, email, and time slot when a meeting is scheduled)",
          ]} />

          <p style={{ marginTop: 20, marginBottom: 4, fontWeight: 600, color: COLORS.white }}>Automatically collected data:</p>
          <BulletList items={[
            "Usage analytics: pages visited, features used, session duration",
            "Device and browser information (type, operating system, screen size)",
            "IP address and approximate geographic location (country/city level)",
            "Cookies and similar tracking technologies (see Section 4)",
          ]} />
        </Section>

        <Section title="3. Why We Collect It">
          <p>We only collect data for specific, legitimate purposes:</p>
          <BulletList items={[
            "To provide the Driftbot service — running your AI agent, routing conversations, booking meetings, and syncing with your connected tools",
            "To process payments securely via Stripe",
            "To improve our product — understanding how people use Driftbot helps us build better features and fix issues",
            "To communicate with you — account updates, product announcements, and responses to support requests",
            "To ensure security and prevent fraud or abuse of our platform",
            "To comply with legal obligations under Canadian and applicable international law",
          ]} />
          <p style={{ marginTop: 16 }}>We do not sell your data. We do not use your data for advertising. We do not share conversation data with third parties except as described in Section 5.</p>
        </Section>

        <Section title="4. Cookies & Tracking">
          <p>We use cookies and similar technologies to keep you logged in, remember your preferences, and understand how our product is being used.</p>

          <p style={{ marginTop: 20, marginBottom: 4, fontWeight: 600, color: COLORS.white }}>Types of cookies we use:</p>
          <BulletList items={[
            "Essential cookies — required for the platform to function (authentication, session management). These cannot be disabled.",
            "Analytics cookies — help us understand usage patterns (e.g., which features are used most). These are anonymized where possible.",
            "Preference cookies — remember your settings and configuration choices.",
          ]} />

          <p style={{ marginTop: 16 }}>The Driftbot chat widget embedded on third-party websites uses a session cookie to maintain conversation continuity. No cross-site tracking is performed on end users. You can control or delete cookies through your browser settings at any time.</p>
        </Section>

        <Section title="5. Third-Party Services">
          <p>We work with a small number of trusted third-party providers to deliver our service. Each has been selected for their privacy and security standards.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
            {[
              { name: "Stripe", purpose: "Payment processing. Stripe handles all billing and card data. We never store your payment details. Stripe is PCI-DSS Level 1 certified.", link: "https://stripe.com/privacy" },
              { name: "Google Calendar", purpose: "Meeting booking. When you connect your calendar, Driftbot can schedule meetings on your behalf. We only request the minimum permissions needed (create/read events).", link: "https://policies.google.com/privacy" },
              { name: "HubSpot", purpose: "CRM integration. If you connect HubSpot, qualified lead data is pushed to your HubSpot account. You control what data is synced.", link: "https://legal.hubspot.com/privacy-policy" },
              { name: "Analytics provider", purpose: "Product analytics. We use aggregated, anonymized analytics to understand how Driftbot is being used and where to invest in improvements. Individual users are not identified.", link: null },
            ].map((item, i) => (
              <div key={i} style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.blueBorder}`, borderRadius: 10, padding: "16px 20px" }}>
                <div style={{ fontWeight: 600, color: COLORS.white, marginBottom: 6 }}>{item.name}</div>
                <div style={{ fontSize: 14, color: COLORS.gray400, lineHeight: 1.6 }}>{item.purpose}</div>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 16 }}>We require all third-party providers to handle data only as instructed and to maintain appropriate security standards.</p>
        </Section>

        <Section title="6. Data Retention">
          <p>We retain data only for as long as necessary to provide the service and meet legal requirements.</p>
          <BulletList items={[
            "Account data is retained for the life of your account and deleted within 30 days of account closure.",
            "Chat conversation data is retained for 12 months by default. Business customers can configure shorter retention periods in their dashboard.",
            "Billing records are retained for 7 years as required by Canadian tax law.",
            "Analytics data is retained in aggregated, anonymized form for up to 24 months.",
          ]} />
          <p style={{ marginTop: 16 }}>When data is deleted, it is removed from our active systems within 30 days and from backups within 90 days.</p>
        </Section>

        <Section title="7. Your Rights">
          <p>Depending on where you are located, you have rights over your personal data. We honor these rights regardless of your jurisdiction.</p>

          <BulletList items={[
            "Access — request a copy of the personal data we hold about you",
            "Correction — ask us to fix inaccurate or incomplete data",
            "Deletion — request that we delete your personal data (subject to legal retention requirements)",
            "Portability — receive your data in a structured, machine-readable format",
            "Objection — object to how we process your data for specific purposes",
            "Withdrawal of consent — where processing is based on consent, you can withdraw it at any time",
          ]} />

          <p style={{ marginTop: 16 }}>To exercise any of these rights, email <a href="mailto:support@driftbot.ai" style={{ color: COLORS.blueLight, textDecoration: "none" }}>support@driftbot.ai</a>. We will respond within 30 days. We may need to verify your identity before processing your request.</p>
        </Section>

        <Section title="8. PIPEDA & GDPR Compliance">
          <p style={{ marginBottom: 16 }}>Driftbot AI is headquartered in Canada and complies with the <strong style={{ color: COLORS.white }}>Personal Information Protection and Electronic Documents Act (PIPEDA)</strong>, Canada's federal private-sector privacy law.</p>

          <p style={{ marginBottom: 8, fontWeight: 600, color: COLORS.white }}>Under PIPEDA, we commit to:</p>
          <BulletList items={[
            "Collecting only the information necessary for identified purposes",
            "Obtaining meaningful consent before collecting personal information",
            "Protecting data with appropriate security safeguards",
            "Being transparent about our data practices",
            "Giving individuals access to their information upon request",
          ]} />

          <p style={{ marginTop: 20, marginBottom: 8, fontWeight: 600, color: COLORS.white }}>For users in the European Economic Area (GDPR):</p>
          <BulletList items={[
            "Our legal bases for processing are: contract performance (providing the service), legitimate interests (product improvement and security), and consent (marketing communications).",
            "International data transfers to Canada are covered by Canada's adequacy status under GDPR.",
            "You have the right to lodge a complaint with your local data protection authority.",
          ]} />
        </Section>

        <Section title="9. Data Security">
          <p>We take the security of your data seriously. Our measures include:</p>
          <BulletList items={[
            "Encryption in transit (TLS 1.2+) and at rest (AES-256)",
            "Access controls — only authorized personnel can access customer data, on a need-to-know basis",
            "Regular security reviews and vulnerability assessments",
            "Incident response procedures — if a breach occurs, affected users will be notified within 72 hours",
          ]} />
          <p style={{ marginTop: 16 }}>No system is 100% secure. If you discover a security vulnerability, please disclose it responsibly to <a href="mailto:support@driftbot.ai" style={{ color: COLORS.blueLight, textDecoration: "none" }}>support@driftbot.ai</a>.</p>
        </Section>

        <Section title="10. Children's Privacy">
          <p>Driftbot is not intended for children under 13, and we do not knowingly collect personal information from anyone under 13. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.</p>
        </Section>

        <Section title="11. Changes to This Policy">
          <p>We may update this policy from time to time. When we make material changes, we'll notify you by email (if you're a registered customer) and update the effective date at the top of this page. Continued use of Driftbot after changes take effect constitutes acceptance of the updated policy.</p>
        </Section>

        <Section title="12. Contact Us">
          <p>If you have any questions about this privacy policy or how we handle your data, please reach out:</p>
          <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.blueBorder}`, borderRadius: 12, padding: "24px", marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontWeight: 600, color: COLORS.white, fontFamily: "'Outfit', sans-serif" }}>Driftbot AI</div>
            <div style={{ color: COLORS.gray400, fontSize: 14 }}>Montreal, Quebec, Canada</div>
            <a href="mailto:support@driftbot.ai" style={{ color: COLORS.blueLight, textDecoration: "none", fontSize: 14 }}>support@driftbot.ai</a>
          </div>
        </Section>

      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${COLORS.blueBorder}`, padding: "40px 0" }}>
        <div className="footer-inner" style={{ ...section, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16 }}>drift<span style={{ color: COLORS.blue }}>bot</span><span style={{ color: COLORS.gray500, fontWeight: 400 }}>.ai</span></span>
          </div>
          <div style={{ fontSize: 13, color: COLORS.gray500 }}>© 2026 Driftbot AI Inc. All rights reserved.</div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="/privacy" style={{ color: COLORS.gray500, textDecoration: "none", fontSize: 13 }}>Privacy</a>
            <a href="#" style={{ color: COLORS.gray500, textDecoration: "none", fontSize: 13 }}>Terms</a>
            <a href="#" style={{ color: COLORS.gray500, textDecoration: "none", fontSize: 13 }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

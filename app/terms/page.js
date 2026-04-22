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

export default function TermsPage() {
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
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src="/logo-text.svg" alt="Driftbot" style={{ height: 28, width: "auto" }} />
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
            Terms of Service
          </h1>
          <p style={{ fontSize: 15, color: COLORS.gray500 }}>Effective date: April 2026 · Driftbot AI · Ontario, Canada</p>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ ...section, padding: "60px 24px 100px", maxWidth: 780 }}>

        <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.blueBorder}`, borderRadius: 12, padding: "20px 24px", marginBottom: 48, fontSize: 14, color: COLORS.gray400, lineHeight: 1.7 }}>
          By signing up for or using Driftbot, you agree to these Terms of Service. Please read them — they're written in plain language. If you have questions, email us at{" "}
          <a href="mailto:support@driftbot.ai" style={{ color: COLORS.blueLight, textDecoration: "none" }}>support@driftbot.ai</a>.
        </div>

        <Section title="1. Acceptance of Terms">
          <p>By creating an account or using the Driftbot platform in any way, you agree to be bound by these Terms of Service and our <a href="/privacy" style={{ color: COLORS.blueLight, textDecoration: "none" }}>Privacy Policy</a>. If you are accepting on behalf of a company or organization, you represent that you have the authority to bind that entity to these terms.</p>
          <p style={{ marginTop: 12 }}>If you do not agree to these terms, do not use Driftbot.</p>
        </Section>

        <Section title="2. Description of Service">
          <p>Driftbot is a software-as-a-service (SaaS) platform that provides AI-powered sales agents for websites. The service enables businesses to:</p>
          <BulletList items={[
            "Embed an AI chat agent on their website to engage visitors in real time",
            "Automatically qualify leads based on custom criteria",
            "Book meetings directly into connected calendars (Google Calendar, Calendly)",
            "Sync lead data to CRM tools such as HubSpot",
            "Monitor conversation analytics and lead performance",
          ]} />
          <p style={{ marginTop: 16 }}>We reserve the right to modify, add, or remove features at any time. We will provide reasonable notice for any changes that materially reduce the core functionality of the service.</p>
        </Section>

        <Section title="3. Account Registration">
          <p>To use Driftbot, you must create an account. You agree to:</p>
          <BulletList items={[
            "Provide accurate and complete information when registering",
            "Keep your account credentials secure and not share them with others",
            "Notify us immediately at support@driftbot.ai if you suspect unauthorized access to your account",
            "Take responsibility for all activity that occurs under your account",
          ]} />
          <p style={{ marginTop: 16 }}>You must be at least 18 years old and legally capable of entering into contracts to use Driftbot. Accounts registered on behalf of a business must be created by an authorized representative.</p>
        </Section>

        <Section title="4. Subscription Plans & Billing">
          <p>Driftbot offers three paid subscription tiers. All prices are in USD and billed monthly unless otherwise stated.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16, marginBottom: 16 }}>
            {[
              { name: "Starter", price: "$49/month", desc: "1 AI agent, 500 conversations/month, Google Calendar sync, basic analytics." },
              { name: "Growth", price: "$129/month", desc: "3 AI agents, unlimited conversations, HubSpot integration, lead scoring, advanced analytics, and priority AI support." },
              { name: "Scale", price: "$299/month", desc: "Unlimited AI agents, custom AI training, Salesforce integration, multi-language support, dedicated support channel, and 99.9% uptime SLA." },
            ].map((plan, i) => (
              <div key={i} style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.blueBorder}`, borderRadius: 10, padding: "16px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ minWidth: 80 }}>
                  <div style={{ fontWeight: 700, color: COLORS.white, fontFamily: "'Outfit', sans-serif" }}>{plan.name}</div>
                  <div style={{ fontSize: 13, color: COLORS.blue, fontWeight: 600 }}>{plan.price}</div>
                </div>
                <div style={{ fontSize: 14, color: COLORS.gray400, lineHeight: 1.6 }}>{plan.desc}</div>
              </div>
            ))}
          </div>

          <BulletList items={[
            "Payments are processed securely through Stripe. By subscribing, you authorize Driftbot to charge your payment method on a recurring monthly basis.",
            "Subscriptions renew automatically unless cancelled before the renewal date.",
            "We do not store your credit card details — all billing is handled by Stripe.",
            "Prices may change with 30 days' notice. Existing subscribers will be notified by email before any price increase takes effect.",
            "All fees are non-refundable except where required by law or at our sole discretion.",
          ]} />
        </Section>

        <Section title="5. Free Trial & Beta Access">
          <p>Driftbot is currently in beta. During the beta period:</p>
          <BulletList items={[
            "Access may be provided free of charge or at a reduced rate.",
            "Features, limits, and availability may change without notice.",
            "Beta access does not constitute a guarantee of continued free access once paid plans launch.",
            "We may discontinue the beta or transition to paid plans at any time with reasonable notice.",
          ]} />
          <p style={{ marginTop: 16 }}>If a free trial is offered outside the beta period, it will be for the duration stated at signup. No credit card is required for trials unless explicitly stated. Trials automatically expire at the end of the trial period — your account will not be charged unless you actively subscribe to a paid plan.</p>
        </Section>

        <Section title="6. Acceptable Use Policy">
          <p>You may only use Driftbot for lawful purposes and in a manner consistent with these terms. The following are strictly prohibited:</p>
          <BulletList items={[
            "Using Driftbot to send unsolicited messages, spam, or engage in any form of mass marketing without recipient consent",
            "Using the platform for any illegal activity, including fraud, phishing, or impersonation",
            "Configuring the AI agent to make false or misleading claims to visitors",
            "Attempting to reverse engineer, scrape, or extract the underlying models or infrastructure of the Driftbot platform",
            "Reselling or sublicensing access to Driftbot without our written permission",
            "Uploading or transmitting malicious code, viruses, or any content that could harm our systems or other users",
            "Abusing the AI agent to generate harmful, discriminatory, or offensive content",
            "Using Driftbot in a way that violates any applicable privacy laws, including collecting visitor data without proper consent disclosures on your website",
          ]} />
          <p style={{ marginTop: 16 }}>We reserve the right to suspend or terminate accounts that violate this policy, with or without prior notice depending on severity.</p>
        </Section>

        <Section title="7. Intellectual Property">
          <p style={{ marginBottom: 16 }}>Ownership is straightforward: we own the platform, you own your data.</p>

          <p style={{ marginBottom: 8, fontWeight: 600, color: COLORS.white }}>Driftbot owns:</p>
          <BulletList items={[
            "The Driftbot platform, software, AI models, algorithms, and infrastructure",
            "The Driftbot name, logo, and all associated branding",
            "All improvements, enhancements, and derivative works created by Driftbot",
          ]} />

          <p style={{ marginTop: 20, marginBottom: 8, fontWeight: 600, color: COLORS.white }}>You own:</p>
          <BulletList items={[
            "All data you upload or provide to Driftbot (your website content, custom responses, CRM data)",
            "Conversation transcripts generated through your AI agent",
            "Lead data collected through your Driftbot account",
          ]} />

          <p style={{ marginTop: 16 }}>By using Driftbot, you grant us a limited, non-exclusive license to process your data solely to provide and improve the service. We do not claim ownership of your data and will not use it for any purpose outside of delivering the service to you.</p>
        </Section>

        <Section title="8. Data & Privacy">
          <p>Your use of Driftbot is also governed by our <a href="/privacy" style={{ color: COLORS.blueLight, textDecoration: "none" }}>Privacy Policy</a>, which is incorporated into these Terms by reference. The Privacy Policy explains what data we collect, how we use it, and your rights as a user.</p>
          <p style={{ marginTop: 12 }}>As a Driftbot customer, you are responsible for ensuring that your use of the platform complies with applicable privacy laws in your jurisdiction — including obtaining any necessary consent from your website visitors before deploying the Driftbot chat agent.</p>
        </Section>

        <Section title="9. Service Availability & Uptime">
          <p>We work hard to keep Driftbot reliable and available. However:</p>
          <BulletList items={[
            "Driftbot is provided 'as is' without an uptime guarantee for Starter and Growth plan subscribers.",
            "Scale plan subscribers receive a 99.9% monthly uptime SLA. In the event of a breach, affected customers will receive a pro-rated service credit.",
            "Scheduled maintenance will be communicated in advance where possible.",
            "We are not liable for downtime caused by third-party services (e.g., Stripe, Google, HubSpot) or factors outside our reasonable control.",
          ]} />
        </Section>

        <Section title="10. Limitation of Liability">
          <p>To the maximum extent permitted by applicable law:</p>
          <BulletList items={[
            "Driftbot AI is not liable for any indirect, incidental, special, consequential, or punitive damages — including lost profits, lost data, or loss of business — arising from your use of the service.",
            "Our total liability to you for any claim arising out of or related to these terms or the service is limited to the amount you paid us in the 3 months preceding the claim.",
            "We do not warrant that the service will be error-free, uninterrupted, or meet your specific requirements.",
          ]} />
          <p style={{ marginTop: 16 }}>Nothing in these terms limits liability for fraud, gross negligence, or any other liability that cannot be excluded under applicable Canadian law.</p>
        </Section>

        <Section title="11. Termination & Cancellation">
          <p style={{ marginBottom: 16 }}>You can cancel your Driftbot subscription at any time — no questions asked.</p>

          <p style={{ marginBottom: 8, fontWeight: 600, color: COLORS.white }}>If you cancel:</p>
          <BulletList items={[
            "Your subscription will remain active until the end of the current billing period.",
            "You will not be charged again after cancellation.",
            "Your account data will be retained for 30 days after the subscription ends, during which you can export it.",
            "After 30 days, your data will be permanently deleted from our systems.",
          ]} />

          <p style={{ marginTop: 20, marginBottom: 8, fontWeight: 600, color: COLORS.white }}>We may suspend or terminate your account if:</p>
          <BulletList items={[
            "You violate these Terms of Service or our Acceptable Use Policy",
            "Your payment fails and is not resolved within 7 days of notification",
            "We determine that continued service poses a legal, security, or reputational risk",
          ]} />
          <p style={{ marginTop: 16 }}>In cases of termination by us without cause, we will provide a pro-rated refund for any unused portion of a paid billing period.</p>
        </Section>

        <Section title="12. Modifications to Terms">
          <p>We may update these Terms of Service from time to time. When we make material changes, we will:</p>
          <BulletList items={[
            "Notify you by email at least 14 days before the changes take effect",
            "Update the effective date at the top of this page",
            "Post a summary of what changed if the update is significant",
          ]} />
          <p style={{ marginTop: 16 }}>Your continued use of Driftbot after changes take effect constitutes your acceptance of the updated terms. If you disagree with the changes, you may cancel your account before the new terms take effect.</p>
        </Section>

        <Section title="13. Governing Law">
          <p>These Terms of Service are governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of law principles.</p>
          <p style={{ marginTop: 12 }}>Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Ontario, Canada. If you are a consumer in the European Union, you may also have rights under the laws of your country of residence.</p>
        </Section>

        <Section title="14. Contact Us">
          <p>If you have questions about these terms or need to get in touch with us for any legal matter, please contact:</p>
          <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.blueBorder}`, borderRadius: 12, padding: "24px", marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontWeight: 600, color: COLORS.white, fontFamily: "'Outfit', sans-serif" }}>Driftbot AI</div>
            <div style={{ color: COLORS.gray400, fontSize: 14 }}>Ontario, Canada</div>
            <a href="mailto:support@driftbot.ai" style={{ color: COLORS.blueLight, textDecoration: "none", fontSize: 14 }}>support@driftbot.ai</a>
          </div>
        </Section>

      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${COLORS.blueBorder}`, padding: "40px 0" }}>
        <div className="footer-inner" style={{ ...section, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="/logo-text.svg" alt="Driftbot" style={{ height: 22, width: "auto" }} />
          </div>
          <div style={{ fontSize: 13, color: COLORS.gray500 }}>© 2026 Driftbot AI Inc. All rights reserved.</div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="/privacy" style={{ color: COLORS.gray500, textDecoration: "none", fontSize: 13 }}>Privacy</a>
            <a href="/terms" style={{ color: COLORS.gray500, textDecoration: "none", fontSize: 13 }}>Terms</a>
            <a href="#" style={{ color: COLORS.gray500, textDecoration: "none", fontSize: 13 }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

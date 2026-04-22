import { useState, useEffect, useRef } from "react";

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

function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = end / (duration / 16);
          const id = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(id); }
            else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function ChatDemo() {
  const [msgs, setMsgs] = useState([]);
  const [typing, setTyping] = useState(false);
  const conversation = [
    { from: "bot", text: "Hey! 👋 Welcome to Acme Corp. I'm here to help you find the right plan. What brings you here today?", delay: 800 },
    { from: "user", text: "I'm looking for a CRM solution for my sales team of about 15 people.", delay: 2200 },
    { from: "bot", text: "Great! A 15-person sales team — sounds like you're scaling fast. Are you currently using any CRM, or starting fresh?", delay: 2000 },
    { from: "user", text: "We're on spreadsheets right now. It's getting messy.", delay: 2400 },
    { from: "bot", text: "I hear that a lot — you're not alone. Our Growth plan is built exactly for teams your size. Want me to book a quick 15-min demo with our team? I can find a slot that works for you.", delay: 2200 },
    { from: "user", text: "Sure, how about Thursday afternoon?", delay: 2000 },
    { from: "bot", text: "Done! ✅ I've booked you for Thursday at 2:00 PM with Sarah from our sales team. You'll get a calendar invite shortly. Anything else I can help with?", delay: 1800 },
  ];
  const idx = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (idx.current >= conversation.length) return;
    const msg = conversation[idx.current];
    if (msg.from === "bot") setTyping(true);
    const timer = setTimeout(() => {
      setTyping(false);
      setMsgs((p) => [...p, msg]);
      idx.current++;
    }, msg.delay);
    return () => clearTimeout(timer);
  }, [msgs]);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [msgs, typing]);

  return (
    <div style={{ background: COLORS.bgCard, borderRadius: 16, border: `1px solid ${COLORS.blueBorder}`, overflow: "hidden", maxWidth: 420, width: "100%", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", padding: "16px 20px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
        <div>
          <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>Driftbot AI Agent</div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>● Online — typically replies instantly</div>
        </div>
      </div>
      <div ref={containerRef} style={{ padding: "16px 16px 8px", height: 340, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, scrollBehavior: "smooth" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%", padding: "10px 14px", borderRadius: m.from === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: m.from === "user" ? COLORS.blue : COLORS.bgCardHover,
              color: m.from === "user" ? "#fff" : COLORS.gray100,
              fontSize: 13, lineHeight: 1.5
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ padding: "10px 18px", borderRadius: "14px 14px 14px 4px", background: COLORS.bgCardHover }}>
              <span style={{ display: "flex", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.gray400, animation: "blink 1.4s infinite 0s" }} />
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.gray400, animation: "blink 1.4s infinite 0.2s" }} />
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.gray400, animation: "blink 1.4s infinite 0.4s" }} />
              </span>
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: "12px 16px", borderTop: `1px solid ${COLORS.blueBorder}`, display: "flex", gap: 8 }}>
        <div style={{ flex: 1, background: COLORS.bg, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: COLORS.gray500 }}>Type a message...</div>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: COLORS.blue, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      background: hover ? COLORS.bgCardHover : COLORS.bgCard, border: `1px solid ${hover ? "rgba(59,130,246,0.3)" : COLORS.blueBorder}`,
      borderRadius: 14, padding: "28px 24px", transition: "all 0.3s ease", cursor: "default",
      transform: hover ? "translateY(-2px)" : "none"
    }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: COLORS.blueDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontWeight: 600, fontSize: 17, color: COLORS.white, marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>{title}</div>
      <div style={{ fontSize: 14, color: COLORS.gray400, lineHeight: 1.6 }}>{desc}</div>
    </div>
  );
}

function PricingCard({ name, price, desc, features, popular, bonuses }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      background: popular ? "linear-gradient(180deg, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.02) 100%)" : COLORS.bgCard,
      border: `1px solid ${popular ? "rgba(59,130,246,0.4)" : COLORS.blueBorder}`,
      borderRadius: 16, padding: "32px 28px", position: "relative", transition: "all 0.3s ease",
      transform: hover ? "translateY(-4px)" : "none", flex: 1, minWidth: 260, display: "flex", flexDirection: "column"
    }}>
      {popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: COLORS.blue, color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 14px", borderRadius: 20, letterSpacing: 0.5, textTransform: "uppercase" }}>Most popular</div>}
      <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.gray300, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{name}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
        <span style={{ fontSize: 42, fontWeight: 700, color: COLORS.white, fontFamily: "'Outfit', sans-serif" }}>${price}</span>
        <span style={{ fontSize: 14, color: COLORS.gray500 }}>/month</span>
      </div>
      <div style={{ fontSize: 13, color: COLORS.gray500, marginBottom: 24 }}>{desc}</div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20, flex: 1 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.green} strokeWidth="2.5" strokeLinecap="round" style={{ marginTop: 1, flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
            <span style={{ fontSize: 14, color: COLORS.gray300, lineHeight: 1.4 }}>{f}</span>
          </div>
        ))}
      </div>

      {bonuses && bonuses.length > 0 && (
        <div style={{ borderTop: `1px solid ${COLORS.blueBorder}`, paddingTop: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.blue, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Bonuses included</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {bonuses.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.blueLight} strokeWidth="2.5" strokeLinecap="round" style={{ marginTop: 2, flexShrink: 0 }}><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                <span style={{ fontSize: 13, color: COLORS.blueLight, lineHeight: 1.4 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button style={{
        width: "100%", padding: "12px 0", borderRadius: 10, border: popular ? "none" : `1px solid ${COLORS.blueBorder}`,
        background: popular ? COLORS.blue : "transparent", color: popular ? "#fff" : COLORS.blueLight,
        fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s ease", fontFamily: "'DM Sans', sans-serif"
      }}>Join waitlist</button>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{
      borderBottom: `1px solid ${COLORS.blueBorder}`, padding: "20px 0", cursor: "pointer"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: COLORS.white, fontFamily: "'Outfit', sans-serif", paddingRight: 16 }}>{q}</span>
        <span style={{ color: COLORS.gray400, fontSize: 20, transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s ease", flexShrink: 0 }}>+</span>
      </div>
      {open && <div style={{ marginTop: 12, fontSize: 14, color: COLORS.gray400, lineHeight: 1.7 }}>{a}</div>}
    </div>
  );
}

function ComingSoonItem({ icon, title, desc }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "20px 24px", background: COLORS.bgCard, border: `1px solid ${COLORS.blueBorder}`, borderRadius: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: COLORS.blueDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.white, marginBottom: 4, fontFamily: "'Outfit', sans-serif" }}>{title}</div>
        <div style={{ fontSize: 13, color: COLORS.gray500, lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  );
}

export default function DriftbotLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [bottomEmail, setBottomEmail] = useState("");
  const [bottomSubmitted, setBottomSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = (e, isBottom) => {
    e.preventDefault();
    if (isBottom) { setBottomSubmitted(true); setBottomEmail(""); }
    else { setSubmitted(true); setEmail(""); }
  };

  const section = { maxWidth: 1100, margin: "0 auto", padding: "0 24px" };
  const sectionPad = { padding: "100px 0" };

  return (
    <div style={{ background: COLORS.bg, color: COLORS.white, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes blink { 0%,100%{opacity:.2} 50%{opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        @keyframes gridScroll { 0%{transform:translate(0,0)} 100%{transform:translate(30px,30px)} }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(59,130,246,0.3); }
        input::placeholder { color: ${COLORS.gray500}; }
        button:hover { opacity: 0.92; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-nav { display: flex !important; }
          .social-proof-grid { gap: 24px !important; }
          .pricing-grid { flex-direction: column !important; align-items: center !important; }
          .pricing-grid > div { min-width: 100% !important; }
          .footer-inner { flex-direction: column !important; text-align: center !important; gap: 16px !important; }
          .coming-soon-grid { grid-template-columns: 1fr !important; }
          .section-pad { padding: 60px 0 !important; }
          .hero-section { padding-top: 32px !important; padding-bottom: 48px !important; }
          .email-form { flex-direction: column !important; }
          .email-form input { min-width: 100% !important; }
          .email-form button { width: 100% !important; }
          .bottom-email-form { flex-direction: column !important; }
          .bottom-email-form input { min-width: 100% !important; }
          .bottom-email-form button { width: 100% !important; }
          .final-cta-box { padding: 40px 20px !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-nav { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ ...section, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 20 }}>drift<span style={{ color: COLORS.blue }}>bot</span><span style={{ color: COLORS.gray500, fontWeight: 400 }}>.ai</span></span>
        </div>
        <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <a href="#features" style={{ color: COLORS.gray400, textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Features</a>
          <a href="#pricing" style={{ color: COLORS.gray400, textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Pricing</a>
          <a href="#faq" style={{ color: COLORS.gray400, textDecoration: "none", fontSize: 14, fontWeight: 500 }}>FAQ</a>
          <a href="#waitlist" style={{
            background: COLORS.blue, color: "#fff", padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600,
            textDecoration: "none", border: "none"
          }}>Get early access</a>
        </div>
        {/* Mobile hamburger */}
        <div className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", flexDirection: "column", gap: 5, cursor: "pointer", padding: 4 }}>
          <span style={{ width: 22, height: 2, background: COLORS.gray300, borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ width: 22, height: 2, background: COLORS.gray300, borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 22, height: 2, background: COLORS.gray300, borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </div>
      </nav>
      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="mobile-nav" style={{ display: "none", flexDirection: "column", gap: 16, padding: "16px 24px 24px", background: COLORS.bgCard, borderBottom: `1px solid ${COLORS.blueBorder}`, position: "relative", zIndex: 10 }}>
          <a href="#features" onClick={() => setMenuOpen(false)} style={{ color: COLORS.gray300, textDecoration: "none", fontSize: 16, fontWeight: 500 }}>Features</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} style={{ color: COLORS.gray300, textDecoration: "none", fontSize: 16, fontWeight: 500 }}>Pricing</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} style={{ color: COLORS.gray300, textDecoration: "none", fontSize: 16, fontWeight: 500 }}>FAQ</a>
          <a href="#waitlist" onClick={() => setMenuOpen(false)} style={{
            background: COLORS.blue, color: "#fff", padding: "12px 20px", borderRadius: 8, fontSize: 15, fontWeight: 600,
            textDecoration: "none", border: "none", textAlign: "center"
          }}>Get early access</a>
        </div>
      )}

      {/* HERO */}
      <section className="hero-section" style={{ position: "relative", overflow: "hidden", paddingTop: 60, paddingBottom: 80 }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.03 }}>
          <div style={{ width: "200%", height: "200%", backgroundImage: `linear-gradient(${COLORS.blue} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.blue} 1px, transparent 1px)`, backgroundSize: "30px 30px", animation: "gridScroll 20s linear infinite" }} />
        </div>
        <div style={{ position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)", width: 800, height: 600, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)" }} />

        <div style={{ ...section, position: "relative", zIndex: 2, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: COLORS.blueDim, border: `1px solid ${COLORS.blueBorder}`, borderRadius: 20, padding: "6px 16px", marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.green, animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 13, color: COLORS.blueLight, fontWeight: 500 }}>Now accepting early access signups</span>
          </div>

          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(36px, 5.5vw, 68px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", maxWidth: 800, margin: "0 auto 24px", color: COLORS.white }}>
            Turn every visitor into a <span style={{ color: COLORS.blue }}>booked meeting</span>
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: COLORS.gray400, maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.6 }}>
            Driftbot is an AI sales agent that lives on your website — engaging visitors, qualifying leads, and booking meetings on your calendar. 24/7.
          </p>

          <form className="email-form" onSubmit={(e) => handleSubmit(e, false)} style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", maxWidth: 460, margin: "0 auto 16px" }}>
            {!submitted ? (
              <>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your work email"
                  required style={{
                    flex: 1, minWidth: 240, padding: "14px 18px", borderRadius: 10, border: `1px solid ${COLORS.blueBorder}`,
                    background: COLORS.bgCard, color: COLORS.white, fontSize: 15, outline: "none", fontFamily: "'DM Sans', sans-serif"
                  }} />
                <button type="submit" style={{
                  padding: "14px 28px", borderRadius: 10, border: "none", background: COLORS.blue, color: "#fff",
                  fontWeight: 600, fontSize: 15, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap"
                }}>Get early access</button>
              </>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: COLORS.greenDim, border: `1px solid rgba(16,185,129,0.3)`, borderRadius: 10, padding: "14px 24px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.green} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span style={{ color: COLORS.green, fontWeight: 500, fontSize: 15 }}>You're on the list! We'll be in touch soon.</span>
              </div>
            )}
          </form>
          <p style={{ fontSize: 13, color: COLORS.gray500 }}>Free during beta · No credit card required · Setup in 2 minutes</p>

          <div style={{ marginTop: 60, display: "flex", justifyContent: "center", animation: "fadeInUp 0.8s ease 0.3s both" }}>
            <div style={{ animation: "float 6s ease-in-out infinite" }}>
              <ChatDemo />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ borderTop: `1px solid ${COLORS.blueBorder}`, borderBottom: `1px solid ${COLORS.blueBorder}`, padding: "40px 0" }}>
        <div className="social-proof-grid" style={{ ...section, display: "flex", justifyContent: "center", alignItems: "center", gap: 60, flexWrap: "wrap" }}>
          {[
            { n: 500, s: "+", label: "Businesses on waitlist" },
            { n: 93, s: "%", label: "Faster response time" },
            { n: 3, s: "x", label: "More meetings booked" },
            { n: 24, s: "/7", label: "Always-on coverage" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 700, color: COLORS.white }}><Counter end={item.n} suffix={item.s} /></div>
              <div style={{ fontSize: 13, color: COLORS.gray500, marginTop: 4 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section style={sectionPad}>
        <div style={section}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.blue, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>The problem</div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 20 }}>
              You're losing leads while you sleep
            </h2>
            <p style={{ fontSize: 17, color: COLORS.gray400, lineHeight: 1.7 }}>
              Right now, visitors land on your website at all hours. They have questions. They're ready to buy. But there's no one there to talk to them. By the time you respond, they've already gone to a competitor.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 48 }}>
            {[
              { icon: "🕐", title: "5 minutes", desc: "The average response time to a new lead. But 78% of buyers purchase from whoever responds first." },
              { icon: "💸", title: "67% of leads", desc: "Never get a follow-up. Your team is busy. Leads fall through the cracks. Revenue walks out the door." },
              { icon: "🌙", title: "After hours", desc: "50% of website traffic happens outside business hours. That's half your potential pipeline — gone." },
            ].map((item, i) => (
              <div key={i} style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.blueBorder}`, borderRadius: 14, padding: "28px 24px" }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 20, color: COLORS.white, marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: COLORS.gray400, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{ ...sectionPad, background: `linear-gradient(180deg, rgba(59,130,246,0.03) 0%, transparent 100%)` }}>
        <div style={section}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.green, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>The solution</div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 20 }}>
              Meet your AI sales agent
            </h2>
            <p style={{ fontSize: 17, color: COLORS.gray400, lineHeight: 1.7 }}>
              Driftbot engages every visitor the moment they land on your site. It answers questions, qualifies leads based on your criteria, and books meetings directly on your calendar. No code. No training. Live in 2 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={sectionPad}>
        <div style={section}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.blue, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>How it works</div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Live in three steps
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { step: "01", title: "Paste one line of code", desc: "Add a single script tag to your website. Works with any platform — Webflow, WordPress, Shopify, custom sites." },
              { step: "02", title: "Train it on your business", desc: "Driftbot reads your website and learns about your product, pricing, and ideal customer. You set the qualification criteria." },
              { step: "03", title: "Watch meetings appear", desc: "Driftbot handles conversations 24/7, qualifies leads, and books them directly into your Google Calendar or Calendly." },
            ].map((item, i) => (
              <div key={i} style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.blueBorder}`, borderRadius: 14, padding: "32px 28px", position: "relative" }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 48, fontWeight: 700, color: "rgba(59,130,246,0.1)", position: "absolute", top: 16, right: 20 }}>{item.step}</div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: COLORS.blueDim, border: `1px solid ${COLORS.blueBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16, color: COLORS.blue, marginBottom: 20 }}>{item.step}</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 18, color: COLORS.white, marginBottom: 10 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: COLORS.gray400, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ ...sectionPad, background: `linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.03) 50%, transparent 100%)` }}>
        <div style={section}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.blue, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>Features</div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Everything you need to convert more
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
            <FeatureCard icon="⚡" title="2-minute setup" desc="Paste one script tag. Driftbot scans your site and starts conversations immediately. No dev team required." />
            <FeatureCard icon="🎯" title="Smart qualification" desc="Set your rules — budget, company size, timeline. Driftbot asks the right questions and scores every lead automatically." />
            <FeatureCard icon="📅" title="Auto-booking" desc="Connects to Google Calendar and Calendly. Qualified leads get booked into the right time slot — no back-and-forth." />
            <FeatureCard icon="🧠" title="Learns your business" desc="Driftbot reads your website, docs, and FAQs. It speaks your language and answers product questions accurately." />
            <FeatureCard icon="📊" title="Real-time analytics" desc="See every conversation, lead score, and conversion metric. Know exactly what's working and what to improve." />
            <FeatureCard icon="🔗" title="CRM integrations" desc="Pushes qualified leads directly to HubSpot and Slack. Your pipeline stays updated without any manual work." />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={sectionPad}>
        <div style={section}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.blue, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>Pricing</div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 12 }}>
              Simple, transparent pricing
            </h2>
            <p style={{ fontSize: 16, color: COLORS.gray400 }}>Start free during beta. No credit card required.</p>
          </div>

          <div className="pricing-grid" style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
            <PricingCard name="Starter" price="49" desc="For small teams getting started" popular={false}
              features={[
                "1 AI agent",
                "500 conversations/mo",
                "Google Calendar sync",
                "Email notifications",
                "Basic analytics dashboard",
              ]}
              bonuses={[
                "AI-powered help center",
                "Conversation transcripts",
              ]}
            />
            <PricingCard name="Growth" price="129" desc="For growing sales teams" popular={true}
              features={[
                "Everything in Starter, plus:",
                "3 AI agents",
                "Unlimited conversations",
                "HubSpot integration",
                "Lead scoring & qualification rules",
                "Advanced analytics",
              ]}
              bonuses={[
                "Remove Driftbot branding",
                "Custom bot personality & tone",
                "Weekly performance reports",
                "Priority AI support",
                "More CRM integrations coming soon",
              ]}
            />
            <PricingCard name="Scale" price="299" desc="For high-volume teams" popular={false}
              features={[
                "Everything in Growth, plus:",
                "Unlimited AI agents",
                "Custom AI training with your docs",
                "Salesforce integration",
                "Multi-language support",
                "Dedicated support channel",
              ]}
              bonuses={[
                "Custom onboarding session",
                "99.9% uptime SLA",
                "White-label option",
                "API access",
              ]}
            />
          </div>
        </div>
      </section>

      {/* COMING SOON */}
      <section style={{ ...sectionPad, background: `linear-gradient(180deg, rgba(59,130,246,0.03) 0%, transparent 100%)` }}>
        <div style={{ ...section, maxWidth: 800 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.blue, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>Roadmap</div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 12 }}>
              Coming soon
            </h2>
            <p style={{ fontSize: 16, color: COLORS.gray400 }}>We're building fast. Here's what's next on the roadmap.</p>
          </div>

          <div className="coming-soon-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 14 }}>
            <ComingSoonItem icon="🔌" title="More CRM integrations" desc="Pipedrive, Zoho, Monday.com, and more. Connect Driftbot to whatever CRM your team uses." />
            <ComingSoonItem icon="🌐" title="Multi-language support" desc="Let Driftbot speak your customers' language. Auto-detect and respond in 20+ languages." />
            <ComingSoonItem icon="🏷️" title="White-label option" desc="Remove all Driftbot branding and make it fully yours. Perfect for agencies reselling to clients." />
            <ComingSoonItem icon="⚙️" title="API access" desc="Build custom integrations and workflows. Full REST API with webhooks for developers." />
            <ComingSoonItem icon="📱" title="Mobile app" desc="Monitor conversations, leads, and bookings from your phone. Get push notifications for hot leads." />
            <ComingSoonItem icon="🤝" title="Team collaboration" desc="Assign leads to team members, add internal notes, and hand off conversations seamlessly." />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={sectionPad}>
        <div style={{ ...section, maxWidth: 720 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.blue, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>FAQ</div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Common questions
            </h2>
          </div>

          <FaqItem q="How does Driftbot learn about my business?" a="When you install Driftbot, it automatically scans your website content — product pages, pricing, FAQs, and more. It uses this information to have accurate, on-brand conversations with your visitors. You can also upload additional docs or set custom responses for specific questions." />
          <FaqItem q="Will it feel robotic to my visitors?" a="No. Driftbot uses advanced AI to have natural, human-like conversations. Most visitors won't realize they're talking to an AI. It adapts its tone and style to match your brand voice." />
          <FaqItem q="How long does setup take?" a="About 2 minutes. You paste one line of code into your website, and Driftbot starts working immediately. No developers needed, no complex configuration." />
          <FaqItem q="What happens with unqualified leads?" a="You set the qualification criteria — budget, company size, timeline, whatever matters to your business. Leads that don't meet your criteria get a polite response and can still browse your site. Only qualified leads get booked into your calendar." />
          <FaqItem q="Does it integrate with my existing tools?" a="Yes. Driftbot integrates with Google Calendar, Calendly, HubSpot, and Slack out of the box. More integrations including Salesforce, Pipedrive, and Zoho are on the roadmap." />
          <FaqItem q="Can I try it before committing?" a="Absolutely. Driftbot is free during the beta period. No credit card required. You'll get full access to test it on your website before any paid plans launch." />
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="waitlist" style={{ padding: "100px 0 120px" }}>
        <div style={section}>
          <div className="final-cta-box" style={{
            background: `linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.03) 100%)`,
            border: `1px solid rgba(59,130,246,0.2)`, borderRadius: 20, padding: "60px 40px", textAlign: "center", position: "relative", overflow: "hidden"
          }}>
            <div style={{ position: "absolute", top: -100, right: -100, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)" }} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 16 }}>
                Stop losing leads. Start booking meetings.
              </h2>
              <p style={{ fontSize: 17, color: COLORS.gray400, maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.6 }}>
                Join the waitlist today and be the first to get access when we launch. Early users get lifetime pricing.
              </p>
              <form className="bottom-email-form" onSubmit={(e) => handleSubmit(e, true)} style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", maxWidth: 460, margin: "0 auto" }}>
                {!bottomSubmitted ? (
                  <>
                    <input type="email" value={bottomEmail} onChange={(e) => setBottomEmail(e.target.value)} placeholder="Enter your work email"
                      required style={{
                        flex: 1, minWidth: 240, padding: "14px 18px", borderRadius: 10, border: `1px solid ${COLORS.blueBorder}`,
                        background: COLORS.bgCard, color: COLORS.white, fontSize: 15, outline: "none", fontFamily: "'DM Sans', sans-serif"
                      }} />
                    <button type="submit" style={{
                      padding: "14px 28px", borderRadius: 10, border: "none", background: COLORS.blue, color: "#fff",
                      fontWeight: 600, fontSize: 15, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap"
                    }}>Get early access</button>
                  </>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, background: COLORS.greenDim, border: `1px solid rgba(16,185,129,0.3)`, borderRadius: 10, padding: "14px 24px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.green} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                    <span style={{ color: COLORS.green, fontWeight: 500, fontSize: 15 }}>You're on the list! We'll be in touch soon.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${COLORS.blueBorder}`, padding: "40px 0" }}>
        <div className="footer-inner" style={{ ...section, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16 }}>drift<span style={{ color: COLORS.blue }}>bot</span><span style={{ color: COLORS.gray500, fontWeight: 400 }}>.ai</span></span>
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

import { useState, useEffect, useRef } from "react";
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* ── Design Tokens ── */
    :root {
      --clr-primary:        #FF6B35;
      --clr-primary-light:  #FF9A5C;
      --clr-primary-glow:   rgba(255,107,53,0.32);
      --clr-primary-subtle: rgba(255,107,53,0.28);
      --clr-primary-bg:     rgba(255,107,53,0.07);
      --clr-amber:          #F59E0B;
      --clr-emerald:        #10B981;
      --clr-rose:           #F43F5E;
      --clr-sky:            #38BDF8;
      --clr-violet:         #8B5CF6;
      --clr-bg:             #07070e;
      --clr-surface:        rgba(255,255,255,0.035);
      --clr-surface-alt:    rgba(255,255,255,0.018);
      --clr-border:         rgba(255,255,255,0.075);
      --clr-text:           #F0F0F8;
      --clr-text-muted:     rgba(240,240,248,0.55);
      --clr-text-subtle:    rgba(240,240,248,0.28);
      --ease-spring:        cubic-bezier(0.34,1.56,0.64,1);
      --ease-smooth:        cubic-bezier(0.4,0,0.2,1);
    }

    html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
    body {
      background: var(--clr-bg);
      color: var(--clr-text);
      font-family: 'Sora', sans-serif;
      overflow-x: hidden;
      line-height: 1.65;
    }
    ::selection { background: var(--clr-primary); color:#fff; }
    ::-webkit-scrollbar { width:4px; }
    ::-webkit-scrollbar-track { background: var(--clr-bg); }
    ::-webkit-scrollbar-thumb { background: var(--clr-primary); border-radius:10px; }

    /* ── Keyframes ── */
    @keyframes fadeSlideUp {
      from { opacity:0; transform:translateY(30px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes floatY {
      0%,100% { transform:translateY(0) scale(1); }
      50%      { transform:translateY(-30px) scale(1.06); }
    }
    @keyframes scrollBlink {
      0%  { height:0;  opacity:1; }
      80% { height:44px; opacity:1; }
      100%{ height:44px; opacity:0; }
    }
    @keyframes shimmer {
      from { background-position:-200% center; }
      to   { background-position: 200% center; }
    }
    @keyframes spin {
      from { transform:rotate(0); }
      to   { transform:rotate(360deg); }
    }

    /* ── Hero stagger ── */
    .hero-item {
      opacity:0;
      animation: fadeSlideUp 0.85s var(--ease-smooth) forwards;
    }

    /* ── Floating orbs ── */
    .orb {
      position:absolute; border-radius:50%;
      filter:blur(100px); pointer-events:none;
      animation: floatY ease-in-out infinite;
    }
    .orb-1 {
      width:700px; height:700px;
      background:radial-gradient(circle,rgba(255,107,53,.13),transparent 68%);
      top:-15%; left:-20%; animation-duration:9s;
    }
    .orb-2 {
      width:540px; height:540px;
      background:radial-gradient(circle,rgba(245,158,11,.09),transparent 68%);
      top:5%; right:-15%; animation-duration:12s; animation-delay:-4s;
    }
    .orb-3 {
      width:340px; height:340px;
      background:radial-gradient(circle,rgba(16,185,129,.07),transparent 68%);
      bottom:8%; left:25%; animation-duration:16s; animation-delay:-9s;
    }

    /* ── Grid overlay ── */
    .grid-overlay {
      position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);
      background-size:64px 64px;
      -webkit-mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 100%);
      pointer-events:none;
    }

    /* ── Scroll indicator ── */
    .scroll-line {
      width:1px;
      background:linear-gradient(to bottom,var(--clr-primary),transparent);
      animation: scrollBlink 2.5s var(--ease-smooth) infinite;
    }

    /* ── Gradient texts ── */
    .grad-logo {
      background:linear-gradient(135deg,var(--clr-primary),var(--clr-amber),#FFD166);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    }
    .grad-hero {
      background:linear-gradient(135deg,var(--clr-primary) 0%,var(--clr-amber) 50%,var(--clr-emerald) 100%);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    }
    .grad-num {
      background:linear-gradient(135deg,var(--clr-primary),var(--clr-amber));
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    }

    /* ── Shimmer badge ── */
    .shimmer {
      background:linear-gradient(90deg,rgba(255,107,53,.1) 25%,rgba(255,107,53,.22) 50%,rgba(255,107,53,.1) 75%);
      background-size:200% auto;
      animation: shimmer 3s linear infinite;
    }

    /* ── Buttons ── */
    .btn {
      display:inline-flex; align-items:center; justify-content:center;
      font-family:'Sora',sans-serif; font-weight:700; letter-spacing:.03em;
      border-radius:999px; cursor:pointer; border:none;
      transition:transform .28s var(--ease-spring), box-shadow .28s, background .2s, color .2s, border-color .2s;
      white-space:nowrap; user-select:none;
    }
    .btn:active { transform:scale(.95)!important; }
    .btn-primary {
      background:var(--clr-primary); color:#fff;
      box-shadow:0 6px 28px var(--clr-primary-glow);
    }
    .btn-primary:hover { box-shadow:0 12px 44px var(--clr-primary-glow); transform:translateY(-2px); }
    .btn-outline {
      background:transparent; color:var(--clr-text-muted);
      border:1.5px solid var(--clr-border);
    }
    .btn-outline:hover { border-color:var(--clr-primary-subtle); color:var(--clr-primary); transform:translateY(-2px); }
    .btn-sm  { font-size:.78rem; padding:.6rem 1.35rem; }
    .btn-md  { font-size:.88rem; padding:.85rem 2rem; }
    .btn-lg  { font-size:.98rem; padding:1.05rem 2.5rem; }

    /* ── Glass card ── */
    .glass-card {
      background:var(--clr-surface);
      border:1px solid var(--clr-border);
      border-radius:20px;
      transition:transform .45s var(--ease-spring), border-color .3s, box-shadow .45s;
    }
    .glass-card:hover {
      transform:translateY(-8px);
      border-color:var(--clr-primary-subtle);
      box-shadow:0 14px 50px rgba(0,0,0,.4);
    }
    .glass-card:hover .card-bar { width:3rem; }

    /* ── Portfolio cards ── */
    .port-card {
      border-radius:20px; height:290px; overflow:hidden;
      position:relative; cursor:pointer;
      border:1px solid rgba(255,255,255,.07);
      transition:transform .5s var(--ease-spring), box-shadow .5s;
    }
    .port-card:hover { transform:translateY(-8px) scale(1.02); }
    .port-orange  { background:linear-gradient(135deg,#FF6B3510,#FF6B3542); }
    .port-blue    { background:linear-gradient(135deg,#3B82F610,#3B82F642); }
    .port-violet  { background:linear-gradient(135deg,#8B5CF610,#8B5CF642); }
    .port-emerald { background:linear-gradient(135deg,#10B98110,#10B98142); }
    .port-rose    { background:linear-gradient(135deg,#F43F5E10,#F43F5E42); }
    .port-amber   { background:linear-gradient(135deg,#F59E0B10,#F59E0B42); }
    .port-orange:hover  { box-shadow:0 20px 60px rgba(255,107,53,.3);  border-color:rgba(255,107,53,.35); }
    .port-blue:hover    { box-shadow:0 20px 60px rgba(59,130,246,.3);  border-color:rgba(59,130,246,.35); }
    .port-violet:hover  { box-shadow:0 20px 60px rgba(139,92,246,.3);  border-color:rgba(139,92,246,.35); }
    .port-emerald:hover { box-shadow:0 20px 60px rgba(16,185,129,.3);  border-color:rgba(16,185,129,.35); }
    .port-rose:hover    { box-shadow:0 20px 60px rgba(244,63,94,.3);   border-color:rgba(244,63,94,.35); }
    .port-amber:hover   { box-shadow:0 20px 60px rgba(245,158,11,.3);  border-color:rgba(245,158,11,.35); }
    .port-emoji {
      position:absolute; top:50%; left:50%;
      transform:translate(-50%,-50%);
      font-size:7.5rem; opacity:.08; pointer-events:none;
      transition:transform .45s var(--ease-spring), opacity .45s;
    }
    .port-card:hover .port-emoji { transform:translate(-50%,-58%) scale(1.2); opacity:.15; }

    /* ── Team cards ── */
    .team-card {
      padding:2.5rem 2rem; border-radius:20px;
      border:1px solid var(--clr-border);
      background:var(--clr-surface);
      transition:transform .5s var(--ease-spring), border-color .3s, box-shadow .5s;
    }
    .team-card:hover { transform:translateY(-8px); }
    .tc-primary:hover { border-color:rgba(255,107,53,.3);  box-shadow:0 16px 50px rgba(255,107,53,.12); }
    .tc-violet:hover  { border-color:rgba(139,92,246,.3);  box-shadow:0 16px 50px rgba(139,92,246,.12); }
    .tc-emerald:hover { border-color:rgba(16,185,129,.3);  box-shadow:0 16px 50px rgba(16,185,129,.12); }
    .tc-amber:hover   { border-color:rgba(245,158,11,.3);  box-shadow:0 16px 50px rgba(245,158,11,.12); }
    .team-avatar {
      width:72px; height:72px; border-radius:20px;
      background:var(--clr-primary-bg);
      border:1px solid var(--clr-primary-subtle);
      display:flex; align-items:center; justify-content:center;
      transition:transform .38s var(--ease-spring);
    }
    .team-card:hover .team-avatar { transform:scale(1.1) rotate(-5deg); }

    /* ── Process line ── */
    .proc-line {
      flex:1; width:1px; margin-top:.75rem;
      background:linear-gradient(to bottom,rgba(255,107,53,.4),transparent);
    }

    /* ── Input focus ── */
    .w-input:focus { border-color:var(--clr-primary)!important; }

    /* ── Responsive ── */
    @media(max-width:768px){
      .hide-mob { display:none!important; }
      .proc-grid { grid-template-columns:1fr!important; }
      .contact-grid { grid-template-columns:1fr!important; }
      .stats-grid { grid-template-columns:repeat(2,1fr)!important; }
      .footer-grid { grid-template-columns:1fr!important; }
    }
    @media(min-width:769px){
      .show-mob { display:none!important; }
    }
  `}</style>
);

/* ══════════════════════════════════════════════════════════════
   DATA LAYER
   ══════════════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { label:"Home",      href:"home" },
  { label:"Services",  href:"services" },
  { label:"Portfolio", href:"portfolio" },
  { label:"Team",      href:"team" },
  { label:"Pricing",   href:"pricing" },
  // { label:"Contact",   href:"tel:+917001894943" },
];

const STATS = [
  { value:"30+",  label:"Projects Delivered" },
  { value:"4",    label:"Core Members" },
  { value:"6 Mo", label:"Free Maintenance" },
  { value:"₹4.9K",label:"Starting At" },
];

const SERVICES = [
  { id:1, icon:"✦", accent:"#FF6B35", title:"Custom Web Design",       desc:"Handcrafted, pixel-perfect websites tailored to your brand — never templates, always bespoke." },
  { id:2, icon:"◈", accent:"#F59E0B", title:"Responsive Development",   desc:"Flawless performance across every device — phones, tablets, and desktops — always." },
  { id:3, icon:"⊛", accent:"#10B981", title:"SEO Foundation",            desc:"Built-in search optimization so your customers can discover you organically." },
  { id:4, icon:"⬟", accent:"#F43F5E", title:"6-Month Free Maintenance",  desc:"We keep your site running, updated, and bug-free for half a year. At zero cost." },
  { id:5, icon:"⚡", accent:"#38BDF8", title:"Speed Optimization",        desc:"Optimized assets and clean code ensuring your site loads in under a second." },
  { id:6, icon:"◉", accent:"#8B5CF6", title:"Ongoing Support",           desc:"Direct access to your developer — not a ticket queue — whenever you need us." },
];

const PORTFOLIO = [
  { id:1, name:"Aroma Cafe",     category:"Restaurant",  emoji:"☕", bg:"port-orange", tags:["React","Tailwind","Motion"],  desc:"Warm inviting site with digital menu and online reservations." },
  { id:2, name:"LegalEdge",      category:"Law Firm",    emoji:"⚖️", bg:"port-blue",   tags:["Next.js","GSAP","CMS"],       desc:"Professional trust-building site with consultation booking." },
  { id:3, name:"StudioBloom",    category:"Photography", emoji:"📷", bg:"port-violet", tags:["React","Lightbox","CMS"],     desc:"Cinematic portfolio with full-screen gallery and client portal." },
  { id:4, name:"MediCare Clinic",category:"Healthcare",  emoji:"🏥", bg:"port-emerald",tags:["Vue","Tailwind","Calendly"],  desc:"Clean accessible site with appointment scheduling." },
  { id:5, name:"FitForge Gym",   category:"Fitness",     emoji:"💪", bg:"port-rose",   tags:["React","Stripe","Animation"], desc:"High-energy site with membership plans and class timetables." },
  { id:6, name:"HomeNest Realty",category:"Real Estate", emoji:"🏠", bg:"port-amber",  tags:["Next.js","Maps","CMS"],       desc:"Property listings with search filters and virtual tours." },
];

const TEAM = [
  {
    id: 1,
    name: "Sudip Das Ghosh",
    role: "FullStack Developer",
    emoji: "🧑‍💻",
    color: "#FF6B35",
    tc: "tc-primary",
    skills: ["React", "Node.js", "System Design"],
  },
  {
    id: 2,
    name: "Ritam Murmu",
    role: "Lead Developer & Support",
    emoji: "⚙️",
    color: "#8B5CF6",
    tc: "tc-violet",
    skills: ["Social Media Marketing", "Google Ads"],
  },
  {
    id: 3,
    name: "Dip Dutta",
    role: "UI/UX Designer",
    emoji: "🎨",
    color: "#10B981",
    tc: "tc-emerald",
    skills: ["Figma", "Motion Design", "Branding"],
  },
  {
    id: 4,
    name: "Utsav Konar",
    role: "SEO & Growth Strategist",
    emoji: "📈",
    color: "#F59E0B",
    tc: "tc-amber",
    skills: ["SEO", "Analytics", "Content"],
  },
];

const PROCESS = [
  { step:"01", title:"Discovery Call",   desc:"We understand your business, goals, and vision in a free 30-min call." },
  { step:"02", title:"Design Mockup",    desc:"We craft a beautiful design prototype for your approval before any coding." },
  { step:"03", title:"Development",      desc:"We build your site with clean, fast, and well-structured code." },
  { step:"04", title:"Launch & Support", desc:"We go live and support you free for 6 months post-launch." },
];

const PRICING = [
  {
    id:1, name:"Starter", price:"₹4,999", note:"One-time payment", pages:"Up to 3 Pages", popular:false,
    features:["Custom UI Design","Mobile Responsive","Contact Form","Basic SEO Setup","6 Months Free Support","1 Round of Revisions"],
  },
  {
    id:2, name:"Growth", price:"₹9,999",  note:"One-time payment", pages:"Up to 7 Pages", popular:true,
    features:["Everything in Starter","Blog / News Section","Advanced SEO","Google Analytics","Speed Optimization","Social Media Links","3 Rounds of Revisions"],
  },
  {
    id:3, name:"Pro",    price:"₹17,999", note:"One-time payment", pages:"15+ Pages",     popular:false,
    features:["Everything in Growth","E-commerce Ready","Payment Gateway","Admin Dashboard","Custom Integrations","Priority 24h Support","Unlimited Revisions"],
  },
];

const CONTACT_INFO = [
  { icon: "📧", label: "Email", value: "webiana@gmail.com" },
  { icon: "💬", label: "WhatsApp", value: "+91 90468 79317" },
  { icon: "📍", label: "Location", value: "India — Serving Nationwide" },
  { icon: "⏱️", label: "Response Time", value: "Within 24 Hours" },
];

/* ══════════════════════════════════════════════════════════════
   CUSTOM HOOKS
   ══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useScrolled(offset = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > offset);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(id); }, { threshold:0.35 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);
  return active;
}

/* ══════════════════════════════════════════════════════════════
   REUSABLE UI COMPONENTS
   ══════════════════════════════════════════════════════════════ */

/** Button — variant: primary | outline; size: sm | md | lg */
function Button({ children, variant="primary", size="md", onClick, type="button", fullWidth=false }) {
  return (
    <button type={type} onClick={onClick}
      className={`btn btn-${variant} btn-${size}`}
      style={fullWidth ? { width:"100%" } : {}}
    >{children}</button>
  );
}

/** Badge — eyebrow pill */
function Badge({ children }) {
  return (
    <span className="shimmer" style={{
      display:"inline-block", fontSize:"0.68rem", fontWeight:700,
      letterSpacing:"0.12em", textTransform:"uppercase",
      padding:"6px 18px", borderRadius:"999px",
      border:"1px solid var(--clr-primary-subtle)",
      color:"var(--clr-primary)",
    }}>{children}</span>
  );
}

/** SectionTitle — eyebrow + h2 + subtitle */
function SectionTitle({ eyebrow, title, subtitle, center=false }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"1rem", alignItems: center ? "center":"flex-start", textAlign: center ? "center":"left" }}>
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h2 style={{ fontSize:"clamp(2rem,4.5vw,3.2rem)", fontWeight:900, letterSpacing:"-0.04em", lineHeight:1.06, color:"var(--clr-text)" }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ color:"var(--clr-text-muted)", fontSize:"1.02rem", lineHeight:1.75, maxWidth:"520px" }}>{subtitle}</p>
      )}
    </div>
  );
}

/** AnimSection — fade + slide on scroll */
function AnimSection({ children, delay=0, direction="up", style={} }) {
  const [ref, inView] = useInView();
  const dirs = { up:"translateY(36px)", left:"translateX(-36px)", right:"translateX(36px)", none:"none" };
  return (
    <div ref={ref} style={{ opacity: inView?1:0, transform: inView?"none":dirs[direction],
      transition:`opacity .72s cubic-bezier(.4,0,.2,1) ${delay}s, transform .72s cubic-bezier(.4,0,.2,1) ${delay}s`,
      ...style }}>{children}</div>
  );
}

/** Divider */
function Divider() {
  return <div style={{ height:"1px", background:"var(--clr-border)", margin:"0 1.5rem" }} />;
}

/** Tag chip */
function Tag({ children }) {
  return (
    <span style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.05em", textTransform:"uppercase",
      padding:"3px 10px", borderRadius:"6px", background:"rgba(255,255,255,0.06)",
      border:"1px solid rgba(255,255,255,0.1)", color:"var(--clr-text-muted)" }}>
      {children}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════════════════════ */
function Navbar({ active }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setOpen(false); };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: scrolled ? "12px 40px" : "22px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(7,7,14,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(28px)" : "none",
          borderBottom: scrolled ? "1px solid var(--clr-border)" : "none",
          transition: "all .45s var(--ease-smooth)",
        }}
      >
        <button
          onClick={() => go("home")}
          style={{
            fontSize: "1.55rem",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "white",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Webiana.in
        </button>

        {/* Desktop Nav */}
        <nav className="hide-mob" style={{ display: "flex", gap: "2.5rem" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => go(href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:
                  active === href
                    ? "var(--clr-primary)"
                    : "var(--clr-text-muted)",
                transition: "color .2s",
              }}
            >
              {label}
            </button>
          ))}
          <a
            href="tel:+919046879317"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--clr-text-muted)",
              transition: "color .2s",
            }}
          >
            Contact
          </a>
        </nav>

        <div className="hide-mob">
          <Button size="sm" onClick={() => go("contact")}>
            Get Free Quote →
          </Button>
        </div>

        {/* Hamburger */}
        <button
          className="show-mob"
          onClick={() => setOpen((o) => !o)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "var(--clr-text)",
                borderRadius: "2px",
                transition: "transform .3s, opacity .3s",
                transform: open
                  ? i === 0
                    ? "rotate(45deg) translate(5px,5px)"
                    : i === 2
                      ? "rotate(-45deg) translate(5px,-5px)"
                      : ""
                  : "",
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </header>

      {/* Mobile overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(7,7,14,.97)",
          backdropFilter: "blur(28px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .4s",
        }}
      >
        {NAV_LINKS.map(({ label, href }, i) => (
          <button
            key={href}
            onClick={() => go(href)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "2.5rem",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "var(--clr-text)",
              transform: open ? "translateY(0)" : "translateY(20px)",
              opacity: open ? 1 : 0,
              transition: `transform .4s ease ${i * 55}ms, opacity .4s ease ${i * 55}ms, color .2s`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--clr-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--clr-text)")
            }
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════════════════════ */
function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <section id="home" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", textAlign:"center", padding:"130px 24px 90px", position:"relative", overflow:"hidden" }}>
      <div className="orb orb-1"/><div className="orb orb-2"/><div className="orb orb-3"/>
      <div className="grid-overlay"/>

      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", maxWidth:"920px", width:"100%" }}>
        <div className="hero-item" style={{ animationDelay:".05s" }}>
          <Badge>🚀 Small Business Web Agency — India</Badge>
        </div>

        <h1 className="hero-item" style={{ animationDelay:".18s", marginTop:"1.75rem",
          fontSize:"clamp(2.8rem,8vw,6.5rem)", fontWeight:900, letterSpacing:"-0.05em", lineHeight:.95, color:"var(--clr-text)" }}>
          Your Business
          <br/><span className="grad-hero">Deserves More</span>
          <br/>Than a Template
        </h1>

        <p className="hero-item" style={{ animationDelay:".32s", marginTop:"1.75rem",
          fontSize:"1.08rem", color:"var(--clr-text-muted)", maxWidth:"520px", lineHeight:1.78 }}>
          We craft stunning, fast, and affordable websites for small businesses — with{" "}
          <strong style={{ color:"var(--clr-text)" }}>6 months free maintenance</strong> on every project.
        </p>

        <div className="hero-item" style={{ animationDelay:".46s", marginTop:"2.5rem",
          display:"flex", gap:"1rem", flexWrap:"wrap", justifyContent:"center" }}>
          <Button size="lg" onClick={() => go("contact")}>Get a Free Quote →</Button>
          <Button variant="outline" size="lg" onClick={() => go("portfolio")}>See Our Work</Button>
        </div>

        <p className="hero-item" style={{ animationDelay:".55s", marginTop:"1rem",
          fontSize:"0.72rem", color:"var(--clr-text-subtle)", letterSpacing:"0.06em" }}>
          No contracts · No hidden fees · Free consultation call
        </p>

        {/* Stats */}
        <div className="hero-item stats-grid" style={{
          animationDelay:".68s", marginTop:"4rem", width:"100%", maxWidth:"680px",
          display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1.5rem",
          border:"1px solid var(--clr-border)", borderRadius:"20px",
          background:"rgba(255,255,255,.025)", backdropFilter:"blur(12px)", padding:"1.75rem 1.5rem",
        }}>
          {STATS.map(({ value, label }) => (
            <div key={label} style={{ textAlign:"center" }}>
              <div className="grad-num" style={{ fontSize:"2rem", fontWeight:900, letterSpacing:"-0.04em" }}>{value}</div>
              <div style={{ fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:"0.1em", color:"var(--clr-text-subtle)", marginTop:"4px", fontWeight:600 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="hero-item" style={{ animationDelay:".85s", marginTop:"4rem",
          display:"flex", flexDirection:"column", alignItems:"center", gap:"8px", opacity:.32 }}>
          <span style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"0.15em", color:"var(--clr-text-subtle)" }}>Scroll</span>
          <div className="scroll-line"/>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SERVICES
   ══════════════════════════════════════════════════════════════ */
function ServiceCard({ icon, accent, title, desc, delay }) {
  return (
    <AnimSection delay={delay}>
      <div className="glass-card" style={{ padding:"2.25rem 2rem", height:"100%", position:"relative", overflow:"hidden" }}>
        <div style={{ width:"56px", height:"56px", borderRadius:"16px", display:"flex",
          alignItems:"center", justifyContent:"center", fontSize:"1.75rem", marginBottom:"1.5rem",
          background:`${accent}14`, border:`1px solid ${accent}30`,
          transition:"transform .35s var(--ease-spring)" }}>
          {icon}
        </div>
        <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"var(--clr-text)", marginBottom:"0.75rem" }}>{title}</h3>
        <p style={{ fontSize:"0.87rem", color:"var(--clr-text-muted)", lineHeight:1.78 }}>{desc}</p>
        <div className="card-bar" style={{ position:"absolute", bottom:0, left:0, height:"2px",
          width:0, background:`linear-gradient(90deg,${accent},transparent)`,
          transition:"width .55s var(--ease-smooth)" }}/>
      </div>
    </AnimSection>
  );
}

function Services() {
  return (
    <section id="services" style={{ padding:"7rem 1.5rem" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <AnimSection>
          <SectionTitle eyebrow="What We Do" title={<>Services Built for<br/>Real Business Growth</>}
            subtitle="From ideation to launch, we handle everything — so you focus on running your business." />
        </AnimSection>
        <div style={{ marginTop:"4rem", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1.5rem" }}>
          {SERVICES.map((s, i) => <ServiceCard key={s.id} {...s} delay={i*.08} />)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PORTFOLIO
   ══════════════════════════════════════════════════════════════ */
function PortfolioCard({ name, category, desc, emoji, bg, tags, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <AnimSection delay={delay}>
      <div className={`port-card ${bg}`}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div className="port-emoji">{emoji}</div>
        <div style={{ position:"absolute", top:"1.25rem", right:"1.25rem", width:"36px", height:"36px",
          borderRadius:"50%", border:"1px solid rgba(255,255,255,.2)",
          display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:".85rem",
          opacity: hovered?1:0, transform: hovered?"translateY(0)":"translateY(8px)", transition:"all .3s" }}>↗</div>
        <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column",
          justifyContent:"flex-end", height:"100%", padding:"1.5rem" }}>
          <span style={{ fontSize:"0.64rem", fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,.5)" }}>{category}</span>
          <h3 style={{ fontSize:"1.3rem", fontWeight:900, color:"#fff", margin:".3rem 0 .5rem" }}>{name}</h3>
          <p style={{ fontSize:"0.8rem", color:"rgba(255,255,255,.55)", lineHeight:1.68, marginBottom:".75rem",
            opacity: hovered?1:0, transform: hovered?"translateY(0)":"translateY(6px)", transition:"all .3s .05s" }}>{desc}</p>
          <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
            {tags.map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </div>
      </div>
    </AnimSection>
  );
}

function Portfolio() {
  return (
    <section id="portfolio" style={{ padding:"7rem 1.5rem" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <AnimSection>
          <SectionTitle eyebrow="Our Work" title={<>Websites We've<br/>Crafted with Care</>}
            subtitle="Custom-built for real businesses. Never templated, always tailored to your brand." />
        </AnimSection>
        <div style={{ marginTop:"4rem", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1.5rem" }}>
          {PORTFOLIO.map((p, i) => <PortfolioCard key={p.id} {...p} delay={i*.07} />)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   TEAM
   ══════════════════════════════════════════════════════════════ */
function TeamCard({ name, role, emoji, color, tc, skills, delay }) {
  return (
    <AnimSection delay={delay}>
      <div className={`team-card ${tc}`}>
        <div className="team-avatar"><span style={{ fontSize:"2.2rem" }}>{emoji}</span></div>
        <div style={{ marginTop:"1.25rem" }}>
          <h3 style={{ fontSize:"1.08rem", fontWeight:900, color }}>{name}</h3>
          <p style={{ fontSize:"0.82rem", color:"var(--clr-text-muted)", marginTop:"4px", fontWeight:500 }}>{role}</p>
        </div>
        <div style={{ marginTop:"1rem", display:"flex", flexWrap:"wrap", gap:"6px" }}>
          {skills.map(s => (
            <span key={s} style={{ fontSize:"0.64rem", fontWeight:700, letterSpacing:"0.04em",
              padding:"4px 10px", borderRadius:"8px", background:"rgba(255,255,255,0.05)",
              border:"1px solid var(--clr-border)", color:"var(--clr-text-muted)" }}>{s}</span>
          ))}
        </div>
        <div style={{ marginTop:"1.25rem", height:"2px", width:"32px", borderRadius:"99px",
          background:color, transition:"width .5s var(--ease-smooth)" }}/>
      </div>
    </AnimSection>
  );
}

function Team() {
  return (
    <section id="team" style={{ padding:"7rem 1.5rem" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <AnimSection>
          <SectionTitle eyebrow="The Team" title={<>Four Friends.<br/>One Mission.</>}
            subtitle="A tight-knit crew of passionate builders helping small businesses get online beautifully." />
        </AnimSection>
        <div style={{ marginTop:"4rem", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:"1.5rem" }}>
          {TEAM.map((m, i) => <TeamCard key={m.id} {...m} delay={i*.1} />)}
        </div>
        <AnimSection delay={.2}>
          <div style={{ marginTop:"2.5rem", textAlign:"center", border:"1px solid var(--clr-border)",
            borderRadius:"20px", padding:"2rem 2.5rem", background:"var(--clr-surface)" }}>
            <p style={{ color:"var(--clr-text-muted)", fontSize:"0.92rem", lineHeight:1.78, maxWidth:"520px", margin:"0 auto" }}>
              💡 We started Webiana.in because too many small businesses were losing customers to competitors with better websites.{" "}
              <strong style={{ color:"var(--clr-text)" }}>We're here to fix that.</strong>
            </p>
          </div>
        </AnimSection>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PROCESS
   ══════════════════════════════════════════════════════════════ */
function ProcessStep({ step, title, desc, isLast, delay }) {
  return (
    <AnimSection delay={delay} style={{ display:"flex", gap:"1.5rem" }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
        <div style={{ width:"48px", height:"48px", borderRadius:"50%",
          border:"2px solid var(--clr-primary)", background:"var(--clr-primary-bg)",
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"var(--clr-primary)", fontWeight:900, fontSize:"0.78rem", flexShrink:0 }}>{step}</div>
        {!isLast && <div className="proc-line"/>}
      </div>
      <div style={{ paddingBottom:"3rem" }}>
        <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"var(--clr-text)", marginBottom:".5rem" }}>{title}</h3>
        <p style={{ fontSize:"0.87rem", color:"var(--clr-text-muted)", lineHeight:1.78 }}>{desc}</p>
      </div>
    </AnimSection>
  );
}

function Process() {
  return (
    <section style={{ padding:"7rem 1.5rem", background:"var(--clr-surface-alt)" }}>
      <div className="proc-grid" style={{ maxWidth:"1200px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start" }}>
        <AnimSection direction="left">
          <SectionTitle eyebrow="How We Work" title={<>Simple Process,<br/>Stunning Results</>}
            subtitle="We've refined our workflow to deliver fast without cutting corners." />
          <div style={{ marginTop:"2.5rem", display:"flex", gap:"2.5rem", flexWrap:"wrap" }}>
            {[["7–14","Days avg. delivery","var(--clr-primary)"],["100%","Client satisfaction","var(--clr-emerald)"],["₹0","Consultation cost","var(--clr-amber)"]].map(([v,l,c]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:"2rem", fontWeight:900, color:c, letterSpacing:"-0.04em" }}>{v}</div>
                <div style={{ fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:"0.1em", color:"var(--clr-text-subtle)", marginTop:"4px" }}>{l}</div>
              </div>
            ))}
          </div>
        </AnimSection>
        <div style={{ marginTop:".5rem" }}>
          {PROCESS.map((s, i) => <ProcessStep key={s.step} {...s} isLast={i===PROCESS.length-1} delay={i*.12} />)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PRICING
   ══════════════════════════════════════════════════════════════ */
function PricingCard({ name, price, note, pages, popular, features, delay }) {
  const go = () => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" });
  return (
    <AnimSection delay={delay}>
      <div style={{ position:"relative", borderRadius:"24px", padding:"2.5rem 2rem",
        display:"flex", flexDirection:"column", height:"100%",
        background: popular ? "linear-gradient(135deg,rgba(255,107,53,.12),rgba(245,158,11,.06))":"var(--clr-surface)",
        border: popular ? "2px solid var(--clr-primary-subtle)":"1px solid var(--clr-border)",
        boxShadow: popular ? "0 0 60px rgba(255,107,53,.18)":"none",
        transform: popular ? "scale(1.04)":"scale(1)",
        transition:"transform .45s var(--ease-spring), box-shadow .45s",
      }}
        onMouseEnter={e => e.currentTarget.style.transform = popular ? "scale(1.06)":"translateY(-6px)"}
        onMouseLeave={e => e.currentTarget.style.transform = popular ? "scale(1.04)":"scale(1)"}
      >
        {popular && (
          <div style={{ position:"absolute", top:"-14px", left:"50%", transform:"translateX(-50%)",
            background:"linear-gradient(135deg,var(--clr-primary),var(--clr-amber))", color:"#fff",
            borderRadius:"999px", padding:"4px 20px", fontSize:"0.62rem", fontWeight:900,
            letterSpacing:"0.12em", textTransform:"uppercase", whiteSpace:"nowrap" }}>Most Popular</div>
        )}
        <div style={{ fontSize:"0.7rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.12em", color:"var(--clr-text-subtle)", marginBottom:".75rem" }}>{name}</div>
        <div style={{ fontSize:"3rem", fontWeight:900, letterSpacing:"-0.05em", color:"var(--clr-text)", lineHeight:1 }}>{price}</div>
        <div style={{ fontSize:"0.7rem", color:"var(--clr-text-subtle)", marginTop:"4px", marginBottom:".5rem" }}>{note}</div>
        <div style={{ fontSize:"0.85rem", fontWeight:700, color:"var(--clr-primary)", marginBottom:"1.75rem" }}>{pages}</div>
        <div style={{ height:"1px", background:"var(--clr-border)", marginBottom:"1.75rem" }}/>
        <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:".9rem", flex:1, marginBottom:"2rem" }}>
          {features.map(f => (
            <li key={f} style={{ display:"flex", alignItems:"center", gap:".75rem", fontSize:"0.87rem", color:"var(--clr-text-muted)" }}>
              <span style={{ width:"20px", height:"20px", borderRadius:"50%", background:"var(--clr-primary-bg)",
                border:"1px solid var(--clr-primary-subtle)", display:"flex", alignItems:"center", justifyContent:"center",
                color:"var(--clr-primary)", fontSize:"0.68rem", fontWeight:900, flexShrink:0 }}>✓</span>
              {f}
            </li>
          ))}
        </ul>
        <Button variant={popular ? "primary":"outline"} fullWidth onClick={go}>Get Started →</Button>
      </div>
    </AnimSection>
  );
}

function Pricing() {
  return (
    <section id="pricing" style={{ padding:"7rem 1.5rem" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <AnimSection>
          <SectionTitle center eyebrow="Pricing" title={<>Transparent Pricing.<br/>No Surprises.</>}
            subtitle="All plans include 6 months of free maintenance. What you see is exactly what you pay." />
        </AnimSection>
        <div style={{ marginTop:"5rem", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"2rem", alignItems:"stretch" }}>
          {PRICING.map((p, i) => <PricingCard key={p.id} {...p} delay={i*.1} />)}
        </div>
        <AnimSection delay={.3}>
          <p style={{ textAlign:"center", fontSize:"0.8rem", color:"var(--clr-text-subtle)", marginTop:"2.5rem" }}>
            🎁 All plans include a <strong style={{ color:"var(--clr-text)" }}>free 30-minute strategy call</strong>. Need something custom?{" "}
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}
              style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", color:"var(--clr-primary)", textDecoration:"underline", fontSize:"inherit" }}>
              Let's talk.
            </button>
          </p>
        </AnimSection>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT
   ══════════════════════════════════════════════════════════════ */
function Field({ label, value, onChange, placeholder, required, type="text", multiline }) {
  const base = { width:"100%", background:"var(--clr-surface)", border:"1px solid var(--clr-border)",
    borderRadius:"14px", padding:"14px 18px", color:"var(--clr-text)", fontSize:"0.88rem",
    fontFamily:"inherit", outline:"none", transition:"border-color .2s" };
  const focus = (e) => e.target.style.borderColor = "var(--clr-primary)";
  const blur  = (e) => e.target.style.borderColor = "var(--clr-border)";
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
      <label style={{ fontSize:"0.65rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.1em", color:"var(--clr-text-subtle)" }}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={onChange} placeholder={placeholder} required={required} rows={5}
            style={{ ...base, resize:"vertical" }} onFocus={focus} onBlur={blur}/>
        : <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}
            style={base} onFocus={focus} onBlur={blur}/>
      }
    </div>
  );
}

function Contact() {
  const [f, setF] = useState({ name:"", email:"", business:"", message:"" });
  const [sent, setSent] = useState(false);
  const set = k => e => setF(x => ({ ...x, [k]:e.target.value }));

  return (
    <section id="contact" style={{ padding:"7rem 1.5rem" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <AnimSection>
          <SectionTitle eyebrow="Let's Talk" title={<>Start Your Project<br/>Today — It's Free</>}
            subtitle="Tell us about your business and we'll respond within 24 hours with a tailored plan." />
        </AnimSection>

        <div className="contact-grid" style={{ marginTop:"4rem", display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:"3rem", alignItems:"start" }}>
          <AnimSection delay={.1}>
            {sent ? (
              <div style={{ border:"1px solid var(--clr-primary-subtle)", background:"var(--clr-primary-bg)",
                borderRadius:"24px", padding:"5rem 3rem", textAlign:"center" }}>
                <div style={{ fontSize:"4rem", marginBottom:"1rem" }}>🎉</div>
                <h3 style={{ fontSize:"1.75rem", fontWeight:900, color:"var(--clr-text)" }}>Message Sent!</h3>
                <p style={{ color:"var(--clr-text-muted)", marginTop:".75rem", fontSize:"0.92rem" }}>We'll get back to you within 24 hours with a free tailored plan.</p>
                <div style={{ marginTop:"2rem" }}>
                  <Button variant="outline" onClick={() => setSent(false)}>Send Another Message</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }}
                style={{ background:"var(--clr-surface)", border:"1px solid var(--clr-border)", borderRadius:"24px", padding:"2.5rem", display:"flex", flexDirection:"column", gap:"1.25rem" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem" }}>
                  <Field label="Your Name" placeholder="Ravi Sharma" value={f.name} onChange={set("name")} required />
                  <Field label="Email" type="email" placeholder="ravi@business.in" value={f.email} onChange={set("email")} required />
                </div>
                <Field label="Business Name" placeholder="My Awesome Shop" value={f.business} onChange={set("business")} />
                <Field label="Tell Us About Your Project" multiline placeholder="I run a restaurant and need a website with menu, photos, and booking system..." value={f.message} onChange={set("message")} required />
                <div style={{ marginTop:".5rem" }}>
                  <Button type="submit" size="lg" fullWidth>Send Message — We'll Reply Within 24h →</Button>
                </div>
              </form>
            )}
          </AnimSection>

          <AnimSection delay={.2} style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
            <div style={{ background:"var(--clr-surface)", border:"1px solid var(--clr-border)", borderRadius:"20px", padding:"1.75rem", display:"flex", flexDirection:"column", gap:"1.5rem" }}>
              {CONTACT_INFO.map(({ icon, label, value }) => (
                <div key={label} style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
                  <div style={{ width:"44px", height:"44px", borderRadius:"14px", background:"var(--clr-primary-bg)",
                    border:"1px solid var(--clr-primary-subtle)", display:"flex", alignItems:"center",
                    justifyContent:"center", fontSize:"1.2rem", flexShrink:0 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:700, color:"var(--clr-text-subtle)" }}>{label}</div>
                    <div style={{ fontSize:"0.88rem", fontWeight:700, color:"var(--clr-text)", marginTop:"2px" }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
            {[
              { icon:"🎁", title:"Free Strategy Call", desc:"Book a free 30-min call. We discuss your goals and give a quote — zero obligation." },
              { icon:"🛡️", title:"Our Promise",         desc:"Not happy with the design mockup? We'll revise until you love it — or you owe us nothing." },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background:"var(--clr-surface)", border:"1px solid var(--clr-border)", borderRadius:"20px", padding:"1.75rem" }}>
                <div style={{ fontSize:"2rem", marginBottom:".75rem" }}>{icon}</div>
                <h4 style={{ fontSize:"1rem", fontWeight:900, color:"var(--clr-text)", marginBottom:".5rem" }}>{title}</h4>
                <p style={{ fontSize:"0.83rem", color:"var(--clr-text-muted)", lineHeight:1.78 }}>{desc}</p>
              </div>
            ))}
          </AnimSection>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════════ */
function Footer() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  return (
    <footer style={{ borderTop:"1px solid var(--clr-border)", padding:"4rem 1.5rem 3rem", background:"var(--clr-surface-alt)" }}>
      <div className="footer-grid" style={{ maxWidth:"1200px", margin:"0 auto", display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr", gap:"3rem" }}>
        <div>
          <div className="grad-logo" style={{ fontSize:"1.6rem", fontWeight:900, letterSpacing:"-0.04em", marginBottom:"1rem" }}>Webiana.in</div>
          <p style={{ fontSize:"0.87rem", color:"var(--clr-text-muted)", lineHeight:1.78, maxWidth:"280px" }}>
            A web agency built by four friends who believe every small business deserves a beautiful online presence.
          </p>
        </div>
        <div>
          <div style={{ fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:800, color:"var(--clr-text-subtle)", marginBottom:"1.25rem" }}>Navigation</div>
          <div style={{ display:"flex", flexDirection:"column", gap:".75rem" }}>
            {NAV_LINKS.map(({ label, href }) => (
              <button key={href} onClick={() => go(href)}
                style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"inherit",
                  fontSize:"0.87rem", color:"var(--clr-text-muted)", textAlign:"left", transition:"color .2s" }}
                onMouseEnter={e=>e.target.style.color="var(--clr-primary)"}
                onMouseLeave={e=>e.target.style.color="var(--clr-text-muted)"}
              >{label}</button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:800, color:"var(--clr-text-subtle)", marginBottom:"1.25rem" }}>Get In Touch</div>
          <div style={{ display:"flex", flexDirection:"column", gap:".6rem", fontSize:"0.87rem", color:"var(--clr-text-muted)" }}>
            <span>hello@webiana.in</span>
            <span>+91 98765 43210</span>
            <span>India — Nationwide</span>
          </div>
        </div>
      </div>
      <div style={{ maxWidth:"1200px", margin:"3rem auto 0", paddingTop:"1.5rem", borderTop:"1px solid var(--clr-border)",
        display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
        <p style={{ fontSize:"0.72rem", color:"var(--clr-text-subtle)" }}>© {new Date().getFullYear()} Webiana.in — All rights reserved.</p>
        <p style={{ fontSize:"0.72rem", color:"var(--clr-text-subtle)" }}>Built with ❤️ by four friends in India</p>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════
   APP ROOT
   ══════════════════════════════════════════════════════════════ */
export default function App() {
  const active = useActiveSection(["home","services","portfolio","team","pricing","contact"]);
  return (
    <>
      <GlobalStyles />
      <Navbar active={active} />
      <main>
        <Hero />
        <Divider />
        <Services />
        <Divider />
        <Portfolio />
        <Divider />
        <Team />
        <Process />
        <Divider />
        <Pricing />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

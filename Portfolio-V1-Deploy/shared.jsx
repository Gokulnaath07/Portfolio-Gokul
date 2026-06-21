// shared.jsx — site-wide hooks/components shared across all 3 variations.
// Theme toggle, command palette, terminal typer, animated counters,
// cursor-following accent, and the master content blob.

const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ---------- Master content (single source of truth) ----------
const CONTENT = {
  name: "Gokulnaath Govindaraj",
  handle: "@gokulnaathg",
  location: "Boston, MA · open to relocation",
  email: "gokulnaathgovindaraj07@gmail.com",
  phone: "+1 224-587-4888",
  linkedin: "linkedin.com/in/gokulnaathg",
  site: "gokulnaath07.com",
  resumePdf: "resume/Gokulnaath_Govindaraj_Base_Software_Engineer.pdf",
  status: "OPT through Feb 2029 · no sponsorship needed",
  tagline: "AI systems engineer & technical founder",
  portrait: "assets/portrait.jpg",
  portraitSquare: "assets/portrait-square.jpg",
  portraitDuotone: "assets/portrait-duotone.jpg",
  portraitHalftone: "assets/portrait-halftone.jpg",
  videoSrc: "assets/intro.mp4",

  hero: {
    kicker: "Runner-Up · Wright Venture 2026",
    headline: "I built AccioFirst alone, and the judges put $2,000 behind it.",
    sub: "AI systems engineer shipping production RAG pipelines at AriesView, training the next generation of coding agents at Handshake AI, and founding tools that fix broken job markets.",
  },

  metrics: [
    { value: 93, suffix: "%", label: "Retrieval recall on a 600-query RAG eval" },
    { value: 1800, suffix: "ms → 200ms", label: "p95 API latency under 2k RPS", display: "1.8s" },
    { value: 30000, suffix: "+ LOC", label: "Java Android codebase navigated solo" },
    { value: 2000, prefix: "$", suffix: "", label: "Wright Venture funding awarded" },
  ],

  bio: [
    { type: "cmd", text: "whoami" },
    { type: "out", text: "Gokulnaath Govindaraj — AI systems engineer, M.S. CS @ Wright State." },
    { type: "cmd", text: "cat now.md" },
    { type: "out", text: "Training coding agents at Handshake AI (Helix). Shipping RAG at AriesView." },
    { type: "out", text: "Founder of AccioFirst — runner-up at Wright Venture 2026." },
    { type: "cmd", text: "ls superpowers/" },
    { type: "out", text: "rag-pipelines/   evaluation-frameworks/   founder-instinct/" },
    { type: "out", text: "agentic-workflows/   postgres-tuning/   shipping-fast/" },
    { type: "cmd", text: "echo $STATUS" },
    { type: "out", text: "OPT until Feb 2029. Open to roles. Hi 👋" },
  ],

  experience: [
    {
      company: "Handshake AI",
      role: "AI Trainer, SWE & Agentic Workflows · Helix Project",
      when: "Apr 2026 – Present",
      where: "Remote · Contract",
      blurb: "Designing Ralph-loop autonomy and atomic prompt scaffolding that lets Claude Code agents solve software-engineering bounties without implementation leakage. Every submission clears Pass-to-Pass and Fail-to-Pass automated gates before it counts.",
      tags: ["Claude Code CLI", "Ralph loops", "Go", "Kubernetes", "kubebuilder"],
    },
    {
      company: "AriesView",
      role: "Software Engineer · NEC-backed",
      when: "Aug 2025 – Present",
      where: "Boston, MA",
      blurb: "Architected the RAG pipeline for a CRE due-diligence platform: hybrid BM25 + dense retrieval against Weaviate, OCR ingestion via Docling, and a 600-query evaluation framework that drove recall to 93%. Diagnosed a 2,000 RPS PostgreSQL bottleneck and dropped p95 latency from 1.8s to 200ms.",
      tags: ["FastAPI", "Weaviate", "PostgreSQL", "GraphQL", "Playwright", "k6"],
    },
    {
      company: "University of Connecticut",
      role: "Technical Lead · NSF I-Corps",
      when: "Sep 2024",
      where: "Hartford, CT",
      blurb: "Independently designed the Spring Boot backend for a peer-mentoring platform and integrated an LLM-powered chatbot via Spring AI. Federal grant: $2,500 to the team, $1,000 to me as Technical Lead.",
      tags: ["Spring Boot", "Spring AI", "REST"],
    },
    {
      company: "Porter Lee Corporation",
      role: "Programming Intern",
      when: "May – Aug 2024",
      where: "Schaumburg, IL",
      blurb: "Navigated a 30,000+ line Java Android codebase to build REST endpoints for an evidence-management system. Cut JSON deserialization by ~180ms and UI freeze by ~300ms via multithreaded background sync.",
      tags: ["Java", "Android", "JWT", "REST"],
    },
    {
      company: "Cognizant",
      role: "Programmer Analyst Trainee",
      when: "Sep 2022 – Mar 2023",
      where: "Chennai, India",
      blurb: "Navigated an unfamiliar Selenium + Java QA codebase, identifying 10+ critical production defects escalated before release.",
      tags: ["Selenium", "Java", "Agile"],
    },
  ],

  projects: [
    {
      slug: "rag-system",
      name: "RAG System",
      kicker: "Financial Document Intelligence",
      one: "Hybrid-retrieval RAG pipeline over SEC 10-K filings with zero hallucinated citations.",
      blurb: "Architected a frozen-layer financial RAG pipeline over SEC 10-K filings using hybrid BM25 + dense retrieval against ChromaDB. Engineered citation-enforced answering with Gemini 2.5 Flash and JSON-schema output. Designed a strict layered architecture with per-phase validation gates and a provider-agnostic LLM client.",
      stack: ["Python", "FastAPI", "ChromaDB", "BM25", "Gemini 2.5 Flash"],
      stat: "Zero hallucinated citations",
      year: "2025",
    },
    {
      slug: "acciofirst",
      name: "AccioFirst",
      kicker: "Runner-Up, Wright Venture 2026 · $2,000 funded",
      one: "Job intelligence scoring pipeline to identify ghost jobs and analyze applications.",
      blurb: "Designed and shipped as sole technical founder. A full-stack Next.js and FastAPI app integrating BrightData scraping, Crunchbase hiring signals, and Gemini 2.5 Flash-Lite for ghost-job scoring. Architected a serverless pipeline on GCP with Supabase PostgreSQL for scan history and caching.",
      stack: ["Next.js", "FastAPI", "Supabase", "BrightData", "Gemini 2.5 Flash-Lite", "GCP"],
      stat: "Verdict in under 5 seconds",
      year: "2026",
    },
    {
      slug: "geosyncra",
      name: "GeoSyncra",
      kicker: "Java/Spring Boot/enterprise spatial backend",
      one: "Spring Boot REST backend for a location-based navigation platform with a GiST-indexed schema.",
      blurb: "Built a Spring Boot REST backend for a location-based navigation platform with stateless JWT authentication and Docker deployment. Migrated the database layer from MySQL to PostgreSQL with a GiST-indexed schema that reduced average location query time significantly.",
      stack: ["Java", "Spring Boot", "PostgreSQL", "GiST", "Docker", "JWT"],
      stat: "~120ms → ~8ms query time",
      year: "2023",
    },
    {
      slug: "distributed-etl",
      name: "Distributed ETL Pipeline",
      kicker: "PySpark + Snowflake",
      one: "PySpark ETL pipeline processing a multi-million-row dataset across partitioned executors.",
      blurb: "Built a PySpark ETL pipeline processing a multi-million-row dataset across partitioned executors. Applied DataFrame transformations, joins, aggregations, and a window function, then wrote columnar Parquet output and loaded it into a Snowflake warehouse via COPY INTO for analytical querying.",
      stack: ["PySpark", "Snowflake", "Parquet", "ETL"],
      stat: "Multi-million-row dataset",
      year: "2024",
    },
    {
      slug: "taskmanager",
      name: "TaskManager",
      kicker: "RBAC / file uploads / enterprise Java",
      one: "Production-ready task management backend in Spring Boot with a dual-database architecture.",
      blurb: "Built a production-ready task management backend in Spring Boot with JWT authentication and role-based access control across all endpoints. Features full CRUD with pagination and search, and binary file uploads via MongoDB GridFS in a dual-database architecture.",
      stack: ["Java", "Spring Boot", "PostgreSQL", "MongoDB GridFS", "JWT"],
      stat: "Role-based access control",
      year: "2023",
    },
    {
      slug: "rl-balancing",
      name: "Game Character Balancing RL",
      kicker: "Mechanize, ML, Twitch",
      one: "Custom DQN reinforcement learning environment in PyTorch to balance game character win rates.",
      blurb: "Designed a custom DQN reinforcement learning environment in PyTorch to balance game character win rates. Trained an agent to 88% classification accuracy and a 35% reduction in win-rate variance through combined supervised feature extraction and RL policy optimization.",
      stack: ["PyTorch", "RL", "DQN", "Machine Learning"],
      stat: "88% accuracy · 35% variance drop",
      year: "2023",
    },
    {
      slug: "jobpilot",
      name: "JobPilot AI",
      kicker: "Recruiter outreach tracking application",
      one: "Next.js application with a Supabase/PostgreSQL backend for tracking recruiter outreach.",
      blurb: "Built and deployed JobPilot AI, a recruiter outreach tracking application in Next.js with a Supabase/PostgreSQL backend. Features a recruiter management dashboard, outreach pipeline UI, company tracking, and analytics widgets, deployed live on Vercel.",
      stack: ["Next.js", "Supabase", "PostgreSQL", "Vercel"],
      stat: "Live on Vercel",
      year: "2026",
    },
    {
      slug: "portfolio-website",
      name: "Portfolio Website",
      kicker: "Frontend-heavy React application",
      one: "Production React and Next.js portfolio with server-side rendering and responsive Tailwind layouts.",
      blurb: "Built a production React and Next.js portfolio with server-side rendering, responsive Tailwind layouts, and shadcn/ui components. Serves live traffic at gokulnaath07.com with mobile-first design and reduced-motion accessibility support.",
      stack: ["React", "Next.js", "Tailwind CSS", "shadcn/ui"],
      stat: "Mobile-first, accessible",
      year: "2026",
    },
  ],

  about: {
    location: "Boston, MA — open to relocation anywhere in the US.",
    education: [
      { school: "Wright State University", degree: "M.S. Computer Science · GPA 3.6", when: "Aug 2023 — Dec 2025" },
      { school: "Anna University", degree: "B.E. Mechatronics Engineering", when: "Aug 2018 — Apr 2022" },
    ],
    likes: ["building things solo end-to-end", "evaluation frameworks that actually measure something", "long codebases", "the moment a Ralph loop converges", "competition pitches"],
  },
};

// ---------- Theme ----------
function useTheme(defaultTheme = "light") {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("portfolio-theme") || defaultTheme; } catch { return defaultTheme; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("portfolio-theme", theme); } catch { }
  }, [theme]);
  return [theme, () => setTheme(t => t === "light" ? "dark" : "light")];
}

// ---------- Counter that animates when in view ----------
function useInView(ref, options = { threshold: 0.4 }) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } });
    }, options);
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, seen]);
  return seen;
}

function Counter({ value, prefix = "", suffix = "", display, duration = 1400, className = "" }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value, duration]);
  const formatted = display ?? (value >= 1000 ? Math.round(n).toLocaleString() : Math.round(n));
  return <span ref={ref} className={className}>{prefix}{formatted}{suffix}</span>;
}

// ---------- Terminal typer ----------
function Terminal({ lines, prompt = "~ ", onDone, charDelay = 18, lineDelay = 240 }) {
  const [done, setDone] = useState(0); // index of next line to type
  const [partial, setPartial] = useState("");
  const [blink, setBlink] = useState(true);
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    let timers = [];
    const typeLine = (i) => {
      if (cancelled.current) return;
      if (i >= lines.length) { onDone && onDone(); return; }
      const line = lines[i];
      let pos = 0;
      const step = () => {
        if (cancelled.current) return;
        pos++;
        setPartial(line.text.slice(0, pos));
        if (pos < line.text.length) {
          timers.push(setTimeout(step, line.type === "out" ? Math.max(6, charDelay - 8) : charDelay));
        } else {
          timers.push(setTimeout(() => {
            setDone(i + 1);
            setPartial("");
            typeLine(i + 1);
          }, lineDelay));
        }
      };
      timers.push(setTimeout(step, 80));
    };
    typeLine(0);
    return () => { cancelled.current = true; timers.forEach(clearTimeout); };
  }, [lines]);

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 520);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="term">
      {lines.slice(0, done).map((l, i) => (
        <div key={i} className={`term-line term-${l.type}`}>
          {l.type === "cmd" ? <><span className="term-prompt">{prompt}</span>{l.text}</> : l.text}
        </div>
      ))}
      {done < lines.length && (
        <div className={`term-line term-${lines[done].type}`}>
          {lines[done].type === "cmd" ? <span className="term-prompt">{prompt}</span> : null}
          {partial}
          <span className="term-caret" style={{ opacity: blink ? 1 : 0 }}>▋</span>
        </div>
      )}
    </div>
  );
}

// ---------- Cursor accent (large soft glow that follows the pointer) ----------
function CursorAccent({ color = "rgba(116, 0, 1, 0.18)", size = 520 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;
    let raf;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, [size]);
  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed", left: 0, top: 0, width: size, height: size, pointerEvents: "none",
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
        zIndex: 1, mixBlendMode: "multiply",
      }}
    />
  );
}

// ---------- Command palette ⌘K ----------
function CommandPalette({ items, onClose }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  const filtered = useMemo(() => {
    if (!q.trim()) return items;
    const ql = q.toLowerCase();
    return items.filter(it => (it.label + " " + (it.hint || "")).toLowerCase().includes(ql));
  }, [items, q]);

  useEffect(() => { setIdx(0); }, [q]);
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") { onClose(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setIdx(i => Math.min(filtered.length - 1, i + 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setIdx(i => Math.max(0, i - 1)); }
      else if (e.key === "Enter") { e.preventDefault(); filtered[idx]?.run?.(); onClose(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [filtered, idx, onClose]);

  return (
    <div className="cmdk-backdrop" onClick={onClose}>
      <div className="cmdk" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmdk-input"
          placeholder="Jump to anything…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <div className="cmdk-list">
          {filtered.length === 0 && <div className="cmdk-empty">No matches</div>}
          {filtered.map((it, i) => (
            <button
              key={it.label}
              className={"cmdk-item" + (i === idx ? " cmdk-on" : "")}
              onMouseEnter={() => setIdx(i)}
              onClick={() => { it.run?.(); onClose(); }}
            >
              <span className="cmdk-icon">{it.icon || "›"}</span>
              <span className="cmdk-label">{it.label}</span>
              {it.hint && <span className="cmdk-hint">{it.hint}</span>}
            </button>
          ))}
        </div>
        <div className="cmdk-foot">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}

function useCommandPalette(items) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  const node = open ? <CommandPalette items={items} onClose={() => setOpen(false)} /> : null;
  return { node, open, setOpen };
}

// ---------- LivingPortrait: framed photo + slow Ken-Burns + flicker ----------
function LivingPortrait({ src, frame = "oval", caption, className = "" }) {
  return (
    <div className={`lp lp-${frame} ${className}`}>
      <div className="lp-window">
        <img src={src} alt="Gokulnaath Govindaraj" />
        <div className="lp-flicker" aria-hidden></div>
        <div className="lp-vignette" aria-hidden></div>
      </div>
      {caption && <div className="lp-caption">{caption}</div>}
    </div>
  );
}

// ---------- VideoPortrait: a 3-second clip slot, looped, with poster fallback ----------
function VideoPortrait({ src, poster, caption, className = "" }) {
  const [hasVideo, setHasVideo] = useState(true);
  return (
    <div className={`vp ${className}`}>
      <div className="vp-window">
        {hasVideo ? (
          <video
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setHasVideo(false)}
          />
        ) : (
          <div className="vp-placeholder" style={{ backgroundImage: `url(${poster})` }}>
            <div className="vp-placeholder-label">Drop a 3-second clip at <code>{src}</code></div>
          </div>
        )}
        <div className="lp-flicker" aria-hidden></div>
        <div className="lp-vignette" aria-hidden></div>
      </div>
      {caption && <div className="lp-caption">{caption}</div>}
    </div>
  );
}

// ---------- Helpers ----------
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

// Expose to other JSX scripts.
// Inject base portrait styles once
if (typeof document !== 'undefined' && !document.getElementById('lp-styles')) {
  const s = document.createElement('style');
  s.id = 'lp-styles';
  s.textContent = `
    .lp, .vp { display:inline-block; max-width:100%; }
    .lp-window, .vp-window {
      position: relative; overflow: hidden;
      box-shadow: 0 14px 40px rgba(0,0,0,.25), 0 0 0 1px rgba(0,0,0,.1);
    }
    .lp-window img, .vp-window video, .vp-placeholder {
      width:100%; height:100%; object-fit:cover; display:block;
      filter: contrast(1.04) saturate(.92);
    }
    .lp-window img { animation: lp-kenburns 14s ease-in-out infinite alternate; }
    @keyframes lp-kenburns {
      0%   { transform: scale(1.04) translate(0,0); }
      100% { transform: scale(1.12) translate(-2%, -1%); }
    }
    .lp-flicker {
      position:absolute; inset:0; pointer-events:none;
      background: radial-gradient(120% 80% at 50% 30%, transparent 50%, rgba(0,0,0,.18) 100%);
      mix-blend-mode: multiply;
      animation: lp-flicker 3.4s ease-in-out infinite;
    }
    @keyframes lp-flicker {
      0%, 100% { opacity: .9; }
      48% { opacity: .78; }
      52% { opacity: 1; }
      80% { opacity: .85; }
    }
    .lp-vignette {
      position:absolute; inset:0; pointer-events:none;
      background: radial-gradient(110% 110% at 50% 45%, transparent 55%, rgba(0,0,0,.45) 100%);
    }
    .lp-oval .lp-window { border-radius: 50% / 46%; }
    .lp-rect .lp-window { border-radius: 4px; }
    .lp-arch .lp-window { border-radius: 50% 50% 4px 4px / 38% 38% 4px 4px; }
    .lp-caption {
      margin-top: 10px; text-align:center;
      font-family: "Cormorant Garamond","Source Serif 4",Georgia,serif;
      font-style:italic; font-size:14px; color: var(--ink-soft, #5a4f3f);
      max-width: 32ch; margin-left:auto; margin-right:auto; line-height:1.4;
    }
    .vp-placeholder {
      background-size: cover; background-position: center;
      position:relative;
    }
    .vp-placeholder-label {
      position:absolute; left:0; right:0; bottom:0;
      padding:8px 10px; font-family:"JetBrains Mono",ui-monospace,monospace;
      font-size:10px; color:#faf3e0; background:rgba(20,16,11,.7);
      text-align:center; letter-spacing:.04em;
    }
    .vp-placeholder-label code { font-family:inherit; color:#d3a625; }
  `;
  document.head.appendChild(s);
}

Object.assign(window, {
  CONTENT, useTheme, Counter, Terminal, CursorAccent, CommandPalette, useCommandPalette, scrollToId,
  LivingPortrait, VideoPortrait,
});

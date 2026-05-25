// variation3-modern.jsx — "Modern Crimson"
// Clean magazine grid. Generous type. Crimson and gold as accents only.
// Big numbers, sharp dividers, sticky side-rail nav.

const ModernApp = () => {
  const [theme, toggleTheme] = useTheme("light");
  const [active, setActive] = useState("intro");

  const sections = [
    { id: "intro", label: "Intro" },
    { id: "metrics", label: "Numbers" },
    { id: "bio", label: "Bio" },
    { id: "exp", label: "Work" },
    { id: "proj", label: "Projects" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id.replace("mc-", "")); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(s => { const el = document.getElementById("mc-" + s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const cmdItems = [
    ...sections.map(s => ({ label: s.label, icon: "→", run: () => scrollToId("mc-" + s.id) })),
    { label: "Toggle theme", icon: "◐", hint: theme === "light" ? "→ dark" : "→ light", run: toggleTheme },
    { label: "Download résumé", icon: "⤓", hint: "PDF", run: () => window.open(CONTENT.resumePdf, "_blank") },
    { label: "Email", icon: "✉", run: () => window.location.href = `mailto:${CONTENT.email}` },
    ...CONTENT.projects.map(p => ({ label: p.name, icon: "▢", hint: "project", run: () => scrollToId(`mc-${p.slug}`) })),
  ];
  const { node: cmdNode, setOpen } = useCommandPalette(cmdItems);

  return (
    <div className="modern-root">
      <CursorAccent color="rgba(116, 0, 1, 0.10)" size={420} />

      {/* Sticky side rail */}
      <nav className="mc-rail">
        <div className="mc-rail-mark">G·G</div>
        <ul>
          {sections.map(s => (
            <li key={s.id} className={active === s.id ? "on" : ""}>
              <a onClick={(e) => { e.preventDefault(); scrollToId("mc-" + s.id); }} href={`#mc-${s.id}`}>
                <span className="mc-rail-dot" />{s.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mc-rail-foot">
          <button onClick={toggleTheme} className="mc-rail-btn" aria-label="Theme">{theme === "light" ? "◐" : "◑"}</button>
          <button onClick={() => setOpen(true)} className="mc-rail-btn" aria-label="Search"><kbd>⌘</kbd>K</button>
        </div>
      </nav>

      <main className="mc-main">
        {/* Intro */}
        <section id="mc-intro" className="mc-intro">
          <div className="mc-eyebrow">
            <span className="mc-pulse" /> Available · {CONTENT.status}
          </div>
          <h1 className="mc-h1">
            <span className="mc-h1-line">{CONTENT.name}</span>
            <span className="mc-h1-sub">{CONTENT.tagline}.</span>
          </h1>
          <div className="mc-hero-grid">
            <div className="mc-hero-text">
              <p className="mc-intro-blurb">
                I ship production RAG at <a className="mc-link" href="#mc-exp">AriesView</a>, train coding agents at <a className="mc-link" href="#mc-exp">Handshake AI</a>, and built <a className="mc-link" href="#mc-acciofirst">AccioFirst</a> alone — Runner-Up at Wright Venture 2026, $2,000 funded.
              </p>
              <div className="mc-intro-actions">
                <a href={CONTENT.resumePdf} target="_blank" rel="noreferrer" className="mc-btn mc-btn-primary">⤓ Download résumé</a>
                <a href={`mailto:${CONTENT.email}`} className="mc-btn">✉ {CONTENT.email}</a>
              </div>
              <div className="mc-intro-feat">
                <span>Featured in</span>
                <em>Wright Venture 2026 (Runner-Up)</em>
                <span>·</span>
                <em>NSF I-Corps Cohort '24</em>
              </div>
            </div>
            <figure className="mc-portrait">
              <img src={CONTENT.portraitSquare} alt="Gokulnaath Govindaraj" />
              <figcaption>Govindaraj, M.S. CS, Wright State, 2025.</figcaption>
            </figure>
          </div>
        </section>

        {/* Metrics */}
        <section id="mc-metrics" className="mc-metrics">
          <div className="mc-section-head">
            <span className="mc-num">01</span>
            <h2>The numbers</h2>
            <span className="mc-line" />
          </div>
          <div className="mc-metric-grid">
            {CONTENT.metrics.map((m, i) => (
              <div key={i} className="mc-metric">
                <div className="mc-metric-num"><Counter value={m.value} prefix={m.prefix} suffix={m.suffix} display={m.display} /></div>
                <div className="mc-metric-lab">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Bio */}
        <section id="mc-bio" className="mc-bio">
          <div className="mc-section-head">
            <span className="mc-num">02</span>
            <h2>The story so far</h2>
            <span className="mc-line" />
          </div>
          <div className="mc-bio-grid">
            <div className="mc-bio-text">
              <p className="mc-bio-lead">I'm an AI systems engineer who ships. Pipelines, evals, services, the UI on top. I want to be the engineer you hand the ambiguous problem to.</p>
              <p>I'm finishing my M.S. at Wright State this December, training agents at Handshake AI, and shipping production RAG at AriesView. I founded <b>AccioFirst</b> to attack the ghost-job problem — eight months of solo work, a Wright Venture pitch, $2,000 in funding, and counting.</p>
              <p>Based in Boston, MA. OPT through 2029. No sponsorship needed.</p>
            </div>
            <div className="mc-bio-term">
              <VideoPortrait src={CONTENT.videoSrc} poster={CONTENT.portraitSquare} caption="A 3-second loop — drop a clip at assets/intro.mp4 to make it move." className="mc-video" />
              <div style={{height: 14}} />
              <div className="mc-term-bar">
                <span className="mc-term-dot mc-d-red" />
                <span className="mc-term-dot mc-d-amber" />
                <span className="mc-term-dot mc-d-green" />
                <span className="mc-term-title">~/gokulnaath</span>
              </div>
              <Terminal lines={CONTENT.bio} prompt="$ " charDelay={20} />
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="mc-exp" className="mc-exp">
          <div className="mc-section-head">
            <span className="mc-num">03</span>
            <h2>Where I've shipped</h2>
            <span className="mc-line" />
          </div>
          <ol className="mc-exp-list">
            {CONTENT.experience.map((e, i) => (
              <li key={i} className="mc-exp-item">
                <div className="mc-exp-when">{e.when}</div>
                <div className="mc-exp-body">
                  <h3 className="mc-exp-co">{e.company}<span className="mc-exp-dot">·</span><span className="mc-exp-role">{e.role}</span></h3>
                  <div className="mc-exp-where">{e.where}</div>
                  <p>{e.blurb}</p>
                  <div className="mc-tags">{e.tags.map(t => <span key={t} className="mc-tag">{t}</span>)}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Projects */}
        <section id="mc-proj" className="mc-proj">
          <div className="mc-section-head">
            <span className="mc-num">04</span>
            <h2>Selected projects</h2>
            <span className="mc-line" />
          </div>
          <div className="mc-proj-list">
            {CONTENT.projects.map((p, i) => (
              <article key={p.slug} id={`mc-${p.slug}`} className={"mc-card" + (i === 0 ? " mc-card-feat" : "")}>
                <div className="mc-card-head">
                  <div className="mc-card-meta">
                    <span className="mc-card-year">{p.year}</span>
                    <span className="mc-card-dot">·</span>
                    <span className="mc-card-stack-line">{p.stack.slice(0, 4).join(" · ")}</span>
                  </div>
                  <h3 className="mc-card-name">{p.name}</h3>
                  <div className="mc-card-kicker">{p.kicker}</div>
                </div>
                <div className="mc-card-body">
                  <p className="mc-card-one">{p.one}</p>
                  <p className="mc-card-blurb">{p.blurb}</p>
                </div>
                <div className="mc-card-foot">
                  <div className="mc-card-stat">{p.stat}</div>
                  <div className="mc-card-stack">
                    {p.stack.map(s => <span key={s} className="mc-stack">{s}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="mc-about" className="mc-about">
          <div className="mc-section-head">
            <span className="mc-num">05</span>
            <h2>Off the clock</h2>
            <span className="mc-line" />
          </div>
          <div className="mc-about-grid">
            <div>
              <h3>Education</h3>
              {CONTENT.about.education.map(ed => (
                <div key={ed.school} className="mc-edu">
                  <div className="mc-edu-school">{ed.school}</div>
                  <div className="mc-edu-deg">{ed.degree}</div>
                  <div className="mc-edu-when">{ed.when}</div>
                </div>
              ))}
            </div>
            <div>
              <h3>Honors</h3>
              <div className="mc-honor">
                <b>Runner-Up · Wright Venture 2026</b>
                <div>$2,000 awarded for AccioFirst, out of five finalists.</div>
              </div>
              <div className="mc-honor">
                <b>Technical Lead · NSF I-Corps</b>
                <div>$1,000 awarded as technical lead of a $2,500 team grant.</div>
              </div>
            </div>
            <div>
              <h3>Things I'm into</h3>
              <ul className="mc-likes">{CONTENT.about.likes.map(l => <li key={l}>{l}</li>)}</ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="mc-contact" className="mc-contact">
          <div className="mc-section-head">
            <span className="mc-num">06</span>
            <h2>Let's talk</h2>
            <span className="mc-line" />
          </div>
          <div className="mc-contact-card">
            <p className="mc-contact-pre">If you're hiring, building something interesting, or want to compare notes on agent training:</p>
            <a href={`mailto:${CONTENT.email}`} className="mc-contact-mail">{CONTENT.email}</a>
            <div className="mc-contact-grid">
              <div><span>LinkedIn</span><a href={`https://${CONTENT.linkedin}`} target="_blank" rel="noreferrer">{CONTENT.linkedin}</a></div>
              <div><span>Site</span><a href={`https://${CONTENT.site}`} target="_blank" rel="noreferrer">{CONTENT.site}</a></div>
              <div><span>Phone</span><span>{CONTENT.phone}</span></div>
              <div><span>Location</span><span>Boston, MA</span></div>
            </div>
            <a className="mc-resume-cta" href={CONTENT.resumePdf} target="_blank" rel="noreferrer">⤓ Download résumé (PDF)</a>
          </div>
          <footer className="mc-foot">
            <span>© 2026 {CONTENT.name}</span>
            <span>Crafted in HTML · Press <kbd>⌘K</kbd> to navigate</span>
          </footer>
        </section>
      </main>

      {cmdNode}
    </div>
  );
};

window.ModernApp = ModernApp;

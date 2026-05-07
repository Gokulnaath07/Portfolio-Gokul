// variation2-manuscript.jsx — "House Manuscript"
// Illuminated manuscript meets modern editorial. Heavy on Cinzel/Cormorant.
// Generous white space, ornamental dividers, column-aligned details.

const ManuscriptApp = () => {
  const [theme, toggleTheme] = useTheme("light");

  const cmdItems = [
    { label: "Top", icon: "✦", run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "The Founder's Tale", icon: "❦", run: () => scrollToId("m-hero") },
    { label: "Numbers of Note", icon: "❖", run: () => scrollToId("m-metrics") },
    { label: "About the Author", icon: "❀", run: () => scrollToId("m-bio") },
    { label: "Chronicle of Work", icon: "✎", run: () => scrollToId("m-exp") },
    { label: "Index of Works", icon: "❁", run: () => scrollToId("m-proj") },
    { label: "Of the Author", icon: "✧", run: () => scrollToId("m-about") },
    { label: "Send a Letter", icon: "✉", run: () => scrollToId("m-contact") },
    { label: "Toggle theme", icon: "◐", hint: theme === "light" ? "→ dark" : "→ light", run: toggleTheme },
    { label: "Download résumé", icon: "⤓", hint: "PDF", run: () => window.open(CONTENT.resumePdf, "_blank") },
    ...CONTENT.projects.map(p => ({ label: `Work · ${p.name}`, icon: "❖", run: () => scrollToId(`m-${p.slug}`) })),
  ];
  const { node: cmdNode, setOpen } = useCommandPalette(cmdItems);

  const Orn = () => (
    <div className="m-orn" aria-hidden>
      <span className="m-orn-line" />
      <span className="m-orn-mark">✦ ❦ ✦</span>
      <span className="m-orn-line" />
    </div>
  );

  return (
    <div className="manuscript-root">
      <CursorAccent color="rgba(170, 140, 44, 0.22)" size={460} />

      <div className="m-toolbar">
        <button onClick={() => setOpen(true)} className="m-btn"><kbd>⌘</kbd>K</button>
        <button onClick={toggleTheme} className="m-btn m-btn-ico" aria-label="Theme">{theme === "light" ? "◐" : "◑"}</button>
        <a href={CONTENT.resumePdf} target="_blank" rel="noreferrer" className="m-btn m-btn-primary">⤓ Résumé</a>
      </div>

      {/* Hero */}
      <section id="m-hero" className="m-hero">
        <div className="m-crest" aria-hidden>
          <div className="m-crest-ring">G</div>
        </div>
        <div className="m-eyebrow">Of the Honoured Founder</div>
        <h1 className="m-title">{CONTENT.name}</h1>
        <div className="m-tagline">{CONTENT.tagline}</div>
        <Orn />
        <div className="m-portrait-row">
          <LivingPortrait src={CONTENT.portraitSquare} frame="oval" caption="A moving likeness of the author, taken at his Master's commencement." />
        </div>
        <div className="m-hero-body">
          <p className="m-lead">
            <span className="m-illum">A</span>
            ssembled herein, a record of the labours of one <i>Gokulnaath Govindaraj</i>, builder of retrieval pipelines, trainer of coding agents, and sole technical founder of <b>AccioFirst</b>, which on the fifteenth day of April in the year of our work two thousand and twenty-six, was named Runner-Up at the Wright Venture, with two thousand dollars awarded.
          </p>
          <div className="m-hero-meta">
            <div><span>Status</span>{CONTENT.status}</div>
            <div><span>Located</span>{CONTENT.location}</div>
            <div><span>Reading time</span>~ four minutes</div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section id="m-metrics" className="m-metrics">
        <h2 className="m-h">Numbers of Note</h2>
        <Orn />
        <div className="m-metric-row">
          {CONTENT.metrics.map((m, i) => (
            <div key={i} className="m-metric">
              <div className="m-metric-roman">{["I","II","III","IV"][i]}</div>
              <div className="m-metric-num">
                <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} display={m.display} />
              </div>
              <div className="m-metric-lab">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bio */}
      <section id="m-bio" className="m-bio">
        <h2 className="m-h">About the Author</h2>
        <Orn />
        <div className="m-bio-grid">
          <div className="m-bio-text">
            <p>I build software the way someone might build a clock: piece by piece, accountable for every motion, allergic to vagueness. I'm at my best when I own the whole thing — schema, pipeline, evaluation, UI.</p>
            <p>At <b>AriesView</b> I designed a 600-query RAG evaluation framework that drove retrieval recall to 93%, and dropped p95 API latency from 1.8s to 200ms. At <b>Handshake AI</b> I orchestrate Ralph-loop agents that iterate until they pass automated gates. At my own desk, I shipped <b>AccioFirst</b> from blank file to funded prototype.</p>
            <blockquote className="m-quote">“I want to be the engineer that gets handed the ambiguous problem, because I'll come back with the framing, the eval, and the working thing.”</blockquote>
          </div>
          <div className="m-bio-term">
            <div className="m-term-frame">
              <Terminal lines={CONTENT.bio} prompt="› " charDelay={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="m-exp" className="m-exp">
        <h2 className="m-h">Chronicle of Work</h2>
        <Orn />
        <div className="m-exp-list">
          {CONTENT.experience.map((e, i) => (
            <article key={i} className="m-exp-item">
              <div className="m-exp-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="m-exp-when">{e.when} <span>·</span> {e.where}</div>
              <h3 className="m-exp-co">{e.company}</h3>
              <div className="m-exp-role">{e.role}</div>
              <p className="m-exp-blurb">{e.blurb}</p>
              <div className="m-tags">{e.tags.map(t => <span key={t} className="m-tag">{t}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="m-proj" className="m-proj">
        <h2 className="m-h">Index of Works</h2>
        <Orn />
        <div className="m-proj-grid">
          {CONTENT.projects.map((p, i) => (
            <article key={p.slug} id={`m-${p.slug}`} className="m-card">
              <div className="m-card-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="m-card-year">{p.year}</div>
              <h3 className="m-card-name">{p.name}</h3>
              <div className="m-card-kicker">{p.kicker}</div>
              <p className="m-card-one">{p.one}</p>
              <p className="m-card-blurb">{p.blurb}</p>
              <div className="m-card-stack">{p.stack.map(s => <span key={s} className="m-stack">{s}</span>)}</div>
              <div className="m-card-stat">— {p.stat}</div>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="m-about" className="m-about">
        <h2 className="m-h">Of the Author</h2>
        <Orn />
        <div className="m-about-grid">
          <div className="m-about-col">
            <h3>Education</h3>
            {CONTENT.about.education.map(ed => (
              <div key={ed.school} className="m-about-edu">
                <div className="m-about-school">{ed.school}</div>
                <div className="m-about-deg">{ed.degree}</div>
                <div className="m-about-when">{ed.when}</div>
              </div>
            ))}
          </div>
          <div className="m-about-col">
            <h3>Honours</h3>
            <div className="m-honor"><b>Runner-Up · Wright Venture 2026</b><div>$2,000 awarded for AccioFirst.</div></div>
            <div className="m-honor"><b>Technical Lead · NSF I-Corps</b><div>$1,000 awarded as technical lead of a $2,500 team grant.</div></div>
          </div>
          <div className="m-about-col">
            <h3>What gets me out of bed</h3>
            <ul>{CONTENT.about.likes.map(l => <li key={l}>{l}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="m-contact" className="m-contact">
        <h2 className="m-h">Send a Letter</h2>
        <Orn />
        <div className="m-contact-card">
          <p>Hiring, building, or in want of a coffee about agent training? Write me.</p>
          <a href={`mailto:${CONTENT.email}`} className="m-mail">{CONTENT.email}</a>
          <div className="m-contact-row">
            <a href={`https://${CONTENT.linkedin}`} target="_blank" rel="noreferrer">{CONTENT.linkedin}</a>
            <span>·</span>
            <a href={`https://${CONTENT.site}`} target="_blank" rel="noreferrer">{CONTENT.site}</a>
            <span>·</span>
            <span>{CONTENT.phone}</span>
          </div>
          <a className="m-resume-cta" href={CONTENT.resumePdf} target="_blank" rel="noreferrer">⤓ Download résumé (PDF)</a>
        </div>
      </section>

      <footer className="m-foot">
        <Orn />
        <div className="m-foot-row">
          <span>Finis</span>
          <span>· {CONTENT.name} · 2026 ·</span>
          <span>Press <kbd>⌘K</kbd> for the index</span>
        </div>
      </footer>

      {cmdNode}
    </div>
  );
};

window.ManuscriptApp = ManuscriptApp;

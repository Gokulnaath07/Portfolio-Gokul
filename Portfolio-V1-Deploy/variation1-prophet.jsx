// variation1-prophet.jsx — "The Daily Prophet"
// A broadsheet newspaper. Masthead with date/edition. Multi-column lead
// story. Dropped initials. Rule lines. Engraved stat blocks.

const ProphetApp = () => {
  const [theme, toggleTheme] = useTheme("light");
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const cmdItems = [
    { label: "Top of page", icon: "↑", run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "Headline · AccioFirst", icon: "★", run: () => scrollToId("p-hero") },
    { label: "Front-page metrics", icon: "▦", run: () => scrollToId("p-metrics") },
    { label: "Bio · whoami", icon: "❯", run: () => scrollToId("p-bio") },
    { label: "Experience", icon: "✎", run: () => scrollToId("p-exp") },
    { label: "Projects", icon: "▤", run: () => scrollToId("p-proj") },
    { label: "About", icon: "✦", run: () => scrollToId("p-about") },
    { label: "Contact", icon: "✉", run: () => scrollToId("p-contact") },
    { label: "Toggle theme", icon: "◐", hint: theme === "light" ? "→ dark" : "→ light", run: toggleTheme },
    { label: "Download résumé", icon: "⤓", hint: "PDF", run: () => window.open(CONTENT.resumePdf, "_blank") },
    { label: "Email Gokulnaath", icon: "✉", run: () => window.location.href = `mailto:${CONTENT.email}` },
    ...CONTENT.projects.map(p => ({ label: `Project · ${p.name}`, icon: "▢", run: () => scrollToId(`p-${p.slug}`) })),
  ];
  const { node: cmdNode, setOpen } = useCommandPalette(cmdItems);

  return (
    <div className="prophet-root">
      <CursorAccent color="rgba(116, 0, 1, 0.14)" size={520} />

      {/* Floating toolbar */}
      <div className="p-toolbar">
        <button onClick={() => setOpen(true)} className="p-btn"><kbd>⌘</kbd>K · Search</button>
        <button onClick={toggleTheme} className="p-btn p-btn-ico" aria-label="Toggle theme">{theme === "light" ? "◐" : "◑"}</button>
        <a href={CONTENT.resumePdf} target="_blank" rel="noreferrer" className="p-btn p-btn-primary">⤓ Résumé</a>
      </div>

      {/* Masthead */}
      <header className="p-masthead">
        <div className="p-mast-rule"><span>VOL. XXVI · NO. 1</span><span>{today.toUpperCase()}</span><span>FAIRBORN, OHIO · TWO DOLLARS</span></div>
        <h1 className="p-mast-title">The Gokulnaath Gazette</h1>
        <div className="p-mast-sub">An occasional broadsheet on shipping software, training agents, and founding small companies that work.</div>
        <div className="p-mast-rule p-mast-rule-bot">
          <span>EST. 2018</span>
          <span>· AI · BACKEND · FOUNDERY ·</span>
          <span>OPT VALID THROUGH FEB 2029</span>
        </div>
      </header>

      {/* Hero / lead story */}
      <section id="p-hero" className="p-hero">
        <div className="p-kicker">{CONTENT.hero.kicker}</div>
        <h2 className="p-headline">{CONTENT.hero.headline}</h2>
        <div className="p-deck">By <i>Gokulnaath Govindaraj</i>, Staff Builder · Filed from the lab</div>

        <div className="p-lead-cols">
          <div className="p-col">
            <p className="p-lead">
              <span className="p-dropcap">F</span>or eight months I worked alone on a job-market intelligence tool called <b>AccioFirst</b>. It scores ghost postings, autopsies failed applications, and runs at fractions of a cent per query. In April it walked out of Wright Venture's pitch finals with $2,000 in funding and a handshake from the judges. This is a chronicle of that work, and the work that taught me how to do it.
            </p>
          </div>
          <div className="p-col p-col-photo">
            <figure className="p-photo">
              <img src={CONTENT.portraitDuotone} alt="Gokulnaath Govindaraj" />
              <figcaption>Govindaraj at commencement, Wright State University, 2025.</figcaption>
            </figure>
          </div>
          <div className="p-col">
            <p>
              By day, I architect RAG pipelines at <b>AriesView</b>, an NEC-backed startup. I designed the chunking, the hybrid BM25 + dense retrieval against Weaviate, and the 600-query evaluation framework that drove recall to 93%. When PostgreSQL choked at 2,000 RPS, I diagnosed the connection-pool saturation and dropped p95 latency from 1.8 seconds to 200ms.
            </p>
            <p>
              By night and on weekends I train coding agents at <b>Handshake AI</b>'s Helix project, designing Ralph loops and atomic prompt scaffolding so a headless Claude Code agent can iterate to a P2P/F2P-clean pull request. Every submission is a verified golden-solution PR.
            </p>
            <p className="p-jumpline">Continued on inside →</p>
          </div>
        </div>
      </section>

      {/* Metrics strip */}
      <section id="p-metrics" className="p-metrics">
        <div className="p-section-title"><span>Front-page numbers</span></div>
        <div className="p-metric-row">
          {CONTENT.metrics.map((m, i) => (
            <div key={i} className="p-metric">
              <div className="p-metric-num">
                <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} display={m.display} />
              </div>
              <div className="p-metric-rule" />
              <div className="p-metric-lab">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bio terminal */}
      <section id="p-bio" className="p-bio">
        <div className="p-section-title"><span>Dispatch from the desk</span></div>
        <div className="p-bio-grid">
          <div className="p-bio-text">
            <p className="p-bio-quote">“The thing about being a junior engineer is nobody is going to hand you the right framing. So I started giving it to myself.”</p>
            <p>I'm a graduate of Wright State (M.S. CS, December 2025) and Anna University (B.E. Mechatronics, 2022). I'm based in Fairborn, Ohio, and open to relocation anywhere. {CONTENT.status}.</p>
            <p>I am happiest when I'm <i>responsible for the whole thing</i>: the schema, the pipeline, the eval, the UI. AccioFirst is the proof. Legal Hub at AriesView is the proof. Helix is the proof.</p>
          </div>
          <div className="p-bio-term">
            <VideoPortrait src={CONTENT.videoSrc} poster={CONTENT.portraitSquare} caption="A moving portrait — drop a 3-second clip to bring it to life." className="p-video" />
            <div style={{height: 16}} />
            <Terminal lines={CONTENT.bio} prompt="$ " charDelay={22} />
          </div>
        </div>
      </section>

      {/* Experience as a column of dispatches */}
      <section id="p-exp" className="p-exp">
        <div className="p-section-title"><span>Experience · the record</span></div>
        <ol className="p-exp-list">
          {CONTENT.experience.map((e, i) => (
            <li key={i} className="p-exp-item">
              <div className="p-exp-meta">
                <div className="p-exp-when">{e.when}</div>
                <div className="p-exp-where">{e.where}</div>
              </div>
              <div className="p-exp-body">
                <h3 className="p-exp-co">{e.company}</h3>
                <div className="p-exp-role">{e.role}</div>
                <p>{e.blurb}</p>
                <div className="p-tags">{e.tags.map(t => <span key={t} className="p-tag">{t}</span>)}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Projects gallery */}
      <section id="p-proj" className="p-proj">
        <div className="p-section-title"><span>Projects · the works</span></div>
        <div className="p-proj-grid">
          {CONTENT.projects.map((p, i) => (
            <article key={p.slug} id={`p-${p.slug}`} className={"p-card" + (i === 0 ? " p-card-feat" : "")}>
              <div className="p-card-meta">
                <span className="p-card-year">{p.year}</span>
                <span className="p-card-sep">·</span>
                <span className="p-card-kicker">{p.kicker}</span>
              </div>
              <h3 className="p-card-name">{p.name}</h3>
              <p className="p-card-one"><i>{p.one}</i></p>
              <p className="p-card-blurb">{p.blurb}</p>
              <div className="p-card-foot">
                <div className="p-card-stack">{p.stack.map(s => <span key={s} className="p-stack-pill">{s}</span>)}</div>
                <div className="p-card-stat">{p.stat}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="p-about" className="p-about">
        <div className="p-section-title"><span>About the writer</span></div>
        <div className="p-about-grid">
          <div>
            <h3 className="p-about-h">Education</h3>
            {CONTENT.about.education.map(ed => (
              <div key={ed.school} className="p-about-edu">
                <div className="p-about-school">{ed.school}</div>
                <div className="p-about-deg">{ed.degree}</div>
                <div className="p-about-when">{ed.when}</div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="p-about-h">Honors</h3>
            <div className="p-honor">
              <b>Runner-Up · Wright Venture 2026</b>
              <div className="p-honor-meta">Wright State University · April 2026</div>
              <div>$2,000 awarded for AccioFirst, out of five finalists.</div>
            </div>
            <div className="p-honor">
              <b>Technical Lead · NSF I-Corps Cohort</b>
              <div className="p-honor-meta">University of Connecticut · Sep 2024</div>
              <div>$1,000 awarded as technical lead of a $2,500 team grant.</div>
            </div>
          </div>
          <div>
            <h3 className="p-about-h">What I'm into</h3>
            <ul className="p-likes">
              {CONTENT.about.likes.map(l => <li key={l}>{l}</li>)}
            </ul>
            <h3 className="p-about-h" style={{ marginTop: 20 }}>Where</h3>
            <p>{CONTENT.about.location}</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="p-contact" className="p-contact">
        <div className="p-section-title"><span>Letters to the editor</span></div>
        <div className="p-contact-card">
          <div className="p-contact-pre">If you're hiring, building something interesting, or want to compare notes on agent training, write me.</div>
          <a href={`mailto:${CONTENT.email}`} className="p-contact-mail">{CONTENT.email} →</a>
          <div className="p-contact-row">
            <a href={`https://${CONTENT.linkedin}`} target="_blank" rel="noreferrer">{CONTENT.linkedin}</a>
            <span>·</span>
            <a href={`https://${CONTENT.site}`} target="_blank" rel="noreferrer">{CONTENT.site}</a>
            <span>·</span>
            <span>{CONTENT.phone}</span>
          </div>
          <a className="p-resume-cta" href={CONTENT.resumePdf} target="_blank" rel="noreferrer">⤓ Download résumé (PDF)</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-foot">
        <div className="p-foot-rule" />
        <div className="p-foot-row">
          <span>© 2026 · The Gokulnaath Gazette</span>
          <span>“Set in Playfair, Source Serif &amp; JetBrains Mono.”</span>
          <span>Press <kbd>⌘K</kbd> for the index</span>
        </div>
      </footer>

      {cmdNode}
    </div>
  );
};

window.ProphetApp = ProphetApp;

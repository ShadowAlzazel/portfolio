<script>
  import { onMount } from 'svelte';
  import HudCursor from './lib/HudCursor.svelte';
  import HudFrame from './lib/HudFrame.svelte';
  import { statGroups, experience, projects, education } from './info.js';

  // ── EDIT YOUR INFO HERE ───────────────────────────────────────
  const name       = 'ALFREDO PASTEN JR';
  const username   = 'SHADOWALZAZEL';
  const title      = 'CALIFORNIA STATE UNIVERSITY - LONG BEACH';
  const bio        = 'Hello, don\'t mind me, I am just making AGI real quick. ';
  const email      = 'pastenalfredojr@email.com';
  const github     = 'https://github.com/ShadowAlzazel';
  const linkedin   = 'https://www.linkedin.com/in/alfredo-pasten-jr';
  const portfolio  = 'https://www.shadowalzazel.dev'
  const resume     = '/resume.pdf'

  // ── DARK MODE ─────────────────────────────────────────────────
  let dark = false;
  function toggleDark() {
    dark = !dark;
    document.documentElement.classList.toggle('dark', dark);
  }

  // ── SIDEBAR NAV ───────────────────────────────────────────────
  const sidebarSections = [
    { id: 'hero',       label: 'INIT',       icon: '◈' },
    { id: 'projects',   label: 'PROJECTS',   icon: '◧' },
    { id: 'experience', label: 'EXPERIENCE', icon: '◩' },
    { id: 'education',  label: 'EDUCATION',  icon: '◬' },
    { id: 'skills',     label: 'SKILLS',     icon: '◫' },
    //{ id: 'resume',     label: 'RESUME',     icon: '◰' },
    { id: 'contact',    label: 'CONTACT',    icon: '◉' },
  ];
  let activeSec = 'hero';

  /** @type {Record<string, boolean>} */
  let visible = {};

  onMount(() => {
    // intersection for fade-in animations
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) visible[e.target.dataset.id] = true;
        });
        visible = { ...visible };
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('[data-id]').forEach(el => obs.observe(el));

    // intersection for active sidebar highlight
    const navObs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) activeSec = e.target.id;
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sidebarSections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) navObs.observe(el);
    });

    return () => { obs.disconnect(); navObs.disconnect(); };
  });

  /** @param {string} id */
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<HudFrame />
<HudCursor />

<!-- TOP NAV -->
<nav class="topnav" class:dark>
  <span class="nav-id">◈ ACCESSING_PORTFOLIO(NAME = {name.toUpperCase()}, USER = SHADOWALZAZEL);</span>
  <button class="dark-toggle" on:click={toggleDark} aria-label="Toggle dark mode">
    {#if dark}
      <span>○ LIGHT</span>
    {:else}
      <span>● DARK</span>
    {/if}
  </button>
</nav>

<!-- WIKI SIDEBAR -->
<aside class="sidebar" class:dark>
  <div class="stat-panel-title"> // DIRECTORY_BLOCK</div>
  <nav class="sidebar-nav">
    {#each sidebarSections as s}
      <button
        class="sidebar-link"
        class:active={activeSec === s.id}
        on:click={() => scrollTo(s.id)}
      >
        <span class="sidebar-icon">{s.icon}</span>
        <span class="sidebar-label">{s.label}</span>
        {#if activeSec === s.id}
          <span class="sidebar-tick">▸</span>
        {/if}
      </button>
    {/each}
  </nav>

  <div class="sidebar-divider"></div>

  <!-- STAT PANEL -->
  <div class="stat-panel">
    <div class="stat-panel-title">// STAT_BLOCK</div>
    {#each statGroups as group}
      <div class="stat-group">
        <div class="stat-group-label">{group.label}</div>
        {#each group.stats as stat}
          <div class="stat-row">
            <div class="stat-name">{stat.name}</div>
            <div class="stat-bar-wrap">
              <div class="stat-bar" style="--pct:{stat.val}%"></div>
            </div>
            <div class="stat-val">{stat.val}</div>
          </div>
        {/each}
      </div>
    {/each}
  </div>

  <div class="sidebar-footer">REC · TELEMETRY · ON</div>
</aside>

<!-- TAB -->
<svelte:head>
	<title>ShadowAlzazel's Portfolio</title>
</svelte:head>

<!-- MAIN CONTENT (offset for sidebar) -->
<main class:dark>

  <!-- HERO -->
  <section id="hero" class="section hero" data-id="hero">
    <div class="hero-inner" class:visible={visible['hero']}>
      <p class="overline">// PORTFOLIO_INIT — SYSTEM READY</p>
      <h1 class="hero-name">{name}</h1>
      <p class="hero-title">{title}</p>
      <p class="hero-bio">{bio}</p>
      <div class="hero-actions">
        <button class="btn-primary" on:click={() => scrollTo('projects')}>VIEW PROJECTS</button>
        <a class="btn-ghost" href="mailto:{email}">CONTACT</a>
        <a class="btn-ghost" href="/resume.pdf" target="_blank" rel="noopener">RESUME</a> 
      </div>
    </div>
    <div class="hero-telemetry">
      <span>LAT 00.0000</span>
      <span>LON 00.0000</span>
      <span>ALT 0000 M</span>
    </div>
  </section>

  <!-- PROJECTS -->
  <section id="projects" class="section" data-id="projects">
    <div class="section-header" class:visible={visible['projects']}>
      <span class="section-id">// 01</span>
      <h2>PROJECTS</h2>
      <div class="header-line"></div>
    </div>
    <div class="projects-grid" class:visible={visible['projects']}>
      {#each projects as proj, i}
        <a href={proj.link} target="_blank" rel="noopener" class="project-card" style="--delay:{i * 80}ms">
          <div class="card-id">{proj.id}</div>
          <h3 class="card-name">{proj.name}</h3>
          <p class="card-desc">{proj.desc}</p>
          <div class="card-tags">
            {#each proj.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
          <div class="card-arrow">→</div>
          <div class="card-corner tl"></div>
          <div class="card-corner tr"></div>
          <div class="card-corner bl"></div>
          <div class="card-corner br"></div>
        </a>
      {/each}
    </div>
  </section>

  <!-- EXPERIENCE -->
  <section id="experience" class="section" data-id="experience">
    <div class="section-header" class:visible={visible['experience']}>
      <span class="section-id">// 02</span>
      <h2>EXPERIENCE</h2>
      <div class="header-line"></div>
    </div>
    <div class="exp-list" class:visible={visible['experience']}>
      {#each experience as job, i}
        <div class="exp-item" style="--delay:{i * 100}ms">
          <div class="exp-left">
            <div class="exp-role">{job.role}</div>
            <div class="exp-company">{job.company}</div>
            <div class="exp-period">{job.period}</div>
          </div>
          <div class="exp-divider"></div>
          <ul class="exp-points">
            {#each job.points as pt}
              <li><span class="bullet">▸</span>{pt}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>

  <!-- EDUCATION -->
  <section id="education" class="section" data-id="education">
    <div class="section-header" class:visible={visible['education']}>
      <span class="section-id">// 03</span>
      <h2>EDUCATION</h2>
      <div class="header-line"></div>
    </div>
    <div class="exp-list" class:visible={visible['education']}>
      {#each education as school, i}
        <div class="exp-item" style="--delay:{i * 100}ms">
          <div class="exp-left">
            <div class="exp-school">{school.school}</div>
            <div class="exp-company">{school.location}</div>
            <div class="exp-period">{school.period}</div>
          </div>
          <div class="exp-divider"></div>
          <ul class="exp-points">
            {#each school.points as pt}
              <li><span class="bullet">▸</span>{pt}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>

  <!-- SKILLS (full breakdown page — stats are in sidebar too) -->
  <section id="skills" class="section" data-id="skills">
    <div class="section-header" class:visible={visible['skills']}>
      <span class="section-id">// 04</span>
      <h2>SKILLS</h2>
      <div class="header-line"></div>
    </div>
    <div class="skills-full" class:visible={visible['skills']}>
      {#each statGroups as group, gi}
        <div class="skill-category" style="--delay:{gi * 80}ms">
          <div class="skill-cat-label">{group.label}</div>
          <div class="skill-stat-list">
            {#each group.stats as stat, si}
              <div class="skill-stat-row" style="--delay:{(gi * 80 + si * 40)}ms">
                <div class="skill-stat-name">{stat.name}</div>
                <div class="skill-stat-bar-wrap">
                  <div class="skill-stat-bar" style="--pct:{stat.val}%"></div>
                  <div class="skill-stat-segments">
                    {#each Array(10) as _}
                      <div class="seg"></div>
                    {/each}
                  </div>
                </div>
                <div class="skill-stat-num">{stat.val}<span class="skill-unit">/100</span></div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- CONTACT -->
  <section id="contact" class="section contact-section" data-id="contact">
    <div class="contact-inner" class:visible={visible['contact']}>
      <span class="section-id">// 05</span>
      <h2 class="contact-heading">LET'S WORK<br/><em>TOGETHER</em></h2>
      <p class="contact-sub">Open to new opportunities, collaborations, and interesting problems.</p>
      <div class="contact-links">
        <a href={resume} target="_blank" rel="noopener" class="contact-link">
          <span class="link-label">RESUME</span>
          <span class="link-value">My Resume</span>
        </a>
        <a href="mailto:{email}" class="contact-link">
          <span class="link-label">EMAIL</span>
          <span class="link-value">{email}</span>
        </a>
        <a href={github} target="_blank" rel="noopener" class="contact-link">
          <span class="link-label">GITHUB</span>
          <span class="link-value">{github.replace('https://', '')}</span>
        </a>
        <a href={linkedin} target="_blank" rel="noopener" class="contact-link">
          <span class="link-label">LINKEDIN</span>
          <span class="link-value">{linkedin.replace('https://', '')}</span>
        </a>
          <a href={portfolio} target="_blank" rel="noopener" class="contact-link">
          <span class="link-label">PORTFOLIO</span>
          <span class="link-value">{portfolio.replace('https://', '')}</span>
        </a>
      </div>
    </div>
    <footer>◈ {name.toUpperCase()} — {new Date().getFullYear()}</footer>
  </section>

</main>

<style>
  /* ── TOP NAV ─────────────────────────────────────────────────── */
  .topnav {
    position: fixed;
    top: 0;
    left: 260px; /* sidebar width */
    right: 0;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 48px;
    background: rgba(245,245,247,0.88);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(var(--v), 0.10);
    transition: background 0.3s, border-color 0.3s;
  }
    :global(html.dark) .topnav,
.topnav.dark {
    background: rgba(10,8,20,0.92);
    border-color: rgba(var(--v), 0.15);
  }
  .nav-id {
    font-family: var(--mono);
    font-size: 13px;
    letter-spacing: 0.14em;
    color: var(--violet-60);
  }
  .dark-toggle {
    background: none;
    border: 1px solid rgba(var(--v), 0.25);
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.16em;
    color: var(--violet-60);
    cursor: none;
    padding: 6px 16px;
    transition: border-color 0.2s, color 0.2s;
  }
  .dark-toggle:hover { border-color: var(--violet); color: var(--violet); }

  /* ── SIDEBAR ─────────────────────────────────────────────────── */
  .sidebar {
    position: fixed;
    top: 0; left: 0; bottom: 0;
    width: 260px;
    z-index: 300;
    background: rgba(245,245,247,0.97);
    border-right: 1px solid rgba(var(--v), 0.12);
    display: flex;
    flex-direction: column;
    padding: 28px 0 20px;
    overflow-y: auto;
    transition: background 0.3s, border-color 0.3s;
  }
  :global(html.dark) .sidebar,
  .sidebar.dark {
    background: rgba(8,6,18,0.98);
    border-color: rgba(var(--v), 0.18);
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0 16px;
    margin-bottom: 8px;
  }
  .sidebar-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    background: none;
    border: none;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.14em;
    color: rgba(var(--v), 0.45);
    cursor: none;
    text-align: left;
    position: relative;
    transition: color 0.2s, background 0.2s;
    border-left: 2px solid transparent;
  }
  .sidebar-link:hover {
    color: var(--violet);
    background: rgba(var(--v), 0.05);
  }
  .sidebar-link.active {
    color: var(--violet);
    border-left-color: var(--violet);
    background: rgba(var(--v), 0.06);
  }
  .sidebar-icon { font-size: 13px; flex-shrink: 0; }
  .sidebar-label { flex: 1; }
  .sidebar-tick {
    color: var(--fuchsia-40);
    font-size: 10px;
  }

  .sidebar-divider {
    height: 1px;
    background: rgba(var(--v), 0.10);
    margin: 12px 16px;
  }

  /* ── STAT PANEL ──────────────────────────────────────────────── */
  .stat-panel {
    flex: 1;
    padding: 0 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .stat-panel-title {
    font-size: 9px;
    letter-spacing: 0.22em;
    color: var(--deep-pink-70);
    margin-bottom: 4px;
  }
  .stat-group { display: flex; flex-direction: column; gap: 6px; }
  .stat-group-label {
    font-size: 9px;
    letter-spacing: 0.20em;
    color: rgba(var(--v), 0.35);
    margin-bottom: 2px;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(var(--v), 0.08);
  }
  .stat-row {
    display: grid;
    grid-template-columns: 78px 1fr 28px;
    align-items: center;
    gap: 6px;
  }
  .stat-name {
    font-size: 10px;
    letter-spacing: 0.04em;
    color: rgba(var(--v), 0.60);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stat-bar-wrap {
    height: 4px;
    background: rgba(var(--v), 0.08);
    position: relative;
    overflow: hidden;
  }
  .stat-bar {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: var(--pct);
    background: linear-gradient(90deg, rgba(var(--v),0.7), rgba(var(--f),0.6));
    transition: width 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s;
  }
  .stat-val {
    font-size: 9px;
    color: rgba(var(--v), 0.35);
    text-align: right;
  }

  .sidebar-footer {
    padding: 16px 16px 0;
    font-size: 8px;
    letter-spacing: 0.18em;
    color: rgba(var(--v), 0.18);
    text-align: center;
  }

  /* ── MAIN CONTENT ────────────────────────────────────────────── */
  main {
    margin-left: 260px;
    background: var(--bg);
    min-height: 100vh;
    transition: background 0.3s;
  }
  :global(html.dark) main,
  main.dark {
    background: #09070f;
  }

  .section {
    min-height: 50vh;
    padding: 120px 72px 80px;
    position: relative;
  }

  .section-header {
    display: flex;
    align-items: baseline;
    gap: 20px;
    margin-bottom: 60px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.6s, transform 0.6s;
  }
  .section-header.visible { opacity: 1; transform: none; }
  .section-id {
    font-size: 12px;
    letter-spacing: 0.16em;
    color: var(--fuchsia-40);
  }
  .section-header h2 {
    font-family: var(--display);
    font-size: clamp(32px, 4.5vw, 56px);
    font-weight: 700;
    letter-spacing: 0.06em;
    color: var(--violet);
  }
  :global(html.dark) .section-header h2 { color: rgba(var(--v), 0.95); }
  .header-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, rgba(var(--v),0.25), transparent);
  }

  /* ── HERO ────────────────────────────────────────────────────── */
  .hero { display: flex; flex-direction: column; justify-content: center; padding-top: 140px; }

  .hero-inner {
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.8s 0.1s, transform 0.8s 0.1s;
  }
  .hero-inner.visible { opacity: 1; transform: none; }

  .overline {
    font-size: 12px;
    letter-spacing: 0.20em;
    color: var(--fuchsia-40);
    margin-bottom: 20px;
  }
  .hero-name {
    font-family: var(--display);
    font-size: clamp(56px, 9vw, 108px);
    font-weight: 700;
    line-height: 0.92;
    letter-spacing: -0.01em;
    color: var(--violet);
    margin-bottom: 20px;
  }
  .hero-title {
    font-size: 14px;
    letter-spacing: 0.20em;
    color: var(--violet-60);
    margin-bottom: 28px;
  }
  .hero-bio {
    max-width: 560px;
    font-size: 15px;
    line-height: 1.85;
    color: rgba(var(--v), 0.50);
    margin-bottom: 44px;
  }
  :global(html.dark) .hero-bio { color: rgba(var(--v), 0.55); }
  .hero-actions { display: flex; gap: 16px; align-items: center; }

  .btn-primary {
    background: var(--violet);
    color: var(--bg);
    border: none;
    padding: 14px 32px;
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: 0.18em;
    cursor: none;
    transition: background 0.2s, transform 0.15s;
  }
  :global(html.dark) .btn-primary { color: #09070f; }
  .btn-primary:hover { background: rgba(var(--v),0.80); transform: translateY(-1px); }

  .btn-ghost {
    color: var(--violet-60);
    border: 1px solid rgba(var(--v), 0.25);
    padding: 13px 32px;
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: 0.18em;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
    display: inline-block;
  }
  .btn-ghost:hover { border-color: var(--violet); color: var(--violet); }

  .hero-telemetry {
    position: absolute;
    bottom: 48px; right: 56px;
    display: flex; flex-direction: column; gap: 4px; text-align: right;
  }
  .hero-telemetry span {
    font-size: 10px;
    letter-spacing: 0.14em;
    color: rgba(var(--v), 0.18);
  }

  /* ── PROJECTS ────────────────────────────────────────────────── */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    opacity: 0;
    transition: opacity 0.5s 0.2s;
  }
  .projects-grid.visible { opacity: 1; }

  .project-card {
    position: relative;
    background: rgba(var(--v), 0.03);
    border: 1px solid rgba(var(--v), 0.12);
    padding: 32px 28px;
    text-decoration: none;
    display: flex; flex-direction: column; gap: 14px;
    transition: background 0.25s, border-color 0.25s, transform 0.2s;
    opacity: 0; transform: translateY(20px);
  }
  :global(html.dark) .project-card { background: rgba(var(--v), 0.05); }
  .projects-grid.visible .project-card {
    animation: fadeUp 0.5s ease forwards;
    animation-delay: var(--delay);
  }
  @keyframes fadeUp { to { opacity: 1; transform: none; } }
  .project-card:hover {
    background: rgba(var(--v), 0.07);
    border-color: rgba(var(--v), 0.30);
    transform: translateY(-2px);
  }
  .card-id { font-size: 10px; letter-spacing: 0.18em; color: var(--fuchsia-40); }
  .card-name {
    font-family: var(--display);
    font-size: 24px; font-weight: 600;
    letter-spacing: 0.04em; color: var(--violet);
  }
  .card-desc {
    font-size: 14px; line-height: 1.75;
    color: rgba(var(--v), 0.50); flex: 1;
  }
  :global(html.dark) .card-desc { color: rgba(var(--v), 0.55); }
  .card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag {
    font-size: 10px; letter-spacing: 0.12em;
    color: rgba(var(--v), 0.55);
    border: 1px solid rgba(var(--v), 0.18);
    padding: 3px 10px;
  }
  .card-arrow {
    position: absolute; top: 28px; right: 28px;
    font-size: 18px; color: rgba(var(--v), 0.22);
    transition: color 0.2s, transform 0.2s;
  }
  .project-card:hover .card-arrow { color: var(--violet); transform: translate(2px,-2px); }

  .card-corner {
    position: absolute; width: 10px; height: 10px;
    border-color: rgba(var(--v), 0.20); border-style: solid;
    transition: border-color 0.25s;
  }
  .project-card:hover .card-corner { border-color: rgba(var(--v), 0.50); }
  .card-corner.tl { top:8px; left:8px; border-width:1px 0 0 1px; }
  .card-corner.tr { top:8px; right:8px; border-width:1px 1px 0 0; }
  .card-corner.bl { bottom:8px; left:8px; border-width:0 0 1px 1px; }
  .card-corner.br { bottom:8px; right:8px; border-width:0 1px 1px 0; }

  /* ── EXPERIENCE ──────────────────────────────────────────────── */
  .exp-list {
    display: flex; flex-direction: column; gap: 0;
    opacity: 0; transition: opacity 0.5s 0.2s;
  }
  .exp-list.visible { opacity: 1; }

  .exp-item {
    display: grid;
    grid-template-columns: 240px 1px 1fr;
    gap: 0 48px;
    padding: 40px 0;
    border-top: 1px solid rgba(var(--v), 0.10);
    opacity: 0; transform: translateX(-16px);
  }
  .exp-list.visible .exp-item {
    animation: fadeRight 0.5s ease forwards;
    animation-delay: var(--delay);
  }
  @keyframes fadeRight { to { opacity: 1; transform: none; } }

  .exp-left { display: flex; flex-direction: column; gap: 6px; }
  .exp-role {
    font-family: var(--display);
    font-size: 22px; font-weight: 600;
    color: var(--violet); letter-spacing: 0.04em;
  }
  .exp-company { font-size: 11px; letter-spacing: 0.18em; color: var(--fuchsia-40); }
  .exp-period { font-size: 11px; letter-spacing: 0.12em; color: rgba(var(--v),0.30); margin-top: 4px; }
  .exp-divider { background: rgba(var(--v),0.12); width: 1px; align-self: stretch; }
  .exp-points { list-style: none; display: flex; flex-direction: column; gap: 12px; padding-top: 2px; }
  .exp-points li {
    font-size: 14px; line-height: 1.75;
    color: rgba(var(--v), 0.55); display: flex; gap: 12px;
  }
  :global(html.dark) .exp-points li { color: rgba(var(--v), 0.60); }
  .bullet { color: var(--fuchsia-40); flex-shrink: 0; margin-top: 2px; }

  /* ── SKILLS PAGE ─────────────────────────────────────────────── */
  .skills-full {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 32px;
    opacity: 0; transition: opacity 0.5s 0.2s;
  }
  .skills-full.visible { opacity: 1; }

  .skill-category {
    opacity: 0; transform: translateY(16px);
  }
  .skills-full.visible .skill-category {
    animation: fadeUp 0.5s ease forwards;
    animation-delay: var(--delay);
  }
  .skill-cat-label {
    font-size: 10px;
    letter-spacing: 0.22em;
    color: var(--fuchsia-40);
    margin-bottom: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(var(--v), 0.12);
  }
  .skill-stat-list { display: flex; flex-direction: column; gap: 14px; }

  .skill-stat-row {
    display: grid;
    grid-template-columns: 110px 1fr 60px;
    align-items: center;
    gap: 14px;
    opacity: 0; transform: translateX(-8px);
  }
  .skills-full.visible .skill-stat-row {
    animation: fadeRight 0.45s ease forwards;
    animation-delay: var(--delay);
  }
  .skill-stat-name { font-size: 13px; letter-spacing: 0.04em; color: rgba(var(--v), 0.70); }
  :global(html.dark) .skill-stat-name { color: rgba(var(--v), 0.75); }

  .skill-stat-bar-wrap {
    height: 6px;
    background: rgba(var(--v), 0.07);
    position: relative;
    overflow: hidden;
  }
  .skill-stat-bar {
    position: absolute; left: 0; top: 0; bottom: 0;
    width: var(--pct);
    background: linear-gradient(90deg, rgba(var(--v),0.75), rgba(var(--f),0.65));
    transition: width 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s;
  }
  .skill-stat-segments {
    position: absolute; inset: 0;
    display: flex; gap: 1px;
    pointer-events: none;
  }
  .seg {
    flex: 1;
    border-right: 1px solid rgba(var(--v), 0.06);
  }
  .skill-stat-num {
    font-size: 14px;
    color: var(--violet);
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .skill-unit {
    font-size: 9px;
    color: rgba(var(--v), 0.30);
    letter-spacing: 0.04em;
  }

  /* ── CONTACT ─────────────────────────────────────────────────── */
  .contact-section { display: flex; flex-direction: column; justify-content: center; border-top: 1px solid rgba(var(--v),0.10); }
  .contact-inner {
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.7s, transform 0.7s;
    display: flex; flex-direction: column; gap: 0;
  }
  .contact-inner.visible { opacity: 1; transform: none; }

  .contact-heading {
    font-family: var(--display);
    font-size: clamp(48px, 7vw, 96px);
    font-weight: 700; line-height: 0.95;
    letter-spacing: -0.01em; color: var(--violet);
    margin: 16px 0 24px;
  }
  .contact-heading em {
    font-style: normal; color: transparent;
    -webkit-text-stroke: 1.5px var(--violet);
  }
  .contact-sub {
    font-size: 15px; color: rgba(var(--v),0.45);
    letter-spacing: 0.06em; margin-bottom: 48px;
    max-width: 440px; line-height: 1.75;
  }
  :global(html.dark) .contact-sub { color: rgba(var(--v), 0.55); }
  .contact-links { display: flex; flex-direction: column; gap: 0; }
  .contact-link {
    display: flex; align-items: center; gap: 36px;
    padding: 22px 0;
    border-top: 1px solid rgba(var(--v),0.10);
    text-decoration: none;
    transition: padding-left 0.25s;
  }
  .contact-link:last-child { border-bottom: 1px solid rgba(var(--v),0.10); }
  .contact-link:hover { padding-left: 14px; }
  .link-label { font-size: 10px; letter-spacing: 0.22em; color: var(--fuchsia-40); width: 90px; flex-shrink: 0; }
  .link-value { font-size: 14px; letter-spacing: 0.08em; color: rgba(var(--v),0.60); transition: color 0.2s; }
  .contact-link:hover .link-value { color: var(--violet); }

  footer {
    margin-top: 80px; font-size: 10px;
    letter-spacing: 0.18em; color: rgba(var(--v),0.18); text-align: center;
  }

  /* ── RESPONSIVE ──────────────────────────────────────────────── */
  @media (max-width: 900px) {
    .topnav { left: 0; }
    .sidebar { transform: translateX(-100%); }
    main { margin-left: 0; }
    .section { padding: 100px 28px 60px; }
    .exp-item { grid-template-columns: 1fr; gap: 20px; }
    .exp-divider { display: none; }
    .hero-telemetry { display: none; }
  }
</style>
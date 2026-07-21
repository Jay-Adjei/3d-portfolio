"use client";

import React from "react";
import { Html } from "@react-three/drei";

type Section = "home" | "about" | "projects" | "contact";

type WindshieldHUDProps = {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
};

/**
 * Diegetic HUD projected onto the windshield in 3D world-space.
 *
 * Coordinate notes (from Leva calibration):
 *   Camera   : [-16.7, 20.3, 8.6]
 *   Target   : [-51.9, 21.8, 124.6]
 *   Look dir : normalised ≈ (-0.29, 0.01, 0.96)
 *
 * Bug 3 fix — rotation:
 *   Y = Math.PI (exactly 180°) so the Html front face directly faces the camera.
 *   The previous value of 2.85 rad (≈163°) left the plane 17° short, causing
 *   the text to be viewed from the back side → mirrored.
 *   X = -0.1 rad adds a slight backward tilt to match windshield rake.
 *
 * Position [-35, 25, 55] is ~45 units along the look vector from the camera,
 * sitting flush with the windshield glass.
 */
export default function WindshieldHUD({ activeSection, setActiveSection }: WindshieldHUDProps) {
  return (
    <group
      position={[-35, 25, 55]}
      rotation={[-0.1, Math.PI, 0]}
    >
      <Html
        transform
        distanceFactor={38}
        style={{
          width: "880px",
          pointerEvents: "auto",
          userSelect: "none",
        }}
        className="hud-root"
      >
        <div className="hud-container">
          {/* ── Decorative top bar ── */}
          <div className="hud-topbar">
            <div className="hud-topbar-left">
              <span className="hud-dot" />
              <span className="hud-system-text">SYS::PORTFOLIO v1.0</span>
            </div>
            <div className="hud-topbar-right">
              <span className="hud-system-text">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* ── Navigation ── */}
          <nav className="hud-nav">
            {(["home", "about", "projects", "contact"] as Section[]).map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`hud-nav-btn ${activeSection === s ? "active" : ""}`}
              >
                <span className="hud-nav-icon">
                  {s === "home" && "⌂"}
                  {s === "about" && "◉"}
                  {s === "projects" && "◫"}
                  {s === "contact" && "✉"}
                </span>
                {s.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* ── Content ── */}
          <div className="hud-content">
            {activeSection === "home" && <HomeView setActiveSection={setActiveSection} />}
            {activeSection === "about" && <AboutView />}
            {activeSection === "projects" && <ProjectsView />}
            {activeSection === "contact" && <ContactView />}
          </div>

          {/* ── Decorative bottom scanline ── */}
          <div className="hud-scanline" />
        </div>
      </Html>
    </group>
  );
}

/* ═══════════════════════════════════════════
   SECTION VIEWS
   ═══════════════════════════════════════════ */

function HomeView({ setActiveSection }: { setActiveSection: (s: Section) => void }) {
  return (
    <div className="hud-home">
      <p className="hud-label">WELCOME TO MY PORTFOLIO</p>
      <h1 className="hud-title">
        Hi, I'm <span className="hud-gradient-text">a Developer</span>
      </h1>
      <p className="hud-subtitle">
        I craft immersive digital experiences with cutting-edge web technologies.
        <br />
        Navigate the HUD to explore my work.
      </p>
      <div className="hud-actions">
        <button onClick={() => setActiveSection("projects")} className="hud-btn hud-btn-primary">
          VIEW PROJECTS
        </button>
        <button onClick={() => setActiveSection("about")} className="hud-btn hud-btn-ghost">
          ABOUT ME
        </button>
      </div>
      <div className="hud-stats">
        <div className="hud-stat-item">
          <span className="hud-stat-num">3+</span>
          <span className="hud-stat-lbl">YRS EXP</span>
        </div>
        <div className="hud-stat-item">
          <span className="hud-stat-num">10+</span>
          <span className="hud-stat-lbl">PROJECTS</span>
        </div>
        <div className="hud-stat-item">
          <span className="hud-stat-num">5+</span>
          <span className="hud-stat-lbl">TECH</span>
        </div>
      </div>
    </div>
  );
}

function AboutView() {
  return (
    <div className="hud-about">
      <h2 className="hud-section-heading">ABOUT ME</h2>
      <p className="hud-body-text">
        A software engineer who merges design with engineering to build products
        that feel magical. Specializing in interactive web experiences, 3D
        rendering, and modern front-end architectures.
      </p>
      <div className="hud-skills-row">
        <div className="hud-skill-col">
          <h3 className="hud-skill-heading">CORE STACK</h3>
          <ul className="hud-skill-ul">
            <li><span className="hud-pip cyan" /> React / Next.js</li>
            <li><span className="hud-pip cyan" /> TypeScript</li>
            <li><span className="hud-pip cyan" /> Three.js / R3F</li>
            <li><span className="hud-pip cyan" /> Tailwind CSS</li>
          </ul>
        </div>
        <div className="hud-skill-col">
          <h3 className="hud-skill-heading">ALSO</h3>
          <ul className="hud-skill-ul">
            <li><span className="hud-pip purple" /> Node.js / Express</li>
            <li><span className="hud-pip purple" /> UI / UX Design</li>
            <li><span className="hud-pip purple" /> PostgreSQL</li>
            <li><span className="hud-pip purple" /> Git / CI·CD</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProjectsView() {
  const projects = [
    { title: "Project Alpha", desc: "Real-time collaborative editor with WebSockets.", tags: ["React", "Node.js", "WS"] },
    { title: "Project Beta", desc: "AI image generation tool using diffusion models.", tags: ["Python", "Next.js", "AI"] },
    { title: "Project Gamma", desc: "3D product configurator for e-commerce.", tags: ["Three.js", "R3F", "TS"] },
    { title: "Project Delta", desc: "Mobile social platform with real-time messaging.", tags: ["RN", "Firebase", "Redux"] },
  ];

  return (
    <div className="hud-projects">
      <h2 className="hud-section-heading">PROJECTS</h2>
      <div className="hud-project-grid">
        {projects.map((p, i) => (
          <div key={i} className="hud-project-card">
            <span className="hud-project-idx">0{i + 1}</span>
            <h3 className="hud-project-name">{p.title}</h3>
            <p className="hud-project-desc">{p.desc}</p>
            <div className="hud-tag-row">
              {p.tags.map((t) => (
                <span key={t} className="hud-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactView() {
  const links = [
    { icon: "✉", label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
    { icon: "GH", label: "GitHub", value: "github.com/username", href: "https://github.com/username" },
    { icon: "IN", label: "LinkedIn", value: "linkedin.com/in/username", href: "https://linkedin.com/in/username" },
  ];

  return (
    <div className="hud-contact">
      <h2 className="hud-section-heading">CONTACT</h2>
      <p className="hud-body-text" style={{ marginBottom: 20 }}>
        Open to new projects, collaborations, and creative challenges.
      </p>
      <div className="hud-contact-stack">
        {links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="hud-link-card">
            <div className="hud-link-icon">{l.icon}</div>
            <div>
              <div className="hud-link-label">{l.label}</div>
              <div className="hud-link-value">{l.value}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

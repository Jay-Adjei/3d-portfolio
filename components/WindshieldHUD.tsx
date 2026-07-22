"use client";

import React from "react";
import { Html } from "@react-three/drei";

type Section = "home" | "about" | "projects" | "contact";

type WindshieldHUDProps = {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
};

/**
 * Diegetic automotive HUD — content projected onto the windshield glass.
 *
 * Geometry:
 *   position [-32, 22, 45] — anchored where the dashboard meets the windshield.
 *   rotation [-0.4, PI, 0] — X tilts the plane ~23° backward to match the
 *     windshield rake. Y = PI faces it toward the driver camera.
 *   distanceFactor 18 — keeps the HUD compact in the upper-mid windshield,
 *     leaving the steering wheel and gauges completely unobstructed.
 */
export default function WindshieldHUD({ activeSection, setActiveSection }: WindshieldHUDProps) {
  return (
    <group
      position={[-32, 22, 45]}
      rotation={[-0.4, Math.PI, 0]}
    >
      <Html
        transform
        distanceFactor={18}
        style={{
          width: "660px",
          pointerEvents: "auto",
          userSelect: "none",
        }}
        className="hud-root"
      >
        <div className="hud-frame">
          {/* ── Top accent line ── */}
          <div className="hud-edge-line" />

          {/* ── System bar ── */}
          <div className="hud-sysbar">
            <span className="hud-sys-dot" />
            <span className="hud-sys-label">SYS::PORTFOLIO</span>
            <span className="hud-sys-spacer" />
            <span className="hud-sys-label">
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* ── Nav strip ── */}
          <nav className="hud-nav-strip">
            {(["home", "about", "projects", "contact"] as Section[]).map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`hud-nav-pill ${activeSection === s ? "on" : ""}`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* ── Content ── */}
          <div className="hud-body">
            {activeSection === "home" && <HomeView setActiveSection={setActiveSection} />}
            {activeSection === "about" && <AboutView />}
            {activeSection === "projects" && <ProjectsView />}
            {activeSection === "contact" && <ContactView />}
          </div>

          {/* ── Bottom accent line ── */}
          <div className="hud-edge-line bottom" />
        </div>
      </Html>
    </group>
  );
}

/* ═══════════════════════════════════════════
   VIEWS
   ═══════════════════════════════════════════ */

function HomeView({ setActiveSection }: { setActiveSection: (s: Section) => void }) {
  return (
    <div className="hud-view-home">
      <p className="hud-eyebrow">WELCOME TO MY PORTFOLIO</p>
      <h1 className="hud-hero">
        Hi, I'm <span className="hud-glow-text">a Developer</span>
      </h1>
      <p className="hud-dim">
        Immersive digital experiences built with cutting-edge web tech.
      </p>
      <div className="hud-row gap-8">
        <button onClick={() => setActiveSection("projects")} className="hud-cta">
          VIEW PROJECTS
        </button>
        <button onClick={() => setActiveSection("about")} className="hud-cta ghost">
          ABOUT ME
        </button>
      </div>
      <div className="hud-stat-row">
        <Stat val="3+" lbl="YRS EXP" />
        <Stat val="10+" lbl="PROJECTS" />
        <Stat val="5+" lbl="TECH" />
      </div>
    </div>
  );
}

function Stat({ val, lbl }: { val: string; lbl: string }) {
  return (
    <div className="hud-stat">
      <span className="hud-stat-val">{val}</span>
      <span className="hud-stat-lbl">{lbl}</span>
    </div>
  );
}

function AboutView() {
  return (
    <div className="hud-view">
      <h2 className="hud-heading">ABOUT ME</h2>
      <p className="hud-dim" style={{ marginBottom: 14 }}>
        A software engineer who merges design with engineering — specializing in
        interactive 3D web experiences and modern front-end architectures.
      </p>
      <div className="hud-row gap-12">
        <SkillCol title="CORE STACK" color="cyan" items={["React / Next.js", "TypeScript", "Three.js / R3F", "Tailwind CSS"]} />
        <SkillCol title="ALSO" color="purple" items={["Node.js / Express", "UI / UX Design", "PostgreSQL", "Git / CI·CD"]} />
      </div>
    </div>
  );
}

function SkillCol({ title, color, items }: { title: string; color: string; items: string[] }) {
  return (
    <div className="hud-skill-col">
      <h3 className="hud-sub-heading">{title}</h3>
      {items.map((item) => (
        <div key={item} className="hud-skill-row">
          <span className={`hud-pip ${color}`} />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function ProjectsView() {
  const projects = [
    { title: "Project Alpha", desc: "Real-time collaborative editor with WebSockets.", tags: ["React", "Node.js", "WS"] },
    { title: "Project Beta", desc: "AI image generation tool using diffusion models.", tags: ["Python", "Next.js", "AI"] },
    { title: "Project Gamma", desc: "3D product configurator for e-commerce.", tags: ["Three.js", "R3F", "TS"] },
    { title: "Project Delta", desc: "Mobile social platform with real-time chat.", tags: ["RN", "Firebase", "Redux"] },
  ];

  return (
    <div className="hud-view">
      <h2 className="hud-heading">PROJECTS</h2>
      <div className="hud-data-strips">
        {projects.map((p, i) => (
          <div key={i} className="hud-strip">
            <span className="hud-strip-idx">0{i + 1}</span>
            <div className="hud-strip-body">
              <span className="hud-strip-title">{p.title}</span>
              <span className="hud-strip-desc">{p.desc}</span>
            </div>
            <div className="hud-strip-tags">
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
    <div className="hud-view">
      <h2 className="hud-heading">CONTACT</h2>
      <p className="hud-dim" style={{ marginBottom: 14 }}>
        Open to new projects, collaborations, and creative challenges.
      </p>
      <div className="hud-data-strips">
        {links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="hud-strip link">
            <span className="hud-strip-idx">{l.icon}</span>
            <div className="hud-strip-body">
              <span className="hud-strip-title">{l.label}</span>
              <span className="hud-strip-desc">{l.value}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

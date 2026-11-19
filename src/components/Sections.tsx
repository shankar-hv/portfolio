import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight, Calendar, Check, Copy, ExternalLink, Gauge, LayoutDashboard,
  Mail, MapPin, MessageCircle, Menu, Phone, Quote, Rocket, ShoppingBag, Sparkles, X, type LucideIcon,
} from "lucide-react";
import { profile, projects, process, services, stack, stats, testimonials, type Project } from "../data/profile";
import { CountUp, Magnetic, Reveal, SectionTitle, TiltCard, Typewriter } from "./Effects";
import { GithubIcon, LinkedinIcon, XIcon } from "./Icons";

const ICONS: Record<string, LucideIcon> = { Rocket, LayoutDashboard, ShoppingBag, Gauge };
const COLOR: Record<string, string> = {
  cyan: "#00f0ff", magenta: "#ff2bd6", lime: "#b6ff3b", violet: "#8b5cf6",
};
const SOCIALS = [
  { href: profile.socials.github, Icon: GithubIcon, label: "GitHub" },
  { href: profile.socials.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
  { href: profile.socials.twitter, Icon: XIcon, label: "X / Twitter" },
];

/* ───────────────────────── NAVBAR ───────────────────────── */
const LINKS = ["Services", "Work", "Process", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
          scrolled ? "glass mx-4 shadow-[0_0_30px_#00f0ff1a] md:mx-auto" : ""
        }`}
      >
        <a href="#top" className="font-display text-xl font-black tracking-widest">
          <span className="neon-text-cyan">{profile.initials}</span>
          <span className="neon-text-magenta">.</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="group relative font-mono text-sm uppercase tracking-widest text-muted transition hover:text-white">
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan shadow-[0_0_8px_#00f0ff] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <Magnetic>
            <a href="#contact" className="rounded-full border border-magenta/60 px-5 py-2 font-mono text-xs uppercase tracking-widest text-magenta transition hover:bg-magenta hover:text-void hover:shadow-[0_0_25px_#ff2bd6]">
              Hire me
            </a>
          </Magnetic>
        </div>
        <button className="text-cyan md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-4 md:hidden"
          >
            {LINKS.map((l) => (
              <li key={l}>
                <a onClick={() => setOpen(false)} href={`#${l.toLowerCase()}`} className="block rounded-lg px-3 py-3 font-mono uppercase tracking-widest text-white hover:bg-cyan/10 hover:text-cyan">
                  {l}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ───────────────────────── HERO ───────────────────────── */
export function Hero() {
  const words = profile.headline.split(" ");
  return (
    <section id="top" className="relative flex min-h-svh items-center px-4 pt-28 pb-16">
      <div className="mx-auto w-full max-w-6xl">
        {profile.available && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-lime/30 bg-lime/5 px-4 py-2 font-mono text-xs uppercase tracking-widest text-lime"
          >
            <span className="pulse-dot h-2 w-2 rounded-full bg-lime" />
            Available for freelance projects
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4 font-mono text-sm text-muted sm:text-base"
        >
          <span className="text-magenta">&gt;</span> Hi, I'm{" "}
          <span className="glitch font-display font-bold text-white" data-text={profile.name}>{profile.name}</span>
          <span className="mx-2 text-cyan/40">|</span>
          <Typewriter words={profile.roles} />
        </motion.p>

        <h1 className="font-display text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {words.map((w, i) => {
            const accent = /fast|beautiful|grow/i.test(w);
            return (
              <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
                <motion.span
                  className={`mr-[0.25em] inline-block ${accent ? "gradient-text" : ""}`}
                  initial={{ y: "110%", rotateX: -80, opacity: 0 }}
                  animate={{ y: 0, rotateX: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            );
          })}
        </h1>

        <Reveal delay={1.2} className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          {profile.intro}
        </Reveal>

        <Reveal delay={1.4} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a href="#work" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-cyan px-7 py-4 font-bold text-void shadow-[0_0_30px_#00f0ff88] transition hover:shadow-[0_0_50px_#00f0ff]">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              See my work <ArrowUpRight className="h-5 w-5 transition group-hover:rotate-45" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={profile.booking} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-magenta/60 px-7 py-4 font-bold text-magenta transition hover:bg-magenta/10 hover:shadow-[0_0_30px_#ff2bd666]">
              <Calendar className="h-5 w-5" /> Book a free call
            </a>
          </Magnetic>
          <div className="ml-1 flex items-center gap-3">
            {SOCIALS.map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-muted transition hover:-translate-y-1 hover:border-cyan hover:text-cyan hover:shadow-[0_0_20px_#00f0ff66]">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={1.6} className="mt-8 flex items-center gap-2 font-mono text-xs text-muted">
          <MapPin className="h-4 w-4 text-cyan" /> {profile.location}
        </Reveal>
      </div>

      <motion.a
        href="#stats"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted sm:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        scroll
        <span className="h-10 w-px bg-gradient-to-b from-cyan to-transparent" />
      </motion.a>
    </section>
  );
}

/* ───────────────────────── STATS ───────────────────────── */
export function Stats() {
  return (
    <section id="stats" className="px-4 py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div className="glass neon-border rounded-2xl p-6 text-center">
              <div className="font-display text-4xl font-black neon-text-cyan sm:text-5xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── SERVICES ───────────────────────── */
export function Services() {
  return (
    <section id="services" className="px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle kicker="what I solve" title="Services" sub="I don't just write code — I fix the problems that cost you customers, time and money." />
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon];
            const c = COLOR[s.color];
            return (
              <Reveal key={s.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="glass neon-border group relative h-full overflow-hidden rounded-3xl p-8"
                >
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-50" style={{ background: c }} />
                  <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl border transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110"
                    style={{ borderColor: `${c}66`, color: c, boxShadow: `0 0 20px ${c}44` }}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{s.title}</h3>
                  <p className="mt-4 font-mono text-sm" style={{ color: c }}>✕ {s.problem}</p>
                  <p className="mt-2 leading-relaxed text-muted">
                    <span className="text-white">✓</span> {s.solution}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── PROJECTS ───────────────────────── */
function ProjectCover({ p, i }: { p: Project; i: number }) {
  if (p.image) return <img src={p.image} alt={p.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />;
  const [a, b] = p.gradient;
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: `linear-gradient(135deg, ${a}33, ${b}22)` }}>
      <div className="grid-bg absolute inset-0 opacity-70" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-3xl border-2"
        style={{ borderColor: a, boxShadow: `0 0 40px ${a}, inset 0 0 40px ${b}` }}
        animate={{ rotate: [0, 90, 180, 270, 360], borderRadius: ["24%", "50%", "24%", "50%", "24%"] }}
        transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "linear" }}
      />
      <span className="absolute inset-0 grid place-items-center font-display text-3xl font-black text-white" style={{ textShadow: `0 0 20px ${a}` }}>
        {p.title}
      </span>
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle kicker="proof, not promises" title="Selected Work" sub="Real problems, real solutions, measurable results." />
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.15}>
              <TiltCard className="group neon-border glass rounded-3xl">
                <article className="flex h-full flex-col overflow-hidden rounded-3xl">
                  <div className="relative h-56 overflow-hidden" style={{ transform: "translateZ(40px)" }}>
                    <ProjectCover p={p} i={i} />
                    <span className="absolute left-4 top-4 rounded-full bg-void/70 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-cyan backdrop-blur">
                      {p.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7" style={{ transform: "translateZ(30px)" }}>
                    <h3 className="font-display text-2xl font-bold text-white">{p.title}</h3>
                    <dl className="mt-5 space-y-3 text-sm">
                      <div><dt className="font-mono text-xs uppercase tracking-widest text-magenta">Problem</dt><dd className="text-muted">{p.problem}</dd></div>
                      <div><dt className="font-mono text-xs uppercase tracking-widest text-cyan">Solution</dt><dd className="text-muted">{p.solution}</dd></div>
                    </dl>
                    <div className="mt-5 flex items-center gap-2 rounded-xl border border-lime/30 bg-lime/5 px-4 py-3 font-semibold text-lime">
                      <Sparkles className="h-4 w-4 shrink-0" /> {p.result}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/80">{t}</span>
                      ))}
                    </div>
                    <div className="mt-auto flex gap-3 pt-6">
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-cyan/10 px-4 py-2 text-sm font-semibold text-cyan transition hover:bg-cyan hover:text-void hover:shadow-[0_0_20px_#00f0ff]">
                          <ExternalLink className="h-4 w-4" /> Live demo
                        </a>
                      )}
                      {p.code && (
                        <a href={p.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-magenta hover:text-magenta hover:shadow-[0_0_20px_#ff2bd666]">
                          <GithubIcon className="h-4 w-4" /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── TECH MARQUEE ───────────────────────── */
export function StackMarquee() {
  const row = [...stack, ...stack];
  return (
    <section className="relative overflow-hidden py-16 [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
      {[false, true].map((rev) => (
        <div key={String(rev)} className="flex py-3">
          <div className={`marquee-track flex shrink-0 gap-4 ${rev ? "reverse" : ""}`}>
            {row.map((t, i) => (
              <span key={i} className={`whitespace-nowrap rounded-full border px-6 py-3 font-display text-sm font-bold uppercase tracking-widest ${
                rev ? "border-magenta/30 text-magenta/80" : "border-cyan/30 text-cyan/80"
              }`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/* ───────────────────────── PROCESS ───────────────────────── */
export function Process() {
  return (
    <section id="process" className="px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle kicker="how we'll work" title="My Process" sub="Clear steps, zero surprises. You always know what's happening next." />
        <div className="relative grid gap-6 md:grid-cols-4">
          <motion.div
            className="absolute left-0 right-0 top-10 hidden h-px origin-left bg-gradient-to-r from-cyan via-violet to-magenta shadow-[0_0_10px_#00f0ff] md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          {process.map((s, i) => (
            <Reveal key={s.step} delay={0.3 + i * 0.25}>
              <div className="relative text-center">
                <div className="relative z-10 mx-auto grid h-20 w-20 place-items-center rounded-full border border-cyan/50 bg-void font-display text-2xl font-black neon-text-cyan shadow-[0_0_25px_#00f0ff44]">
                  {s.step}
                </div>
                <h3 className="mt-6 font-display text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── TESTIMONIALS ───────────────────────── */
export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  return (
    <section className="px-4 py-28">
      <div className="mx-auto max-w-3xl">
        <SectionTitle kicker="client love" title="Kind Words" />
        <Reveal>
          <div className="glass neon-border always relative rounded-3xl p-10 text-center sm:p-14">
            <Quote className="mx-auto h-10 w-10 text-magenta drop-shadow-[0_0_10px_#ff2bd6]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.5 }}
              >
                <p className="mt-6 text-xl leading-relaxed text-white sm:text-2xl">"{t.quote}"</p>
                <p className="mt-6 font-display font-bold text-cyan">{t.name}</p>
                <p className="font-mono text-xs uppercase tracking-widest text-muted">{t.role}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, n) => (
                <button key={n} onClick={() => setI(n)} aria-label={`Testimonial ${n + 1}`}
                  className={`h-2 rounded-full transition-all ${n === i ? "w-8 bg-cyan shadow-[0_0_10px_#00f0ff]" : "w-2 bg-white/20"}`} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── CONTACT ───────────────────────── */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <section id="contact" className="px-4 py-32">
      <Reveal className="mx-auto max-w-4xl">
        <div className="glass neon-border always relative overflow-hidden rounded-[2rem] p-10 text-center sm:p-16">
          <div className="orb absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan/25" />
          <div className="orb absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-magenta/25 [animation-delay:-5s]" />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-lime flicker">// got a project?</p>
            <h2 className="mt-4 font-display text-4xl font-black text-white sm:text-6xl">
              Let's build something <span className="gradient-text">electric</span>.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted">
              Tell me about your idea — I reply within 24 hours with honest feedback, a rough timeline and a quote.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Magnetic>
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-magenta px-8 py-4 font-bold text-void shadow-[0_0_40px_#ff2bd666] transition hover:scale-105 hover:shadow-[0_0_60px_#00f0ff]">
                  <Mail className="h-5 w-5" /> Start a project
                </a>
              </Magnetic>
              <Magnetic>
                <button onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 font-mono text-sm text-white transition hover:border-cyan hover:text-cyan">
                  {copied ? <Check className="h-4 w-4 text-lime" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : profile.email}
                </button>
              </Magnetic>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 font-mono text-sm">
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 text-muted transition hover:text-cyan hover:drop-shadow-[0_0_8px_#00f0ff]">
                <Phone className="h-4 w-4 text-cyan" /> {profile.phone}
              </a>
              <a href={profile.booking} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted transition hover:text-lime hover:drop-shadow-[0_0_8px_#b6ff3b]">
                <MessageCircle className="h-4 w-4 text-lime" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ───────────────────────── FOOTER ───────────────────────── */
export function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name} · Designed & built with <span className="text-magenta">♥</span> and too much coffee
        </p>
        <div className="flex gap-3">
          {SOCIALS.map(({ href, Icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-muted transition hover:text-cyan hover:drop-shadow-[0_0_8px_#00f0ff]">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

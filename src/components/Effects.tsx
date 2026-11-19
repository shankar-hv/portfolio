import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";

/* ───────── Interactive neon particle network (canvas) ───────── */
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    const colors = ["#00f0ff", "#ff2bd6", "#8b5cf6"];
    type P = { x: number; y: number; vx: number; vy: number; c: string; r: number };
    let pts: P[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(110, Math.floor((w * h) / 14000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        c: colors[Math.floor(Math.random() * colors.length)],
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        // gentle repel from cursor
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 140 * 140) {
          const f = (140 * 140 - d2) / (140 * 140) * 0.6;
          const d = Math.sqrt(d2) || 1;
          p.vx += (dx / d) * f * 0.3;
          p.vy += (dy / d) * f * 0.3;
        }
        p.vx *= 0.98; p.vy *= 0.98;
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = dx * dx + dy * dy;
          if (d < 130 * 130) {
            ctx.strokeStyle = a.c;
            ctx.globalAlpha = (1 - Math.sqrt(d) / 130) * 0.25;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        // link to cursor
        const mx = a.x - mouse.x, my = a.y - mouse.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < 180) {
          ctx.strokeStyle = "#00f0ff";
          ctx.globalAlpha = (1 - md / 180) * 0.6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = a.c;
        ctx.shadowBlur = 8; ctx.shadowColor = a.c;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="grid-bg absolute inset-0" />
      <div className="orb absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-cyan/20" />
      <div className="orb absolute -right-40 top-1/3 h-[480px] w-[480px] rounded-full bg-magenta/20 [animation-delay:-6s]" />
      <div className="orb absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-violet/20 [animation-delay:-3s]" />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

/* ───────── Custom neon cursor (desktop only) ───────── */
export function NeonCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const rx = useSpring(x, { stiffness: 150, damping: 20 });
  const ry = useSpring(y, { stiffness: 150, damping: 20 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor]"));
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.body.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-1 -mt-1 h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_#00f0ff]"
      />
      <motion.div
        style={{ x: rx, y: ry }}
        animate={{ scale: hover ? 1.8 : 1, borderColor: hover ? "#ff2bd6" : "#00f0ff" }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-5 -mt-5 h-10 w-10 rounded-full border mix-blend-screen shadow-[0_0_20px_#00f0ff55]"
      />
    </>
  );
}

/* ───────── Scroll progress beam ───────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-cyan via-violet to-magenta shadow-[0_0_12px_#00f0ff]"
    />
  );
}

/* ───────── Reveal on scroll ───────── */
export function Reveal({
  children, delay = 0, y = 40, className = "",
}: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ───────── Magnetic wrapper (pulls toward cursor) ───────── */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* ───────── 3D tilt card with glare ───────── */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.18), transparent 50%)`;

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => { mx.set(0.5); my.set(0.5); }}
        className={`relative h-full ${className}`}
      >
        {children}
        <motion.div
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </motion.div>
    </div>
  );
}

/* ───────── Typewriter cycling roles ───────── */
export function Typewriter({
  words,
  className = "font-mono text-cyan",
  caretClassName = "bg-magenta shadow-[0_0_8px_#ff2bd6]",
}: { words: string[]; className?: string; caretClassName?: string }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const done = !del && text === word;
    const empty = del && text === "";
    const t = setTimeout(
      () => {
        if (done) setDel(true);
        else if (empty) { setDel(false); setI((n) => n + 1); }
        else setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      },
      done ? 1600 : del ? 40 : 85,
    );
    return () => clearTimeout(t);
  }, [text, del, i, words]);

  return (
    <span className={className}>
      {text}
      <span className={`caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[3px] ${caretClassName}`} />
    </span>
  );
}

/* ───────── Count-up number ───────── */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / 1600, 1);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ───────── Section heading ───────── */
export function SectionTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-magenta">// {kicker}</p>
      <h2 className="font-display text-3xl font-bold tracking-wide text-white sm:text-5xl">
        <span className="gradient-text">{title}</span>
      </h2>
      {sub && <p className="mt-4 text-muted">{sub}</p>}
    </Reveal>
  );
}

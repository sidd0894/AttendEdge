import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  CalendarCheck,
  BookOpen,
  TrendingUp,
  ArrowRight,
  LogIn,
  UserPlus,
  LayoutDashboard,
} from "lucide-react";

const FEATURES = [
  {
    icon: CalendarCheck,
    title: "Leave Impact Preview",
    description:
      "Enter your planned leave dates and instantly see how they'll affect your attendance percentage across every subject.",
  },
  {
    icon: BookOpen,
    title: "Subject-Level Insights",
    description:
      "Track attendance on a per-subject basis so you know exactly where you stand—and which classes need your attention most.",
  },
  {
    icon: TrendingUp,
    title: "Smart Predictions",
    description:
      "Get clear, data-driven projections telling you whether you'll stay above the required attendance threshold.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

export default function LandingPage() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ───────── Navbar ───────── */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
          <Link to="/" className="flex items-center gap-1">
            <h1 className="text-xl sm:text-2xl font-heading font-bold tracking-tight">
              Attend<span className="text-primary">Edge</span>
            </h1>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {!loading && user ? (
              <Button asChild size="sm" className="glow-primary">
                <Link to="/dashboard">
                  <LayoutDashboard className="h-4 w-4 mr-1.5" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">
                    <LogIn className="h-4 w-4 mr-1.5" />
                    Login
                  </Link>
                </Button>
                <Button asChild size="sm" className="glow-primary">
                  <Link to="/signup">
                    <UserPlus className="h-4 w-4 mr-1.5" />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ───────── Hero ───────── */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20 sm:py-28 relative overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 right-0 w-[360px] h-[360px] rounded-full bg-primary/8 blur-[100px] pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-2xl mx-auto text-center relative z-10"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Attendance Impact Calculator
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-[1.1]"
          >
            Know Your{" "}
            <span className="text-primary">Attendance</span>
            <br className="hidden sm:block" /> Before You Leave
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-5 text-md sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed"
          >
            Plan your days off with confidence. AttendEdge predicts exactly how
            your leave will impact attendance—subject by subject—so you never
            fall below the threshold.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button asChild size="lg" className="glow-primary text-base px-6">
              <Link to="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-6">
              <Link to="/login">Sign In</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ───────── Features ───────── */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center text-2xl sm:text-3xl font-heading font-bold mb-12"
          >
            Why{" "}
            <span className="text-primary">AttendEdge</span>?
          </motion.h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                className="group rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/20">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-lg font-heading font-semibold mb-2">
                  {f.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Footer ───────── */}
      <footer className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AttendEdge. Built for students who plan ahead.
      </footer>
    </div>
  );
}

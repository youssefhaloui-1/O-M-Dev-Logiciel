import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, LayoutDashboard, Sparkles, ShieldCheck } from "lucide-react";
import { BOOKS } from "./data/mockData";
import { Login } from "./components/auth/Login";
import { MemberView } from "./components/member/MemberView";
import { Spotlight } from "./components/member/Spotlight";
import { ManagerView } from "./components/manager/ManagerView";

export default function App() {
  const [auth, setAuth] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [view, setView] = useState<"member" | "manager">("member");
  const [books, setBooks] = useState(BOOKS);
  const [spot, setSpot] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpot((s) => !s);
      }
      if (e.key === "Escape") setSpot(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const tabs = [
    { k: "member" as const, l: "Vue adhérent", i: BookOpen },
    { k: "manager" as const, l: "Vue gérant", i: LayoutDashboard },
  ];

  return (
    <div
      className="relative min-h-screen overflow-x-hidden text-white"
      style={{
        background: "#0A0D14",
        fontFamily: "'Instrument Sans', system-ui, sans-serif",
      }}
    >
      <style>{`
        .font-display{font-family:'Fraunces',Georgia,serif;font-weight:500;letter-spacing:-.02em}
        .animate-ping-slow{animation:ping 1.4s cubic-bezier(0,0,.2,1) infinite}
        @media(prefers-reduced-motion:reduce){*{animation:none!important}}
      `}</style>

      <div className="pointer-events-none fixed inset-0">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-indigo-600/25 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity }}
          className="absolute -bottom-52 -right-40 h-[32rem] w-[32rem] rounded-full bg-fuchsia-600/15 blur-[140px]"
        />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0A0D14]/60 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <Sparkles size={18} className="text-indigo-300" />
            <span className="font-display text-xl">Athenaeum</span>
          </div>
          {auth && (
            <nav aria-label="Navigation principale" className="order-3 flex w-full rounded-full border border-white/10 bg-white/5 p-1 sm:order-none sm:w-auto">
              {tabs.map((t) => (
                <button
                  key={t.k}
                  onClick={() => setView(t.k)}
                  aria-current={view === t.k ? "page" : undefined}
                  className="relative z-10 flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-xs sm:flex-none sm:px-4 sm:text-sm"
                >
                  {view === t.k && (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-500/80 to-violet-500/80 shadow-[0_0_24px_-4px_rgba(139,92,246,.9)]"
                    />
                  )}
                  <t.i size={15} />
                  {t.l}
                </button>
              ))}
            </nav>
          )}
          {auth ? (
            <button
              onClick={() => {
                setAuth(false);
                setUserEmail("");
              }}
              aria-label={`Se déconnecter de ${userEmail || "votre session"}`}
              className="min-h-10 text-sm text-white/60 hover:text-white"
            >
              Se déconnecter
            </button>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <ShieldCheck size={14} />
              Accès sécurisé
            </span>
          )}
        </div>
      </header>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={auth ? view : "login"}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.35 }}
          >
            {!auth ? (
              <Login
                onEnter={(email) => {
                  setUserEmail(email);
                  setAuth(true);
                }}
              />
            ) : view === "member" ? (
              <MemberView
                books={books}
                openSpot={() => setSpot(true)}
                query={query}
                setQuery={setQuery}
              />
            ) : (
              <ManagerView books={books} setBooks={setBooks} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Spotlight
        open={spot && auth}
        onClose={() => setSpot(false)}
        books={books}
        onPick={(t) => {
          setQuery(t);
          setView("member");
        }}
      />
    </div>
  );
}

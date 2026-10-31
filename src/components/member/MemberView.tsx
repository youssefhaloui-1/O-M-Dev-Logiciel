import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Check } from "lucide-react";
import { Book, MemberLoan, Reservation } from "../../types/library";
import { MEMBER_LOANS, MEMBER_RESERVATIONS } from "../../data/mockData";
import { Glass } from "../ui/primitives";
import { BookCard } from "./BookCard";
import { BookDetailsModal } from "./BookDetailsModal";
import { MemberDashboard } from "./MemberDashboard";

export function MemberView({
  books,
  openSpot,
  query,
  setQuery,
}: {
  books: Book[];
  openSpot: () => void;
  query: string;
  setQuery: (s: string) => void;
}) {
  const [reserved, setReserved] = useState<string[]>(() => MEMBER_RESERVATIONS.map((item) => item.bookId));
  const [toast, setToast] = useState<Book | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [loans] = useState<MemberLoan[]>(MEMBER_LOANS);
  const [reservations, setReservations] = useState<Reservation[]>(MEMBER_RESERVATIONS);

  const list = useMemo(
    () =>
      books.filter((b) =>
        (b.title + b.author + b.field).toLowerCase().includes(query.toLowerCase())
      ),
    [books, query]
  );

  const reserve = (b: Book) => {
    setReserved((r) => (r.includes(b.id) ? r : [...r, b.id]));
    setReservations((items) => (items.some((item) => item.bookId === b.id) ? items : [...items, { bookId: b.id, createdOn: "2026-10-14", status: b.stock > 0 ? "ready" : "active" }]));
    setToast(b);
    setTimeout(() => setToast(null), 2800);
  };

  const cancelReservation = (bookId: string) => {
    setReserved((items) => items.filter((id) => id !== bookId));
    setReservations((items) => items.filter((item) => item.bookId !== bookId));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div className="pb-8 pt-10 text-center sm:pb-10 sm:pt-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl leading-[1.05] sm:text-5xl md:text-7xl"
        >
          Trouvez le livre,
          <br />
          réservez en un geste.
        </motion.h2>
        <button
          onClick={openSpot}
          aria-label="Ouvrir la recherche du catalogue"
          className="mx-auto mt-7 flex min-h-12 w-full max-w-xl items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-4 text-left text-white/55 backdrop-blur-xl transition hover:border-indigo-400/40 hover:shadow-[0_0_40px_-10px_rgba(129,140,248,.8)]"
        >
          <Search size={18} />
          <span className="flex-1 text-sm">Rechercher un ouvrage…</span>
          <kbd className="rounded bg-white/10 px-2 py-0.5 text-xs">Ctrl K</kbd>
        </button>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filtrer le catalogue"
          aria-label="Filtrer le catalogue"
          type="search"
          className="mt-4 w-full max-w-xs rounded-full bg-transparent text-center text-sm text-white/60 outline-none placeholder:text-white/25"
        />
      </div>

      {list.length === 0 && <p className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-sm text-white/55">Aucun ouvrage ne correspond à votre recherche.</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((b, i) => (
          <BookCard
            key={b.id}
            b={b}
            i={i}
            reserved={reserved.includes(b.id)}
            onReserve={() => reserve(b)}
            onOpen={() => setSelectedBook(b)}
          />
        ))}
      </div>

      <MemberDashboard books={books} loans={loans} reservations={reservations} onCancelReservation={cancelReservation} />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-8 left-1/2 z-40 -translate-x-1/2"
          >
            <Glass
              className="flex items-center gap-4 bg-[#0f1320]/90 px-6 py-4"
              glow="rgba(52,211,153,.5)"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                className="grid h-10 w-10 place-items-center rounded-full bg-emerald-400 text-black"
              >
                <Check strokeWidth={3} />
              </motion.span>
              <div>
                <p className="text-sm font-medium">Réservation confirmée</p>
                <p className="text-xs text-white/50">
                  {toast.title} · retrait au rayon {toast.shelf}
                </p>
              </div>
            </Glass>
          </motion.div>
        )}
      </AnimatePresence>
      <BookDetailsModal
        book={selectedBook}
        reserved={selectedBook ? reserved.includes(selectedBook.id) : false}
        onClose={() => setSelectedBook(null)}
        onReserve={() => selectedBook && reserve(selectedBook)}
      />
    </div>
  );
}
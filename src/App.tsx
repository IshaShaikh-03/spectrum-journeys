import { useState, useEffect, useRef, useCallback } from "react";
import {
  Phone, Mail, MapPin, Clock, Star, ChevronDown, Menu, X,
  CheckCircle, Users, Shield, Headphones
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FleetItem {
  name: string; image: string; capacity: string; ideal: string;
  features: string[]; price: string; badge: string; badgeColor: string;
}

// ─── Scroll‑reveal hook ───────────────────────────────────────────────────────

function useInView<T extends HTMLElement = HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
        { threshold }
      );
      obs.observe(el);
      return () => obs.disconnect();
    } else {
      setInView(true); // Fallback for older browsers
    }
  }, [threshold]);
  return { ref, inView };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home",         href: "#home" },
  { label: "Fleet",        href: "#fleet" },
  { label: "Services",     href: "#services" },
  { label: "Why Us",       href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact",      href: "#contact" },
];

const fleet: FleetItem[] = [
  {
    name: "Tempo Traveller",
    image: "/images/tempo-traveller.jpg",
    capacity: "9 – 17 Seats",
    ideal: "Family trips, Pilgrimages, School Picnics",
    features: ["AC / Non-AC options", "Reclining push-back seats", "Ample luggage space", "Music system & charging points"],
    price: "₹18 / km",
    badge: "Most Popular",
    badgeColor: "bg-amber-500",
  },
  {
    name: "SUV / Innova",
    image: "/images/suv.jpg",
    capacity: "6 – 8 Seats",
    ideal: "Corporate travel, Airport transfers, Small groups",
    features: ["Premium comfort seating", "Full air conditioning", "GPS-enabled navigation", "Professional uniformed driver"],
    price: "₹14 / km",
    badge: "Premium",
    badgeColor: "bg-blue-600",
  },
  {
    name: "Luxury Bus",
    image: "/images/bus.jpg",
    capacity: "20 – 50 Seats",
    ideal: "Corporate events, Weddings, College tours",
    features: ["Reclining push-back seats", "Full AC coach", "Entertainment system", "Ample boot space + overhead storage"],
    price: "₹35 / km",
    badge: "Best for Groups",
    badgeColor: "bg-emerald-600",
  },
];

const services = [
  { icon: "✈️", title: "Airport Transfers",     desc: "Punctual pick-up and drop to Sardar Vallabhbhai Patel International Airport, Ahmedabad. Flight-tracking included." },
  { icon: "🗺️", title: "Outstation Tours",      desc: "Explore Rajasthan, Goa, Mumbai, Jaipur and beyond with our comfortable, well-maintained long-distance fleet." },
  { icon: "🕌", title: "Pilgrimage Tours",      desc: "Comfortable group travel to Somnath, Dwarka, Ambaji, Dakor and other sacred sites across Gujarat and India." },
  { icon: "🏢", title: "Corporate Travel",      desc: "Dedicated corporate packages with invoicing, GST billing, employee tracking links, and priority booking." },
  { icon: "💒", title: "Wedding & Events",      desc: "Beautifully decorated vehicles and seamlessly coordinated logistics for weddings, receptions, and family functions." },
  { icon: "🏔️", title: "Hill Station Packages", desc: "Weekend getaways to Mount Abu, Saputara, and other scenic destinations from Ahmedabad at unbeatable rates." },
];

const whyUs = [
  { icon: <Shield className="w-5 h-5" />,     title: "Safe & Verified Drivers",   desc: "All drivers are police-verified, licensed, and trained specifically for long-distance travel safety." },
  { icon: <CheckCircle className="w-5 h-5" />, title: "Well-Maintained Fleet",     desc: "Regular servicing, valid fitness certificates, and comprehensive insurance on every vehicle in our fleet." },
  { icon: <Clock className="w-5 h-5" />,       title: "24 × 7 Availability",       desc: "Round-the-clock booking and support. We are always a call away — any hour, any day of the year." },
  { icon: <Headphones className="w-5 h-5" />,  title: "Dedicated Support",          desc: "A personal relationship manager assigned for all corporate and bulk bookings for seamless coordination." },
  { icon: <Users className="w-5 h-5" />,       title: "Group Travel Experts",       desc: "Specialised in large group logistics for pilgrimages, corporate events, weddings, and college tours." },
  { icon: <Star className="w-5 h-5" />,        title: "Trusted Since 2010",         desc: "Over 15 years of serving Ahmedabad with thousands of satisfied customers and a 4.9★ average rating." },
];

const testimonials = [
  { name: "Rajan Mehta",  location: "Ahmedabad",           rating: 5, review: "Spectrum Tours arranged a 40-seater bus for our company offsite to Udaipur. Everything was seamless — clean bus, polite driver, and perfect timing. Highly recommended!", avatar: "R", color: "from-blue-500 to-blue-700" },
  { name: "Priya Shah",   location: "Naranpura, Ahmedabad", rating: 5, review: "We hired a Tempo Traveller for a family pilgrimage to Dwarka and Somnath. Extremely comfortable journey, helpful driver, and very reasonable pricing. Will definitely book again.", avatar: "P", color: "from-pink-500 to-rose-600" },
  { name: "Amit Patel",   location: "Satellite, Ahmedabad", rating: 5, review: "Booked an Innova for our airport pickup at 4 AM. The driver arrived 10 minutes early, was professional and courteous. Spectrum Tours is my go-to service now.", avatar: "A", color: "from-amber-500 to-orange-600" },
  { name: "Hetal Desai",  location: "Bopal, Ahmedabad",     rating: 5, review: "Used their service for our daughter's wedding. Three vehicles perfectly coordinated, beautifully decorated, and on time. The team went above and beyond. Simply wonderful!", avatar: "H", color: "from-emerald-500 to-teal-600" },
];

const stats = [
  { value: "15+",  label: "Years of Experience" },
  { value: "500+", label: "Vehicles in Fleet" },
  { value: "50k+", label: "Happy Customers" },
  { value: "24/7", label: "Customer Support" },
];

const trustItems = [
  "✅ Police-Verified Drivers",
  "🛡️ Fully Insured Vehicles",
  "📍 GPS Tracked Fleet",
  "💳 Easy GST Billing",
  "📞 24/7 Customer Support",
  "🏆 15+ Years Experience",
  "⭐ 4.9 / 5 Rating",
  "🚗 500+ Vehicles",
];

const popularRoutes = [
  "Ahmedabad → Dwarka",
  "Ahmedabad → Somnath",
  "Ahmedabad → Mount Abu",
  "Ahmedabad → Udaipur",
  "Ahmedabad → Mumbai",
  "Ahmedabad → Jaipur",
];

// ─── StarRating ───────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  id, className, animation = "animate-fade-up", delay = "", children,
}: {
  id?: string; className?: string; animation?: string; delay?: string;
  children: React.ReactNode;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section
      id={id}
      ref={ref}
      className={`${className ?? ""} ${inView ? `${animation} ${delay}` : "opacity-0"}`}
    >
      {children}
    </section>
  );
}

// ─── Reveal Div (for non-section elements) ────────────────────────────────────

function Reveal({
  animation = "animate-fade-up", delay = "", className = "", children,
}: {
  animation?: string; delay?: string; className?: string; children: React.ReactNode;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${className} ${inView ? `${animation} ${delay}` : "opacity-0"}`}
    >
      {children}
    </div>
  );
}

// ─── Booking Modal ────────────────────────────────────────────────────────────

function BookingModal({
  open, onClose, defaultVehicle = "Tempo Traveller",
}: {
  open: boolean; onClose: () => void; defaultVehicle?: string;
}) {
  const [form, setForm] = useState({
    name: "", phone: "", pickup: "", destination: "",
    date: "", vehicle: defaultVehicle, passengers: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  // Sync vehicle when prop changes
  useEffect(() => {
    setForm((f) => ({ ...f, vehicle: defaultVehicle }));
  }, [defaultVehicle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 900);
  };

  const handleClose = useCallback(() => {
    onClose(); setTimeout(() => setSubmitted(false), 400);
  }, [onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else       document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Keyboard close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, handleClose]);

  if (!open) return null;

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm transition bg-gray-50 placeholder:text-gray-400 focus:bg-white";
  const labelCls = "block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-[6px] px-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      role="dialog" aria-modal="true" aria-label="Book a Ride"
    >
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[95dvh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-br from-orange-500 via-orange-500 to-amber-400 rounded-t-3xl px-7 py-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-orange-100 text-xs font-bold uppercase tracking-widest mb-1">Spectrum Tours & Travels</div>
              <h2 className="text-2xl font-extrabold text-white font-display">Book Your Ride</h2>
              <p className="text-orange-100/80 text-xs mt-1">We'll confirm your booking within 15 minutes</p>
            </div>
            <button
              onClick={handleClose}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition text-white mt-0.5"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-5 shadow-lg animate-bounce-in">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2 font-display">Booking Request Sent!</h3>
            <p className="text-gray-500 mb-1 text-sm leading-relaxed">
              Thank you, <strong className="text-gray-800">{form.name}</strong>!
            </p>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              Our team will call you at{" "}
              <strong className="text-orange-500">{form.phone}</strong>{" "}
              within 15 minutes to confirm.
            </p>
            <button
              onClick={handleClose}
              className="btn btn-primary px-8 py-3 text-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className={labelCls}>Your Name *</label>
                  <input required name="name" value={form.name} onChange={handleChange}
                    placeholder="Rajesh Patel" className={inputCls} autoComplete="name" />
                </div>
                <div>
                  <label className={labelCls}>Phone Number *</label>
                  <input required name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+91 98765 43210" className={inputCls} type="tel" autoComplete="tel" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Pickup Location *</label>
                <input required name="pickup" value={form.pickup} onChange={handleChange}
                  placeholder="Satellite, Ahmedabad" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Destination *</label>
                <input required name="destination" value={form.destination} onChange={handleChange}
                  placeholder="Dwarka, Gujarat" className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className={labelCls}>Travel Date *</label>
                  <input required type="date" name="date" value={form.date} onChange={handleChange}
                    className={inputCls} min={new Date().toISOString().split("T")[0]} />
                </div>
                <div>
                  <label className={labelCls}>Passengers</label>
                  <input name="passengers" value={form.passengers} onChange={handleChange}
                    placeholder="e.g. 12" type="number" min="1" max="60" className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Vehicle Type *</label>
                <select required name="vehicle" value={form.vehicle} onChange={handleChange} className={inputCls}>
                  <option>Tempo Traveller</option>
                  <option>SUV / Innova</option>
                  <option>Luxury Bus</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Additional Details</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                  placeholder="Stops, special requirements, luggage info…"
                  className={`${inputCls} resize-none`} />
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full btn btn-primary py-3.5 text-base orange-pulse disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting…
                  </span>
                ) : (
                  <>Submit Booking Request <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
              <p className="text-center text-xs text-gray-400">
                Or call us directly:{" "}
                <a href="tel:+919876512345" className="text-orange-500 font-semibold hover:text-orange-600">
                  +91 98765 12345
                </a>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 900);
  };

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm transition bg-gray-50 placeholder:text-gray-400";
  const labelCls = "block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide";

  if (sent) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[var(--shadow-card)] p-12 flex flex-col items-center justify-center text-center h-full min-h-72">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-5 animate-bounce-in shadow-lg">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-extrabold text-gray-900 mb-2 font-display">Message Received!</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
          Thank you for reaching out. We'll reply to you within 24 hours.
        </p>
        <button onClick={() => setSent(false)}
          className="mt-6 text-orange-500 font-bold hover:text-orange-600 transition text-sm flex items-center gap-1.5">
          ← Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-gray-100 shadow-[var(--shadow-card)] p-7 md:p-8 space-y-5">
      <div>
        <h3 className="text-xl font-extrabold text-gray-900 font-display">Send Us a Message</h3>
        <p className="text-gray-400 text-sm mt-1">We'll reply within 24 hours.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Name *</label>
          <input required name="name" value={form.name} onChange={handleChange}
            placeholder="Your Name" className={inputCls} autoComplete="name" />
        </div>
        <div>
          <label className={labelCls}>Phone *</label>
          <input required name="phone" value={form.phone} onChange={handleChange}
            placeholder="+91 XXXXX XXXXX" className={inputCls} type="tel" />
        </div>
      </div>
      <div>
        <label className={labelCls}>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange}
          placeholder="your@email.com" className={inputCls} autoComplete="email" />
      </div>
      <div>
        <label className={labelCls}>Message *</label>
        <textarea required name="message" value={form.message} onChange={handleChange} rows={5}
          placeholder="Tell us about your travel requirements…"
          className={`${inputCls} resize-none`} />
      </div>
      <button type="submit" disabled={loading}
        className="w-full btn btn-primary py-4 text-sm disabled:opacity-70 disabled:cursor-not-allowed">
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </span>
        ) : (
          <><Send className="w-4 h-4" /> Send Message</>
        )}
      </button>
    </form>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [bookingOpen,   setBookingOpen]   = useState(false);
  const [activeFleet,   setActiveFleet]   = useState(0);
  const [scrolled,      setScrolled]      = useState(false);
  const [bookingVehicle, setBookingVehicle] = useState("Tempo Traveller");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (id === "#home") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openBooking = (vehicle?: string) => {
    if (vehicle) setBookingVehicle(vehicle);
    setBookingOpen(true);
  };

  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden">
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultVehicle={bookingVehicle}
      />

      {/* ── Top Info Bar ──────────────────────────────────────────────────────── */}
      <div
        className={`hidden md:flex bg-[var(--surface-950)] text-gray-400 text-xs justify-between items-center px-8 transition-all duration-300 overflow-hidden ${
          scrolled ? "max-h-0 py-0" : "max-h-12 py-2.5"
        }`}
      >
        <div className="flex items-center gap-6">
          <a href="tel:+919876512345"
            className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
            <Phone className="w-3 h-3 text-orange-500" />+91 98765 12345
          </a>
          <a href="mailto:info@spectrumtours.in"
            className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
            <Mail className="w-3 h-3 text-orange-500" />info@spectrumtours.in
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-orange-500" />Ahmedabad, Gujarat
          </span>
        </div>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-orange-500" />Open 24 × 7 — Always Here for You
        </span>
      </div>

      {/* ── Navbar ────────────────────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/98 shadow-[0_2px_20px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
            : "bg-white/96 shadow-sm backdrop-blur-md"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16" aria-label="Main navigation">
          {/* Logo */}
          <button onClick={() => scrollTo("#home")} className="flex items-center gap-3 group" aria-label="Spectrum Tours Home">
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-[var(--shadow-brand)] group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl leading-none">S</span>
            </div>
            <div className="text-left">
              <div className="font-extrabold text-gray-900 text-base leading-tight tracking-tight font-display">Spectrum</div>
              <div className="text-orange-500 text-[9px] font-bold tracking-[0.22em] uppercase leading-none">Tours & Travels</div>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="nav-link text-sm font-medium text-gray-600 hover:text-orange-500">
                {l.label}
              </button>
            ))}
          </div>

          {/* CTA area */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+919876512345"
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-orange-500 transition-colors">
              <Phone className="w-4 h-4" />Call Now
            </a>
            <button
              onClick={() => openBooking()}
              className="btn btn-primary text-sm px-5 py-2.5"
            >
              Book a Ride
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Drawer */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-5 pt-4 pb-6 space-y-1.5 shadow-2xl animate-fade-down">
            {navLinks.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)}
                className="flex w-full text-left text-sm font-semibold text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-xl px-3 py-2.5 transition">
                {l.label}
              </button>
            ))}
            <div className="pt-3 space-y-2.5 border-t border-gray-100 mt-3">
              <a href="tel:+919876512345"
                className="flex items-center justify-center gap-2 w-full border border-orange-200 text-orange-600 font-semibold py-3 rounded-2xl text-sm hover:bg-orange-50 transition">
                <Phone className="w-4 h-4" />Call Now
              </a>
              <button
                onClick={() => { openBooking(); setMenuOpen(false); }}
                className="w-full btn btn-primary py-3 text-sm">
                Book a Ride
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-[94svh] flex items-center justify-center overflow-hidden" aria-label="Hero">
        {/* Background */}
        <div className="absolute inset-0 hero-bg" aria-hidden="true" />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/92 via-gray-900/75 to-gray-900/35" aria-hidden="true" />
        {/* Ambient orbs */}
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-orange-500/8 blur-3xl orb pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-amber-400/6 blur-2xl orb-2 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-3/4 left-1/4 w-56 h-56 rounded-full bg-orange-600/5 blur-2xl orb-3 pointer-events-none" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 py-20 md:py-28 flex flex-col md:flex-row items-center gap-10 md:gap-14">
          {/* Left text */}
          <div className="flex-1 text-white">
            <div className="inline-flex items-center gap-2 bg-orange-500/18 border border-orange-400/25 text-orange-300 text-xs font-bold px-4 py-1.5 rounded-full mb-6 animate-fade-up delay-50">
              <Sparkles className="w-3.5 h-3.5" />
              Ahmedabad's #1 Trusted Travel Partner
            </div>

            <h1 className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold text-white leading-[1.04] mb-6 animate-fade-up delay-100">
              Travel Ahmedabad{" "}
              <span className="text-gradient">&amp; Beyond</span>
              <br className="hidden md:block" />
              {" "}in Style
            </h1>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl animate-fade-up delay-200">
              Tempo Travellers, Premium SUVs & Luxury Buses with professional drivers.
              On-time, safe & comfortable — for every journey.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10 animate-fade-up delay-300">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl md:text-3xl font-extrabold text-gradient stat-value font-display">
                    <span>{s.value}</span>
                  </div>
                  <div className="text-gray-400 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3.5 animate-fade-up delay-400">
              <button
                onClick={() => openBooking()}
                className="btn btn-primary px-8 py-4 text-base orange-pulse"
              >
                Book a Ride <ArrowRight className="w-5 h-5" />
              </button>
              <a href="tel:+919876512345"
                className="btn btn-ghost px-8 py-4 text-base">
                <Phone className="w-5 h-5" />Call Now
              </a>
            </div>
          </div>

          {/* Hero glass card */}
          <div className="flex-shrink-0 w-full max-w-xs md:max-w-[300px] animate-slide-right delay-200">
            <div className="glass rounded-3xl p-7 text-white shadow-2xl">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-orange-500/25 flex items-center justify-center">
                  <span className="text-orange-300 text-xl leading-none">🚐</span>
                </div>
                <h2 className="font-bold text-lg">Quick Enquiry</h2>
              </div>
              <div className="space-y-2.5 mb-5">
                {[
                  { icon: "📍", label: "Pickup",     value: "Ahmedabad" },
                  { icon: "🚐", label: "Vehicle",    value: "Tempo Traveller" },
                  { icon: "👥", label: "Passengers", value: "1 – 50+" },
                ].map((item) => (
                  <div key={item.label}
                    className="bg-white/8 border border-white/10 rounded-2xl px-4 py-3 text-sm text-gray-200 flex items-center gap-3">
                    <span className="text-base">{item.icon}</span>
                    <span className="text-gray-400">{item.label}:</span>
                    <span className="text-white font-semibold ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => openBooking()}
                className="w-full btn btn-primary py-3.5 text-sm">
                Get Free Quote →
              </button>
              <p className="text-center text-xs text-gray-500 mt-3.5">
                Or call{" "}
                <a href="tel:+919876512345" className="text-orange-400 font-semibold hover:text-orange-300 transition">
                  +91 98765 12345
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-white/35 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ── Trust Marquee ────────────────────────────────────────────────────── */}
      <div className="bg-[var(--surface-950)] py-4 overflow-hidden border-t border-white/5">
        <div className="marquee-track" aria-hidden="true">
          {[...trustItems, ...trustItems].map((item, i) => (
            <span key={i} className="mx-8 text-sm font-semibold text-gray-300 whitespace-nowrap flex items-center gap-2">
              {item}
              <span className="mx-4 text-orange-500/35">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Fleet ──────────────────────────────────────────────────────────────── */}
      <Section id="fleet" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          {/* Heading */}
          <Reveal animation="animate-fade-up" className="text-center mb-14">
            <div className="section-badge justify-center mb-3">
              <span />Our Fleet<span />
            </div>
            <h2 className="section-title text-3xl md:text-5xl font-extrabold text-gray-900 mt-1">
              Choose Your <span className="text-gradient">Perfect Ride</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              From intimate SUV transfers to large group buses, our modern fleet covers every travel need.
            </p>
          </Reveal>

          {/* Vehicle Tabs */}
          <Reveal animation="animate-fade-up" delay="delay-100">
            <div className="flex justify-center gap-3 mb-10 flex-wrap">
              {fleet.map((v, i) => (
                <button key={v.name} onClick={() => setActiveFleet(i)}
                  className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                    activeFleet === i
                      ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-[var(--shadow-brand)] scale-105"
                      : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-200 hover:border-orange-200"
                  }`}
                  aria-pressed={activeFleet === i}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Active vehicle card */}
          {fleet.map((v, i) =>
            activeFleet === i ? (
              <Reveal key={v.name} animation="animate-scale-in">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
                  {/* Image */}
                  <div className="md:w-1/2 relative overflow-hidden">
                    <img src={v.image} alt={v.name}
                      className="w-full h-72 md:h-full object-cover transition-transform duration-700 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className={`absolute top-4 left-4 ${v.badgeColor} text-white text-xs font-extrabold px-4 py-1.5 rounded-full shadow-lg`}>
                      {v.badge}
                    </span>
                    <div className="absolute bottom-5 left-5 text-white">
                      <div className="text-3xl font-extrabold font-display">{v.price}</div>
                      <div className="text-xs text-white/65 mt-0.5">Starting rate</div>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-3 font-display">{v.name}</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <Users className="w-4 h-4 text-orange-400" />
                      Capacity: <span className="font-bold text-gray-800 ml-1">{v.capacity}</span>
                    </div>
                    <div className="text-gray-500 text-sm mb-7">
                      🎯 Ideal for: <span className="font-semibold text-gray-700">{v.ideal}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {v.features.map((f) => (
                        <li key={f} className="check-item">
                          <span className="check-icon"><CheckCircle className="w-3.5 h-3.5" /></span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => openBooking(v.name)}
                      className="btn btn-primary px-8 py-4 text-base self-start">
                      Book {v.name} →
                    </button>
                  </div>
                </div>
              </Reveal>
            ) : null
          )}

          {/* Fleet mini grid */}
          <Reveal animation="animate-fade-up" delay="delay-100" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fleet.map((v, i) => (
                <button key={v.name} onClick={() => setActiveFleet(i)}
                  className={`text-left bg-white rounded-2xl border transition-all p-4 flex items-center gap-4 card-lift shimmer-hover ${
                    activeFleet === i
                      ? "border-orange-400 ring-2 ring-orange-200 shadow-md"
                      : "border-gray-100 hover:border-orange-200 shadow-[var(--shadow-card)]"
                  }`}
                  aria-pressed={activeFleet === i}
                >
                  <div className="relative flex-shrink-0">
                    <img src={v.image} alt={v.name} className="w-20 h-[3.75rem] object-cover rounded-xl" />
                    {activeFleet === i && (
                      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-900 text-sm">{v.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{v.capacity}</div>
                    <div className="text-orange-500 font-bold text-sm mt-1">{v.price}</div>
                  </div>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Services ───────────────────────────────────────────────────────────── */}
      <Section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          <Reveal animation="animate-fade-up" className="text-center mb-14">
            <div className="section-badge justify-center mb-3">
              <span />What We Offer<span />
            </div>
            <h2 className="section-title text-3xl md:text-5xl font-extrabold text-gray-900 mt-1">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              From daily airport runs to multi-day pilgrimages — Spectrum Tours covers every journey across Ahmedabad and India.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} animation="animate-fade-up" delay={`delay-${(i % 3) * 100 + 100}` as React.ComponentProps<typeof Reveal>["delay"]}>
                <div className="group h-full bg-gray-50 hover:bg-gradient-to-br hover:from-orange-50/80 hover:to-amber-50/60 border border-gray-100 hover:border-orange-200 rounded-3xl p-7 transition-all card-lift shimmer-hover cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 group-hover:border-orange-100 group-hover:shadow-md flex items-center justify-center text-3xl mb-5 transition">
                    {s.icon}
                  </div>
                  <h3 className="text-base font-extrabold text-gray-900 mb-2 group-hover:text-orange-600 transition font-display">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-5 flex items-center gap-1 text-xs font-bold text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Why Us ─────────────────────────────────────────────────────────────── */}
      <Section id="why-us" className="py-24 bg-[var(--surface-950)] text-white relative overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-orange-500/4 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-5 md:px-12">
          <Reveal animation="animate-fade-up" className="text-center mb-14">
            <div className="section-badge justify-center mb-3 text-orange-400">
              <span className="bg-orange-500/40" />Why Choose Us<span className="bg-orange-500/40" />
            </div>
            <h2 className="section-title text-3xl md:text-5xl font-extrabold mt-1">
              The <span className="text-gradient">Spectrum</span> Advantage
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              We go beyond providing vehicles — we deliver peace of mind on every journey.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} animation="animate-fade-up" delay={`delay-${(i % 3) * 100 + 100}` as React.ComponentProps<typeof Reveal>["delay"]}>
                <div className="group bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] hover:border-orange-500/30 rounded-3xl p-7 transition-all card-lift shimmer-hover h-full">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-400/10 text-orange-400 group-hover:from-orange-500/30 flex items-center justify-center mb-5 transition">
                    {w.icon}
                  </div>
                  <h3 className="text-base font-extrabold mb-2 text-white font-display">{w.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Driver Section ──────────────────────────────────────────────────────── */}
      <Section className="py-24 bg-gradient-to-br from-orange-50 to-amber-50/40">
        <div className="max-w-7xl mx-auto px-5 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Image */}
          <Reveal animation="animate-slide-left" className="md:w-1/2 w-full">
            <div className="relative">
              <img src="/images/driver.jpg" alt="A professional driver in uniform"
                className="rounded-3xl shadow-2xl w-full object-cover max-h-[520px]" />
              {/* Floating stat badge */}
              <div className="absolute -bottom-5 -right-5 md:-right-7 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-orange-100/60">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white text-xl shadow-md">
                  ⭐
                </div>
                <div>
                  <div className="font-extrabold text-gray-900 text-sm font-display">4.9 / 5 Rating</div>
                  <div className="text-xs text-gray-400 mt-0.5">50,000+ happy rides</div>
                </div>
              </div>
            </div>
          </Reveal>
          {/* Content */}
          <Reveal animation="animate-slide-right" className="md:w-1/2">
            <div className="section-badge mb-3">
              <span />Professional Drivers<span />
            </div>
            <h2 className="section-title text-3xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-5">
              Experienced, Verified<br />& Courteous Drivers
            </h2>
            <p className="text-gray-600 leading-relaxed mb-7 text-sm md:text-base">
              Every driver on our platform is hand-picked, background-checked, and trained for long-distance travel.
              Whether it's a quick city run or a week-long pilgrimage tour, you're in safe hands.
            </p>
            <ul className="space-y-3.5 mb-9">
              {[
                "Police-verified background checks",
                "Valid commercial driving licences",
                "Route knowledge across Gujarat & India",
                "Trained in first aid & emergency handling",
                "Uniformed, punctual & polite professionals",
              ].map((point) => (
                <li key={point} className="check-item">
                  <span className="check-icon"><CheckCircle className="w-3.5 h-3.5" /></span>
                  {point}
                </li>
              ))}
            </ul>
            <button onClick={() => openBooking()}
              className="btn btn-primary px-8 py-4 text-base">
              Book with a Driver →
            </button>
          </Reveal>
        </div>
      </Section>

      {/* ── Testimonials ────────────────────────────────────────────────────────── */}
      <Section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          <Reveal animation="animate-fade-up" className="text-center mb-14">
            <div className="section-badge justify-center mb-3">
              <span />Testimonials<span />
            </div>
            <h2 className="section-title text-3xl md:text-5xl font-extrabold text-gray-900 mt-1">
              What Our <span className="text-gradient">Customers Say</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Thousands of happy travellers across Ahmedabad trust Spectrum Tours for every journey.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} animation="animate-fade-up" delay={`delay-${i * 100 + 100}` as React.ComponentProps<typeof Reveal>["delay"]}>
                <div className="bg-gray-50 hover:bg-white border border-gray-100 hover:border-orange-100 rounded-3xl p-6 flex flex-col transition-all card-lift shimmer-hover h-full">
                  <StarRating count={t.rating} />
                  <blockquote className="text-gray-600 text-sm leading-relaxed mt-4 mb-5 flex-1 italic">
                    "{t.review}"
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${t.color} text-white flex items-center justify-center font-black text-base shadow-sm`}
                      aria-hidden="true">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-extrabold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{t.location}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Aggregate trust bar */}
          <Reveal animation="animate-fade-up" delay="delay-200" className="mt-10">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-3xl p-6 flex flex-wrap items-center justify-center gap-8 text-center">
              {[
                { value: "4.9★", label: "Average Rating" },
                { value: "50,000+", label: "Happy Customers" },
                { value: "15+ yrs", label: "Trusted Experience" },
                { value: "100%", label: "Safe Journeys" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-2xl font-extrabold text-gradient font-display">{item.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── CTA Banner ─────────────────────────────────────────────────────────── */}
      <Section className="py-20 bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 relative overflow-hidden">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true" style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div className="relative max-w-4xl mx-auto px-5 text-center text-white">
          <Reveal animation="animate-fade-up">
            <h2 className="section-title text-3xl md:text-5xl font-extrabold mb-4">
              Ready to Plan Your Next Journey?
            </h2>
            <p className="text-orange-100/85 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Call us or submit a booking request. Our team confirms within 15 minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => openBooking()}
                className="btn bg-white text-orange-600 hover:bg-orange-50 px-10 py-4 text-base shadow-xl hover:-translate-y-1 transition-transform">
                Book a Ride Now
              </button>
              <a href="tel:+919876512345"
                className="btn btn-ghost px-10 py-4 text-base">
                <Phone className="w-5 h-5" />+91 98765 12345
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Contact ─────────────────────────────────────────────────────────────── */}
      <Section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          <Reveal animation="animate-fade-up" className="text-center mb-14">
            <div className="section-badge justify-center mb-3">
              <span />Get in Touch<span />
            </div>
            <h2 className="section-title text-3xl md:text-5xl font-extrabold text-gray-900 mt-1">
              Contact <span className="text-gradient">Us</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Info cards */}
            <Reveal animation="animate-slide-left" className="space-y-4">
              {[
                {
                  icon: <Phone className="w-5 h-5" />,
                  title: "Phone",
                  content: (
                    <div className="space-y-1">
                      <a href="tel:+919876512345" className="block text-orange-500 font-bold hover:text-orange-600 transition text-sm">+91 98765 12345</a>
                      <a href="tel:+919876567890" className="block text-orange-500 font-bold hover:text-orange-600 transition text-sm">+91 98765 67890</a>
                    </div>
                  ),
                },
                {
                  icon: <Mail className="w-5 h-5" />,
                  title: "Email",
                  content: (
                    <div className="space-y-1">
                      <a href="mailto:info@spectrumtours.in" className="block text-orange-500 hover:text-orange-600 transition text-sm">info@spectrumtours.in</a>
                      <a href="mailto:bookings@spectrumtours.in" className="block text-orange-500 hover:text-orange-600 transition text-sm">bookings@spectrumtours.in</a>
                    </div>
                  ),
                },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  title: "Office Address",
                  content: <p className="text-gray-500 text-sm leading-relaxed">123, Swastik Society, Near SG Highway,<br />Bodakdev, Ahmedabad – 380054<br />Gujarat, India</p>,
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  title: "Working Hours",
                  content: <p className="text-gray-500 text-sm">Available <strong className="text-gray-700">24 hours a day, 7 days a week</strong> for bookings and support.</p>,
                },
              ].map((item) => (
                <div key={item.title}
                  className="bg-white rounded-2xl shadow-[var(--shadow-card)] border border-gray-100 hover:border-orange-100 p-5 flex items-start gap-4 transition card-lift">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 text-orange-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-900 mb-1.5 text-sm">{item.title}</div>
                    {item.content}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919876512345?text=Hello%2C%20I%20would%20like%20to%20book%20a%20vehicle%20with%20Spectrum%20Tours."
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white rounded-2xl p-5 transition-colors card-lift shadow-md shadow-green-200"
              >
                <MessageSquare className="w-5 h-5 flex-shrink-0" />
                <div>
                  <div className="font-extrabold text-sm">Chat on WhatsApp</div>
                  <div className="text-green-100 text-xs mt-0.5">Instant replies available</div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto flex-shrink-0" />
              </a>
            </Reveal>

            {/* Contact Form */}
            <Reveal animation="animate-slide-right">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── Footer ──────────────────────────────────────────────────────────────── */}
      <footer className="bg-[var(--surface-950)] text-gray-400 pt-16 pb-6">
        {/* Top gradient border */}
        <div className="h-[3px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mb-16" />
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <span className="text-white font-black text-xl">S</span>
                </div>
                <div>
                  <div className="text-white font-extrabold text-base leading-tight font-display">Spectrum</div>
                  <div className="text-orange-400 text-[9px] font-bold tracking-[0.22em] uppercase">Tours & Travels</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-500 mb-5">
                Ahmedabad's trusted travel partner since 2010. Tempo travellers, SUVs, and buses with verified, professional drivers.
              </p>
              {/* Social links */}
              <div className="flex gap-2">
                {[
                  { label: "f",  href: "#", ariaLabel: "Facebook" },
                  { label: "in", href: "#", ariaLabel: "Instagram" },
                  { label: "▶",  href: "#", ariaLabel: "YouTube" },
                ].map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.ariaLabel}
                    className="w-9 h-9 rounded-xl bg-white/6 hover:bg-orange-500 flex items-center justify-center transition-colors text-white text-xs font-bold">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="text-white font-extrabold mb-5 text-sm">Quick Links</div>
              <ul className="space-y-2.5 text-sm">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <button onClick={() => scrollTo(l.href)}
                      className="nav-link hover:text-orange-400 transition-colors text-gray-500 text-sm text-left">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fleet */}
            <div>
              <div className="text-white font-extrabold mb-5 text-sm">Our Fleet</div>
              <ul className="space-y-2.5 text-sm text-gray-500">
                {["Tempo Traveller (9–17 Seats)", "SUV / Innova (6–8 Seats)", "Mini Bus (18–22 Seats)", "Luxury Coach (30–50 Seats)", "AC & Non-AC Options"].map((item) => (
                  <li key={item} className="hover:text-orange-400 transition-colors cursor-default">{item}</li>
                ))}
              </ul>
            </div>

            {/* Popular Routes */}
            <div>
              <div className="text-white font-extrabold mb-5 text-sm">Popular Routes</div>
              <ul className="space-y-2.5 text-sm text-gray-500">
                {popularRoutes.map((route) => (
                  <li key={route} className="hover:text-orange-400 transition-colors cursor-default">{route}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="divider-gradient mb-6" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} Spectrum Tours & Travels, Ahmedabad. All Rights Reserved.</p>
            <p>GST Registered · ISO 9001:2015 Certified · Made with ❤️ in Ahmedabad</p>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp ───────────────────────────────────────────────────── */}
      <a
        href="https://wa.me/919876512345?text=Hello%2C%20I%20would%20like%20to%20book%20a%20vehicle%20with%20Spectrum%20Tours%20%26%20Travels."
        target="_blank" rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 transition-transform hover:scale-110 glow-pulse"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ── Sticky Mobile CTA ───────────────────────────────────────────────────── */}
      <a
        href="tel:+919876512345"
        aria-label="Call Spectrum Tours Now"
        className="md:hidden fixed bottom-6 left-6 z-50 flex items-center gap-2 btn btn-primary px-5 py-3.5 text-sm orange-pulse shadow-xl shadow-orange-400/40"
      >
        <Phone className="w-4 h-4" />Call Now
      </a>
    </div>
  );
}

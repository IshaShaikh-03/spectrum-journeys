import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  ChevronDown,
  Menu,
  X,
  CheckCircle,
  Users,
  Shield,
  Headphones,
  ArrowRight,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Fleet", href: "#fleet" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const fleet = [
  {
    name: "Tempo Traveller",
    image: "/images/tempo-traveller.jpg",
    capacity: "9 – 17 Seats",
    ideal: "Family trips, Pilgrimages, School Picnics",
    features: ["AC / Non-AC options", "Reclining seats", "Ample luggage space", "Music system"],
    price: "₹18 / km",
    badge: "Most Popular",
    badgeColor: "bg-amber-500",
  },
  {
    name: "SUV / Innova",
    image: "/images/suv.jpg",
    capacity: "6 – 8 Seats",
    ideal: "Corporate travel, Airport transfers, Small groups",
    features: ["Premium comfort", "Air conditioned", "GPS enabled", "Professional driver"],
    price: "₹14 / km",
    badge: "Premium",
    badgeColor: "bg-blue-600",
  },
  {
    name: "Luxury Bus",
    image: "/images/bus.jpg",
    capacity: "20 – 50 Seats",
    ideal: "Corporate events, Weddings, College tours",
    features: ["Push-back seats", "AC coach", "Entertainment system", "Ample boot space"],
    price: "₹35 / km",
    badge: "Best for Groups",
    badgeColor: "bg-green-600",
  },
];

const services = [
  {
    icon: "✈️",
    title: "Airport Transfers",
    desc: "On-time pick-up and drop to Sardar Vallabhbhai Patel International Airport, Ahmedabad.",
  },
  {
    icon: "🗺️",
    title: "Outstation Tours",
    desc: "Explore Rajasthan, Goa, Mumbai, Jaipur and beyond with our comfortable long-distance fleet.",
  },
  {
    icon: "🕌",
    title: "Pilgrimage Tours",
    desc: "Comfortable group travel to Somnath, Dwarka, Ambaji, Dakor and other sacred sites.",
  },
  {
    icon: "🏢",
    title: "Corporate Travel",
    desc: "Dedicated corporate packages with invoicing, GST billing, and priority booking.",
  },
  {
    icon: "💒",
    title: "Wedding & Events",
    desc: "Decorated vehicles and coordinated logistics for weddings, receptions, and family functions.",
  },
  {
    icon: "🏔️",
    title: "Hill Station Packages",
    desc: "Weekend getaways to Mount Abu, Saputara, and other scenic destinations from Ahmedabad.",
  },
];

const whyUs = [
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Safe & Verified Drivers",
    desc: "All our drivers are police-verified, licensed, and trained for long-distance travel.",
  },
  {
    icon: <CheckCircle className="w-7 h-7" />,
    title: "Well-Maintained Fleet",
    desc: "Regular servicing, fitness certificates, and insurance on every vehicle.",
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: "24 × 7 Availability",
    desc: "Round-the-clock booking support. We are always a call away — day or night.",
  },
  {
    icon: <Headphones className="w-7 h-7" />,
    title: "Dedicated Support",
    desc: "A dedicated relationship manager for corporate and bulk bookings.",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Group Travel Experts",
    desc: "Specialised in large group logistics for pilgrimages, events, and corporate trips.",
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: "Trusted Since 2010",
    desc: "Over a decade of serving Ahmedabad with thousands of satisfied customers.",
  },
];

const testimonials = [
  {
    name: "Rajan Mehta",
    location: "Ahmedabad",
    rating: 5,
    review:
      "Spectrum Tours arranged a 40-seater bus for our company offsite to Udaipur. Everything was seamless — clean bus, polite driver, and perfect timing. Highly recommended!",
    avatar: "R",
    color: "bg-blue-600",
  },
  {
    name: "Priya Shah",
    location: "Naranpura, Ahmedabad",
    rating: 5,
    review:
      "We hired a Tempo Traveller for a family pilgrimage to Dwarka and Somnath. Extremely comfortable journey, helpful driver, and very reasonable pricing. Will definitely book again.",
    avatar: "P",
    color: "bg-pink-500",
  },
  {
    name: "Amit Patel",
    location: "Satellite, Ahmedabad",
    rating: 5,
    review:
      "Booked an Innova for our airport pickup at 4 AM. The driver arrived 10 minutes early, was professional and courteous. Spectrum Tours is my go-to service now.",
    avatar: "A",
    color: "bg-amber-500",
  },
  {
    name: "Hetal Desai",
    location: "Bopal, Ahmedabad",
    rating: 5,
    review:
      "Used their service for our daughter's wedding. Three vehicles perfectly coordinated, beautifully decorated, and on time. The team went above and beyond. Simply wonderful!",
    avatar: "H",
    color: "bg-green-600",
  },
];

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "500+", label: "Vehicles in Fleet" },
  { value: "50,000+", label: "Happy Customers" },
  { value: "24/7", label: "Customer Support" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    destination: "",
    date: "",
    vehicle: "Tempo Traveller",
    passengers: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            onClose();
            setSubmitted(false);
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="w-9 h-9 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Booking Request Sent!
            </h3>
            <p className="text-gray-500 mb-6">
              Thank you, <strong>{form.name}</strong>! Our team will call you at{" "}
              <strong>{form.phone}</strong> within 15 minutes to confirm your
              booking.
            </p>
            <button
              onClick={() => {
                onClose();
                setSubmitted(false);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              Book Your Ride
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Fill in the details below and we'll get back to you promptly.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Rajesh Patel"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    required
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Location *
                </label>
                <input
                  required
                  name="pickup"
                  value={form.pickup}
                  onChange={handleChange}
                  placeholder="Satellite, Ahmedabad"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination *
                </label>
                <input
                  required
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder="Dwarka, Gujarat"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Travel Date *
                  </label>
                  <input
                    required
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passengers
                  </label>
                  <input
                    name="passengers"
                    value={form.passengers}
                    onChange={handleChange}
                    placeholder="12"
                    type="number"
                    min="1"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Type *
                </label>
                <select
                  required
                  name="vehicle"
                  value={form.vehicle}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                >
                  <option>Tempo Traveller</option>
                  <option>SUV / Innova</option>
                  <option>Luxury Bus</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Details
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any special requirements, stops, etc."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition text-base shadow-lg shadow-orange-200"
              >
                Submit Booking Request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeFleet, setActiveFleet] = useState(0);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden">
      {/* ── Booking Modal ── */}
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* ── Top Bar ── */}
      <div className="hidden md:flex bg-gray-900 text-gray-300 text-xs justify-between items-center px-8 py-2">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-orange-400" />
            +91 98765 12345
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-orange-400" />
            info@spectrumtours.in
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-orange-400" />
            Ahmedabad, Gujarat
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-orange-400" />
          Open 24 × 7 — Always Here for You
        </div>
      </div>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-md">
              <span className="text-white font-black text-lg leading-none">S</span>
            </div>
            <div className="text-left">
              <div className="font-extrabold text-gray-900 text-base leading-tight tracking-tight">
                Spectrum
              </div>
              <div className="text-orange-500 text-[10px] font-semibold tracking-widest uppercase leading-none">
                Tours & Travels
              </div>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="text-sm font-medium text-gray-600 hover:text-orange-500 transition"
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+919876512345"
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-orange-500 transition"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-md shadow-orange-100"
            >
              Book a Ride
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 space-y-3 shadow-lg">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="block w-full text-left text-sm font-medium text-gray-700 hover:text-orange-500 py-1"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => {
                setBookingOpen(true);
                setMenuOpen(false);
              }}
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl mt-2"
            >
              Book a Ride
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section
        id="home"
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-900/70 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-white">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              🏆 Ahmedabad's #1 Trusted Travel Partner
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
              Travel Ahmedabad &{" "}
              <span className="text-orange-400">Beyond</span> in Style
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              Tempo Travellers, Premium SUVs & Luxury Buses with professional
              drivers. On-time, safe & comfortable — for every journey.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mb-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-extrabold text-orange-400">
                    {s.value}
                  </div>
                  <div className="text-gray-400 text-xs">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setBookingOpen(true)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl transition shadow-xl shadow-orange-500/30 text-base"
              >
                Book a Ride <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="tel:+919876512345"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl transition text-base"
              >
                <Phone className="w-5 h-5" /> Call Now
              </a>
            </div>
          </div>

          {/* Hero Card */}
          <div className="flex-shrink-0 w-full md:w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white shadow-2xl">
            <h3 className="font-bold text-lg mb-4 text-center">
              Quick Enquiry
            </h3>
            <div className="space-y-3">
              <div className="bg-white/10 rounded-xl px-4 py-3 text-sm text-gray-200">
                📍 Pickup: <span className="text-white font-semibold">Ahmedabad</span>
              </div>
              <div className="bg-white/10 rounded-xl px-4 py-3 text-sm text-gray-200">
                🚐 Vehicle:{" "}
                <span className="text-white font-semibold">Tempo Traveller</span>
              </div>
              <div className="bg-white/10 rounded-xl px-4 py-3 text-sm text-gray-200">
                👥 Passengers: <span className="text-white font-semibold">1–50</span>
              </div>
            </div>
            <button
              onClick={() => setBookingOpen(true)}
              className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
            >
              Get Free Quote
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              Or call us at{" "}
              <a href="tel:+919876512345" className="text-orange-300 font-semibold">
                +91 98765 12345
              </a>
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="bg-gray-900 py-5">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-6 text-sm text-gray-300">
          {[
            "✅ Police-Verified Drivers",
            "🛡️ Fully Insured Vehicles",
            "📍 GPS Tracked Fleet",
            "💳 Easy GST Billing",
            "📞 24/7 Customer Support",
            "🏆 15+ Years of Experience",
          ].map((item) => (
            <span key={item} className="font-medium">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── Fleet ── */}
      <section id="fleet" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              Our Fleet
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Choose Your Perfect Ride
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              From intimate SUV transfers to large group buses, our modern fleet
              covers every travel need with comfort and reliability.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-center gap-3 mb-10">
            {fleet.map((v, i) => (
              <button
                key={v.name}
                onClick={() => setActiveFleet(i)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition ${
                  activeFleet === i
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-200"
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>

          {/* Fleet Card */}
          {fleet.map((v, i) =>
            activeFleet === i ? (
              <div
                key={v.name}
                className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row"
              >
                <div className="md:w-1/2 relative">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-72 md:h-full object-cover"
                  />
                  <span
                    className={`absolute top-4 left-4 ${v.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}
                  >
                    {v.badge}
                  </span>
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-2">
                    {v.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Users className="w-4 h-4 text-orange-400" />
                    Capacity: <span className="font-semibold text-gray-700">{v.capacity}</span>
                  </div>
                  <div className="text-gray-500 text-sm mb-6">
                    🎯 Ideal for: <span className="font-medium text-gray-700">{v.ideal}</span>
                  </div>
                  <ul className="space-y-2.5 mb-8">
                    {v.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-extrabold text-orange-500">
                        {v.price}
                      </div>
                      <div className="text-xs text-gray-400">
                        Starting rate · Final quote on request
                      </div>
                    </div>
                    <button
                      onClick={() => setBookingOpen(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ) : null
          )}

          {/* All Vehicle Cards — Grid below */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {fleet.map((v, i) => (
              <button
                key={v.name}
                onClick={() => setActiveFleet(i)}
                className={`text-left bg-white rounded-2xl shadow border transition p-5 flex items-center gap-4 ${
                  activeFleet === i
                    ? "border-orange-400 ring-2 ring-orange-200"
                    : "border-gray-100 hover:border-orange-200"
                }`}
              >
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-20 h-16 object-cover rounded-xl flex-shrink-0"
                />
                <div>
                  <div className="font-bold text-gray-900">{v.name}</div>
                  <div className="text-xs text-gray-500">{v.capacity}</div>
                  <div className="text-orange-500 font-semibold text-sm mt-1">
                    {v.price}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Our Services
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              From daily airport runs to multi-day pilgrimages, Spectrum Tours
              covers every journey across Ahmedabad and India.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="group bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 rounded-2xl p-7 transition cursor-default"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section
        id="why-us"
        className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
              The Spectrum Advantage
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              We go beyond just providing vehicles. We deliver peace of mind on
              every journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((w) => (
              <div
                key={w.title}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-7 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
                  {w.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{w.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Driver Section ── */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src="/images/driver.jpg"
              alt="Professional Driver"
              className="rounded-3xl shadow-2xl w-full object-cover max-h-[480px]"
            />
          </div>
          <div className="md:w-1/2">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              Professional Drivers
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-5">
              Experienced, Verified &amp; Courteous Drivers
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Every driver on our platform is hand-picked, background-checked,
              and trained for long-distance travel. Whether it's a quick city
              run or a week-long pilgrimage tour, you're in safe hands.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Police-verified background checks",
                "Valid commercial driving licences",
                "Route knowledge across Gujarat & India",
                "Trained in first aid & emergency handling",
                "Uniformed, punctual & polite professionals",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-gray-700 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl transition shadow-lg"
            >
              Book with a Driver
            </button>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              What Our Customers Say
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Thousands of happy travellers across Ahmedabad trust Spectrum
              Tours for every journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col"
              >
                <StarRating count={t.rating} />
                <p className="text-gray-600 text-sm leading-relaxed mt-4 mb-5 flex-1">
                  "{t.review}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${t.color} text-white flex items-center justify-center font-bold text-base`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-400">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-amber-400">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Plan Your Next Journey?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Call us now or submit a booking request and our team will get back
            to you within 15 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-white text-orange-600 font-extrabold px-8 py-3.5 rounded-xl text-base hover:bg-orange-50 transition shadow-lg"
            >
              Book a Ride Now
            </button>
            <a
              href="tel:+919876512345"
              className="flex items-center gap-2 bg-orange-600/40 hover:bg-orange-600/60 text-white border border-white/40 font-bold px-8 py-3.5 rounded-xl text-base transition"
            >
              <Phone className="w-5 h-5" /> +91 98765 12345
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              Contact Us
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow p-7 flex items-start gap-5 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Phone</div>
                  <a href="tel:+919876512345" className="text-orange-500 font-semibold hover:underline">
                    +91 98765 12345
                  </a>
                  <br />
                  <a href="tel:+919876567890" className="text-orange-500 font-semibold hover:underline">
                    +91 98765 67890
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-7 flex items-start gap-5 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Email</div>
                  <a href="mailto:info@spectrumtours.in" className="text-orange-500 hover:underline">
                    info@spectrumtours.in
                  </a>
                  <br />
                  <a href="mailto:bookings@spectrumtours.in" className="text-orange-500 hover:underline">
                    bookings@spectrumtours.in
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-7 flex items-start gap-5 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Office Address</div>
                  <p className="text-gray-600 text-sm">
                    123, Swastik Society, Near SG Highway,
                    <br />
                    Bodakdev, Ahmedabad – 380054
                    <br />
                    Gujarat, India
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-7 flex items-start gap-5 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Working Hours</div>
                  <p className="text-gray-600 text-sm">
                    We are available <strong>24 hours a day, 7 days a week</strong> for
                    bookings and support.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-400 pt-14 pb-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow">
                  <span className="text-white font-black text-lg">S</span>
                </div>
                <div>
                  <div className="text-white font-extrabold text-base leading-tight">
                    Spectrum
                  </div>
                  <div className="text-orange-400 text-[10px] font-semibold tracking-widest uppercase">
                    Tours & Travels
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">
                Ahmedabad's trusted cab booking partner since 2010. Tempo
                travellers, SUVs, and buses with verified drivers.
              </p>
              <div className="flex gap-3 mt-5">
                {["f", "in", "tw"].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition text-white text-xs font-bold"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="text-white font-bold mb-4">Quick Links</div>
              <ul className="space-y-2 text-sm">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => scrollTo(l.href)}
                      className="hover:text-orange-400 transition"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Fleet */}
            <div>
              <div className="text-white font-bold mb-4">Our Fleet</div>
              <ul className="space-y-2 text-sm">
                {[
                  "Tempo Traveller (9–17 Seats)",
                  "SUV / Innova (6–8 Seats)",
                  "Mini Bus (18–22 Seats)",
                  "Luxury Coach (30–50 Seats)",
                  "AC / Non-AC Options",
                ].map((item) => (
                  <li key={item} className="hover:text-orange-400 transition cursor-default">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Routes */}
            <div>
              <div className="text-white font-bold mb-4">Popular Routes</div>
              <ul className="space-y-2 text-sm">
                {[
                  "Ahmedabad → Dwarka",
                  "Ahmedabad → Somnath",
                  "Ahmedabad → Mount Abu",
                  "Ahmedabad → Udaipur",
                  "Ahmedabad → Mumbai",
                  "Ahmedabad → Jaipur",
                ].map((route) => (
                  <li key={route} className="hover:text-orange-400 transition cursor-default">
                    {route}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>
              © {new Date().getFullYear()} Spectrum Tours & Travels, Ahmedabad.
              All Rights Reserved.
            </p>
            <p className="text-gray-600">
              GST Registered · ISO 9001:2015 Certified
            </p>
          </div>
        </div>
      </footer>

      {/* ── WhatsApp Floating Button ── */}
      <a
        href="https://wa.me/919876512345?text=Hello%2C%20I%20would%20like%20to%20book%20a%20vehicle%20with%20Spectrum%20Tours%20%26%20Travels."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-300/50 transition"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}

// ─── Contact Form Component ───────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-10 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle className="w-9 h-9 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Received!</h3>
        <p className="text-gray-500">
          Thank you for contacting Spectrum Tours & Travels. We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-5 text-orange-500 font-semibold hover:underline text-sm"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow border border-gray-100 p-8 space-y-5"
    >
      <h3 className="text-xl font-bold text-gray-900">Send Us a Message</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input
            required
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
        <textarea
          required
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          placeholder="Tell us about your travel requirements..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-lg"
      >
        Send Message
      </button>
    </form>
  );
}

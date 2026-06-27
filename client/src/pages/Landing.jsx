import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Volunteers", href: "#volunteers" },
  { label: "NGOs", href: "#ngos" },
  { label: "Contact", href: "#contact" },
];

const STEPS = [
  {
    icon: "🆘",
    title: "Send SOS",
    desc: "Tap once to send your live location and crisis type to the entire network.",
    color: "bg-red-50 border-red-200",
    iconBg: "bg-red-100",
  },
  {
    icon: "🙋",
    title: "Volunteer responds",
    desc: "The nearest trained volunteer accepts your alert and heads your way.",
    color: "bg-orange-50 border-orange-200",
    iconBg: "bg-orange-100",
  },
  {
    icon: "✅",
    title: "Crisis resolved",
    desc: "Help arrives in minutes. NGOs are automatically looped in as needed.",
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-100",
  },
];

const STATS = [
  { value: "500+", label: "Lives saved" },
  { value: "200+", label: "Active volunteers" },
  { value: "50+", label: "NGO partners" },
  { value: "24/7", label: "Always on" },
];

const NGOS = [
  { emoji: "🏥", name: "MedRelief India", desc: "Emergency medical aid and ambulance coordination." },
  { emoji: "🍱", name: "FoodFirst NGO", desc: "Rapid food and water supply to disaster zones." },
  { emoji: "🏠", name: "ShelterNow", desc: "Temporary housing and rehabilitation support." },
];

function PulseDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
    </span>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-2xl">🚨</span>
          <span
            className={`font-bold text-lg tracking-tight transition-colors ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            CrisisConnect
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector(link.href);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`text-sm transition-colors cursor-pointer ${
                scrolled
                  ? "text-gray-500 hover:text-gray-900"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              scrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-red-950 to-gray-900" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
          <PulseDot />
          <span className="text-white/80 text-sm font-medium">
            Live response network active
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
          Save lives <span className="text-red-400">in real time</span>
        </h1>

        <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
          Connecting victims, volunteers, and NGOs instantly — because when
          every second counts, the network has to be faster.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/register")}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-base transition-all hover:scale-105 active:scale-100 shadow-lg shadow-red-900/40"
          >
            <span>🆘</span>
            Send SOS now
          </button>
          <button
            onClick={() => navigate("/register")}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-xl text-base transition-all"
          >
            <span>🙋</span>
            Become a volunteer
          </button>
        </div>

        <div className="mt-20 flex justify-center">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-red-600 text-sm font-semibold tracking-widest uppercase mb-3">
            The process
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How it works</h2>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            From alert to resolution in three steps — designed for speed under pressure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-red-200 to-orange-200 z-0" />
          {STEPS.map((step, i) => (
            <div key={i} className="relative z-10">
              <div
                className={`border rounded-2xl p-7 ${step.color} h-full transition-all hover:-translate-y-1 hover:shadow-md`}
              >
                <div className={`w-14 h-14 ${step.iconBg} rounded-xl flex items-center justify-center text-2xl mb-5`}>
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-gray-400 tracking-widest block mb-2">
                  STEP {i + 1}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section id="volunteers" className="py-20 bg-gray-950">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-center text-white/40 text-sm font-semibold tracking-widest uppercase mb-12">
          By the numbers
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-5xl font-bold text-red-400 mb-2 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NGOSection() {
  return (
    <section id="ngos" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-red-600 text-sm font-semibold tracking-widest uppercase mb-3">
            Our partners
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">NGO network</h2>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Trusted organizations coordinated automatically when a crisis is reported.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {NGOS.map((ngo, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="text-4xl mb-4">{ngo.emoji}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{ngo.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{ngo.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-xl mx-auto px-6 text-center">
        <p className="text-red-600 text-sm font-semibold tracking-widest uppercase mb-3">
          Get in touch
        </p>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact us</h2>
        <p className="text-gray-500 mb-10">
          Have questions? Want to partner with us? We'd love to hear from you.
        </p>
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-left space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="How can we help?"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 resize-none"
            />
          </div>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg text-sm transition-colors">
            Send message
          </button>
        </div>
        <p className="text-gray-400 text-sm mt-6">
          Or reach us at{" "}
          <a href="mailto:hello@crisisconnect.in" className="text-red-500 hover:underline">
            hello@crisisconnect.in
          </a>
        </p>
      </div>
    </section>
  );
}

function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-br from-gray-950 via-red-950 to-gray-900 rounded-3xl p-12 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-red-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Join the network
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Ready to make a<br />real difference?
            </h2>
            <p className="text-white/50 mb-8 max-w-sm mx-auto text-sm leading-relaxed">
              Hundreds of volunteers are already responding in their communities.
              It takes under two minutes to sign up.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/register")}
                className="px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-sm transition-all hover:scale-105 active:scale-100"
              >
                🆘 Send SOS now
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-7 py-3.5 border border-white/20 hover:bg-white/10 text-white text-sm rounded-xl transition-colors"
              >
                Volunteer sign-up
              </button>
            </div>
            <p className="text-white/30 text-xs mt-6">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-white/50 hover:text-white underline transition-colors"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-gray-100 bg-white py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span>🚨</span>
          <span className="font-semibold text-gray-800 text-sm">CrisisConnect</span>
        </div>
        <p className="text-gray-400 text-sm">© 2026 CrisisConnect. All rights reserved.</p>
        <div className="flex gap-5 text-sm text-gray-400">
          <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-700 transition-colors">Terms</a>
          <a href="#" className="hover:text-gray-700 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Stats />
      <NGOSection />
      <Contact />
      <CTA />
      <Footer />
    </div>
  );
}
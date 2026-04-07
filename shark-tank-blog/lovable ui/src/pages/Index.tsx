import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-stage.jpg";
import foundersImage from "@/assets/founders-stories.jpg";
import ComparisonSection from "@/components/ComparisonSection";
import { ChevronDown, Zap, Eye, FileText } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToPayment = () => navigate("/payment?amount=20&frequency=yearly");

  return (
    <div className="min-h-screen bg-background">

      {/* ─── 1. HERO ─── */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Shark Tank stage with dramatic lighting"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/85" />
        </div>

        <div className="relative text-center px-6 max-w-lg mx-auto">
          <h1 className="font-serif text-[2.5rem] sm:text-6xl font-semibold leading-[1.08] tracking-tight text-white">
            You came for the story.<br />
            Not the ads.
          </h1>
          <p className="mt-5 text-white/60 text-base sm:text-lg leading-relaxed">
            Finish every pitch, deal, and update — without interruptions.
          </p>
          <div className="mt-8">
            <button onClick={goToPayment} className="cta-button">
              Start reading ad-free
            </button>
          </div>
          <p className="mt-4 text-white/35 text-xs">
            <span className="line-through">$25/year</span>{" "}
            <span className="text-white/50 font-medium">$20/year — today only</span>
            {" "}· Cancel anytime
          </p>
        </div>

        <button
          onClick={() => document.getElementById("value-strip")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </section>

      {/* ─── 2. VALUE STRIP ─── */}
      <section id="value-strip" className="bg-secondary border-y border-border">
        <div className="max-w-lg mx-auto px-6 py-5 flex items-center justify-between gap-4 text-center">
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <Eye className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-foreground leading-tight">No ads.<br/>No popups</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-foreground leading-tight">Faster<br/>pages</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-foreground leading-tight">Finish without<br/>interruptions</span>
          </div>
        </div>
      </section>

      {/* ─── 3. COMPARISON ─── */}
      <ComparisonSection />

      {/* ─── 4. PRICING ─── */}
      <section id="pricing" className="bg-background py-14 sm:py-20">
        <div className="max-w-lg mx-auto px-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-8 text-center">
            One plan. No surprises.
          </h2>
          <PricingCard />
        </div>
      </section>

      {/* ─── 5. CONTEXT ─── */}
      <section className="relative py-28 sm:py-36 overflow-hidden">
        <img
          src={foundersImage}
          alt="Entrepreneur pitching on stage under dramatic spotlight"
          loading="lazy"
          width={1280}
          height={640}
          className="absolute inset-0 w-full h-full object-cover object-[center_20%] pointer-events-none"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative max-w-lg mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white mb-4">
            Built for readers who actually finish the story
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            Shark Tank stories aren't meant to be skimmed.
            You're here for the pitch, the deal, the outcome.
            Ads break that flow. Ad-free keeps you in it.
          </p>
        </div>
      </section>

      {/* ─── 6. FINAL CTA ─── */}
      <section className="bg-secondary border-t border-border py-14 sm:py-16">
        <div className="max-w-lg mx-auto px-6 text-center">
          <p className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-6">
            You've read this far — now read without interruptions.
          </p>
          <button onClick={goToPayment} className="cta-button">
            Go ad-free — $0.05/day
          </button>
        </div>
      </section>

      {/* ─── 7. STICKY CTA BAR ─── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border transition-transform duration-300 ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-muted-foreground line-through">$25</span>
            <span className="text-sm font-semibold text-foreground">$20<span className="text-muted-foreground font-normal">/year</span></span>
          </div>
          <button onClick={goToPayment} className="cta-button !py-2.5 !px-5 !text-sm !rounded-lg">
            Read Without Ads
          </button>
        </div>
      </div>

      {/* Bottom spacer for sticky bar */}
      <div className="h-16" />
    </div>
  );
};

/* ─── PRICING CARD ─── */
const PricingCard = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl shadow-black/[0.04]">
      <div className="text-center space-y-5">
        <h3 className="text-xl font-semibold text-foreground">Ad-Free Access</h3>

        {/* Price with strikethrough */}
        <div>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-2xl text-muted-foreground line-through font-medium">$25</span>
            <span className="text-5xl sm:text-6xl font-bold text-foreground tracking-tight">$20</span>
            <span className="text-lg text-muted-foreground">/ year</span>
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
            Today only — save $5
          </div>
        </div>

        {/* Benefits */}
        <ul className="text-left space-y-3 max-w-xs mx-auto pt-2">
          {[
            "Every article, no interruptions",
            "No banners, popups, or video ads",
            "Faster, lighter pages",
          ].map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
              <span className="text-sm text-foreground/80">{b}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => navigate("/payment?amount=20&frequency=yearly")}
          className="w-full py-4 rounded-xl text-base font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 shadow-lg mt-2"
        >
          Read Without Ads
        </button>

        <p className="text-xs text-muted-foreground">
          Cancel anytime. Takes seconds.
        </p>
      </div>
    </div>
  );
};

export default Index;

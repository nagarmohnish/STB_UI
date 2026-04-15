import { Button } from "@/components/ui/button";

import heroBg from "@/assets/hero-bg.jpg";
import comparisonImg from "@/assets/comparison.jpg";
import aircraftImg from "@/assets/final-aircraft.jpg";
import { useEffect, useState } from "react";

const CTA_COLOR = "#bb361b";

const goToPayment = () => {
  window.location.hash = "#/payment";
};

/* ─── VAN Site Header (matches homepage exactly) ─── */
const VANHeader = () => (
  <div dangerouslySetInnerHTML={{ __html: `
  <link rel="stylesheet" href="../../assets/css/style.css">
  <header class="site-header">
    <div class="container header-top">
      <div class="social-icons">
        <a href="#"><i class="fab fa-facebook-f"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-youtube"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
      </div>
      <div class="site-logo">
        <a href="../../index.html">
          <img src="../../assets/van-logo.png" alt="Vintage Aviation News" style="height:90px;">
        </a>
      </div>
      <div class="header-search">
        <input type="text" placeholder="Search Headlines, News...">
        <button><i class="fas fa-arrow-circle-right"></i></button>
      </div>
    </div>
  </header>
  <nav class="main-nav">
    <div class="container">
      <ul class="nav-list">
        <li><a href="../../index.html">Home</a></li>
        <li><a href="../../pages/restorations.html">Restorations</a></li>
        <li><a href="../../pages/warbirds-news.html">Warbirds News</a></li>
        <li><a href="../../pages/vintage.html">Vintage</a></li>
        <li><a href="../../pages/articles.html">Articles</a></li>
        <li><a href="../../pages/museum-news.html">Aviation Museum News</a></li>
        <li><a href="#">Sponsors</a></li>
        <li><a href="../../go-ad-free/" style="background:#bb361b;color:#fff;padding:6px 16px;border-radius:4px;font-weight:700;font-size:13px">Go Ad-Free</a></li>
      </ul>
    </div>
  </nav>
  `}} />
);

/* ─── VAN Site Footer (matches homepage exactly) ─── */
const VANFooter = () => (
  <div dangerouslySetInnerHTML={{ __html: `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top-row">
        <div class="footer-brand">
          <div class="footer-logo">
            <div class="logo-text" style="width:70px;height:70px;">
              <span class="vintage" style="font-size:7px;">Vintage</span>
              <span class="aviation" style="font-size:16px;">Aviation</span>
              <span class="news" style="font-size:8px;">News</span>
            </div>
          </div>
        </div>
        <div class="footer-social">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-youtube"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
      <div class="footer-grid">
        <div class="footer-brand">
          <p><em>Vintage Aviation News is a company founded by a group of passionate aviation enthusiasts who love the history and technology Aviation and Flying Museums preserve for the public. It is our intention to play a role in safeguarding the heritage of these beautiful machines by providing increased awareness and education through the use of internet based digital media.</em></p>
        </div>
        <div class="footer-links">
          <ul>
            <li><a href="../../index.html">Home</a></li>
            <li><a href="../../pages/restorations.html">Restorations</a></li>
            <li><a href="../../pages/vintage.html">Vintage Aviation</a></li>
            <li><a href="../../pages/museum-news.html">Aviation Museum News</a></li>
            <li><a href="../../pages/articles.html">Articles</a></li>
            <li><a href="#">Today in Aviation History</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Newsletter</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="../../pages/contact.html">Contact Us</a></li>
            <li><a href="#">Ethics-Policy</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  `}} />
);

/* ─── Sticky Bottom CTA (Mobile) ─── */
const StickyBottomCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-50 bg-background/95 backdrop-blur border-t border-border transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-sm font-serif font-semibold text-foreground">
          <span className="line-through opacity-60 font-normal">$3</span>{" "}
          <span>$2</span><span className="text-muted-foreground font-sans font-normal">/month</span>
        </div>
        <button onClick={goToPayment} style={{padding:"8px 20px",background:CTA_COLOR,color:"#fff",border:"none",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
          Read Without Ads
        </button>
      </div>
    </div>
  );
};

/* ─── Sticky Header ─── */
const StickyHeader = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[200] bg-background/90 backdrop-blur border-b border-border transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        <span className="font-serif font-semibold text-foreground">Vintage Aviation News</span>
        <button onClick={goToPayment} style={{padding:"8px 20px",background:CTA_COLOR,color:"#fff",border:"none",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
          Read Without Ads
        </button>
      </div>
    </header>
  );
};

/* ─── Hero ─── */
const Hero = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
    <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-24">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-semibold leading-tight text-foreground">
          The stories deserve your full&nbsp;attention.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
          No ads. No popups. Just aviation, uninterrupted.
        </p>
        <div className="space-y-2">
          <button onClick={goToPayment} style={{padding:"16px 40px",background:CTA_COLOR,color:"#fff",border:"none",borderRadius:10,fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif",boxShadow:"0 4px 16px rgba(187,54,27,0.3)"}}>
            Read Without Ads
          </button>
          <p className="text-sm text-muted-foreground">
            <span className="line-through opacity-60">$3/month</span>{" "}
            <span className="font-semibold text-foreground">$2/month — today only.</span>{" "}
            Cancel anytime.
          </p>
        </div>
      </div>
      <div className="hidden md:block" />
    </div>
  </section>
);

/* ─── Emotional Connection ─── */
const WhyWeExist = () => (
  <section className="py-16 md:py-24">
    <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
      <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
        Built for the readers who never left
      </h2>
      <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-serif italic">
        You don't come here to scroll. You come for the vintage stories — the warbirds, the restorations, the legacy behind every aircraft. These aren't quick reads. They take time and attention. Ads break that rhythm. Ad-free lets you stay with the story, start to finish.
      </p>
    </div>
  </section>
);

/* ─── Before / After Comparison ─── */
const Comparison = () => (
  <section className="py-16 md:py-24 bg-secondary/40">
    <div className="max-w-6xl mx-auto px-2 md:px-6 space-y-4 md:space-y-6">
      <div className="text-center space-y-3 px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
          The difference is immediate
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Same article. Same content. One lets you actually read it.
        </p>
      </div>
      <img src={comparisonImg} alt="Side-by-side: ad-filled article vs clean ad-free version" className="rounded-lg shadow-xl w-full mx-auto" loading="lazy" width={1024} height={640} style={{ objectFit: 'cover' }} />
      <div className="grid grid-cols-2 gap-4 md:gap-8 px-4 pt-2">
        <div className="space-y-3">
          <p className="font-serif font-semibold text-destructive text-sm md:text-base">With Ads</p>
          <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
            {["Broken reading flow", "Slower pages", "Constant distractions"].map((t) => (
              <li key={t} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <p className="font-serif font-semibold text-accent text-sm md:text-base">Ad-Free</p>
          <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
            {["Uninterrupted reading", "Faster load times", "Full focus on the story"].map((t) => (
              <li key={t} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Pricing ─── */
const Pricing = () => (
  <section id="pricing" className="py-24">
    <div className="max-w-lg mx-auto px-6 text-center space-y-8">
      <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">One plan. No surprises.</h2>
      <div className="bg-card rounded-lg shadow-lg p-10 space-y-6 border border-border">
        <p className="text-sm font-medium uppercase tracking-wide" style={{color:CTA_COLOR}}>Today only</p>
        <p className="text-lg font-serif font-medium text-foreground">Ad-Free Access</p>
        <div>
          <span className="text-2xl font-serif text-muted-foreground line-through opacity-60">$3</span>
          <span className="text-5xl font-serif font-bold text-foreground ml-2">$2</span>
          <span className="text-muted-foreground ml-1">/ month</span>
        </div>
        <p className="text-sm text-muted-foreground">That's less than $0.50/week. Cancel anytime.</p>
        <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-xs mx-auto">
          {["Every article, no interruptions","No banners, popups, or video ads","Faster, lighter pages"].map((item) => (
            <li key={item} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent shrink-0" />{item}</li>
          ))}
        </ul>
        <button onClick={goToPayment} style={{width:"100%",padding:"16px",background:CTA_COLOR,color:"#fff",border:"none",borderRadius:10,fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
          Read Without Ads
        </button>
        <p className="text-xs text-muted-foreground">Cancel anytime. Takes seconds.</p>
      </div>
    </div>
  </section>
);

/* ─── End-of-Page CTA ─── */
const EndCTA = () => (
  <section className="relative py-28">
    <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${aircraftImg})` }} />
    <div className="relative max-w-2xl mx-auto px-6 text-center space-y-6">
      <p className="text-xl font-serif text-foreground leading-relaxed">
        You've read this far — now read every article without interruptions.
      </p>
      <button onClick={goToPayment} style={{padding:"16px 40px",background:CTA_COLOR,color:"#fff",border:"none",borderRadius:10,fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif",boxShadow:"0 4px 16px rgba(187,54,27,0.3)"}}>
        Read Without Ads — less than $0.50/week
      </button>
      <p className="text-sm text-muted-foreground">Cancel anytime. Takes seconds.</p>
    </div>
  </section>
);

/* ─── Page ─── */
const Index = () => (
  <>
    <VANHeader />
    <StickyHeader />
    <StickyBottomCTA />
    <Hero />
    <Comparison />
    <Pricing />
    <WhyWeExist />
    <EndCTA />
    <VANFooter />
  </>
);

export default Index;

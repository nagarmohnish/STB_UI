import heroBg from "@/assets/hero-bg.jpg";
import comparisonImg from "@/assets/comparison.jpg";
import aircraftImg from "@/assets/final-aircraft.jpg";
import { useEffect, useState } from "react";

const CTA_COLOR = "#bb361b";
const CTA_HOVER = "#9e2e17";
const LOGO_URL = "/LH2_Assets_UI/vintage-aviation-news/assets/van-logo.png";
const BASE = "/LH2_Assets_UI/vintage-aviation-news/";

const goToPayment = () => { window.location.hash = "#/payment"; };

/* ─── VAN Site Header ─── */
const VANHeader = () => (
  <>
    <div style={{background:"#fff",borderBottom:"1px solid #e0e0e0"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",gap:14,alignItems:"center"}}>
          {["facebook-f","twitter","youtube","instagram"].map(i=>(
            <a key={i} href="#" style={{color:"#777",fontSize:15,textDecoration:"none"}}><i className={`fab fa-${i}`}/></a>
          ))}
        </div>
        <a href={BASE+"index.html"} style={{textDecoration:"none"}}>
          <img src={LOGO_URL} alt="Vintage Aviation News" style={{height:80}} />
        </a>
        <div style={{display:"flex",alignItems:"center",border:"1px solid #ddd",borderRadius:20,padding:"7px 16px",gap:8}}>
          <input type="text" placeholder="Search Headlines, News..." style={{border:"none",outline:"none",fontSize:13,width:180,fontFamily:"Inter,sans-serif",background:"transparent"}} />
          <i className="fas fa-arrow-circle-right" style={{color:"#aaa",fontSize:15,cursor:"pointer"}}/>
        </div>
      </div>
    </div>
    <nav style={{background:"#fff",borderBottom:"2px solid #eee",position:"sticky",top:0,zIndex:100}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap"}}>
        {[
          {label:"Home",href:BASE+"index.html"},
          {label:"Restorations",href:BASE+"pages/restorations.html"},
          {label:"Warbirds News",href:BASE+"pages/warbirds-news.html"},
          {label:"Vintage",href:BASE+"pages/vintage.html"},
          {label:"Articles",href:BASE+"pages/articles.html"},
          {label:"Aviation Museum News",href:BASE+"pages/museum-news.html"},
          {label:"Sponsors",href:"#"},
        ].map(item=>(
          <a key={item.label} href={item.href} style={{padding:"14px 16px",fontSize:14,fontWeight:600,color:"#333",textDecoration:"none",fontFamily:"Inter,sans-serif",whiteSpace:"nowrap"}}>{item.label}</a>
        ))}
        <a href={BASE+"go-ad-free/"} style={{padding:"8px 18px",fontSize:13,fontWeight:700,color:"#fff",background:CTA_COLOR,borderRadius:4,textDecoration:"none",marginLeft:4,fontFamily:"Inter,sans-serif"}}>Go Ad-Free</a>
      </div>
    </nav>
  </>
);

/* ─── VAN Site Footer ─── */
const VANFooter = () => (
  <footer style={{background:"#1a1a1a",color:"#ccc",padding:"48px 0 32px",fontFamily:"Inter,sans-serif"}}>
    <div style={{maxWidth:1280,margin:"0 auto",padding:"0 20px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28,paddingBottom:24,borderBottom:"1px solid #333",flexWrap:"wrap",gap:16}}>
        <a href={BASE+"index.html"} style={{textDecoration:"none"}}>
          <img src={LOGO_URL} alt="Vintage Aviation News" style={{height:60,opacity:0.9}} />
        </a>
        <div style={{display:"flex",gap:12}}>
          {["facebook-f","twitter","youtube","instagram"].map(icon=>(
            <a key={icon} href="#" style={{width:36,height:36,borderRadius:"50%",border:"1px solid #555",display:"flex",alignItems:"center",justifyContent:"center",color:"#aaa",fontSize:14,textDecoration:"none"}}><i className={`fab fa-${icon}`}/></a>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:40}}>
        <p style={{fontSize:13,lineHeight:1.7,color:"#888",fontStyle:"italic"}}>Vintage Aviation News is a company founded by a group of passionate aviation enthusiasts who love the history and technology Aviation and Flying Museums preserve for the public. It is our intention to play a role in safeguarding the heritage of these beautiful machines by providing increased awareness and education through the use of internet based digital media.</p>
        <div style={{display:"flex",flexDirection:"column" as const,gap:10}}>
          {[["Home",BASE+"index.html"],["Restorations",BASE+"pages/restorations.html"],["Vintage Aviation",BASE+"pages/vintage.html"],["Aviation Museum News",BASE+"pages/museum-news.html"],["Articles",BASE+"pages/articles.html"],["Today in Aviation History","#"]].map(([l,h])=>(
            <a key={l} href={h} style={{color:"#999",fontSize:13,textDecoration:"none"}}>{l}</a>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column" as const,gap:10}}>
          {["Privacy Policy","Terms of Service","Newsletter","About Us","Contact Us","Login","Ethics-Policy"].map(l=>(
            <a key={l} href="#" style={{color:"#999",fontSize:13,textDecoration:"none"}}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

/* ─── Sticky Bottom CTA ─── */
const StickyBottomCTA = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`fixed bottom-0 inset-x-0 z-50 bg-background/95 backdrop-blur border-t border-border transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}>
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-sm font-serif font-semibold text-foreground">
          <span className="line-through opacity-60 font-normal">$3</span>{" "}
          <span>$2</span><span className="text-muted-foreground font-sans font-normal">/month</span>
        </div>
        <button onClick={goToPayment} style={{padding:"8px 20px",background:CTA_COLOR,color:"#fff",border:"none",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>Read Without Ads</button>
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
    <header className={`fixed top-0 inset-x-0 z-[200] bg-background/90 backdrop-blur border-b border-border transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        <span className="font-serif font-semibold text-foreground">Vintage Aviation News</span>
        <button onClick={goToPayment} style={{padding:"8px 20px",background:CTA_COLOR,color:"#fff",border:"none",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>Read Without Ads</button>
      </div>
    </header>
  );
};

/* ─── Hero ─── */
const Hero = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
    <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-24">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-semibold leading-tight text-foreground">The stories deserve your full&nbsp;attention.</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-md">No ads. No popups. Just aviation, uninterrupted.</p>
        <div className="space-y-2">
          <button onClick={goToPayment} style={{padding:"16px 40px",background:CTA_COLOR,color:"#fff",border:"none",borderRadius:10,fontSize:16,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(187,54,27,0.3)"}}>Read Without Ads</button>
          <p className="text-sm text-muted-foreground">
            <span className="line-through opacity-60">$3/month</span>{" "}
            <span className="font-semibold text-foreground">$2/month — today only.</span> Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Why We Exist ─── */
const WhyWeExist = () => (
  <section className="py-16 md:py-24">
    <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
      <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">Built for the readers who never left</h2>
      <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-serif italic">
        You don't come here to scroll. You come for the vintage stories — the warbirds, the restorations, the legacy behind every aircraft. Ads break that rhythm. Ad-free lets you stay with the story, start to finish.
      </p>
    </div>
  </section>
);

/* ─── Comparison ─── */
const Comparison = () => (
  <section className="py-16 md:py-24 bg-secondary/40">
    <div className="max-w-6xl mx-auto px-2 md:px-6 space-y-4 md:space-y-6">
      <div className="text-center space-y-3 px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">The difference is immediate</h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">Same article. Same content. One lets you actually read it.</p>
      </div>
      <img src={comparisonImg} alt="With ads vs ad-free" className="rounded-lg shadow-xl w-full mx-auto" loading="lazy" style={{objectFit:"cover"}} />
      <div className="grid grid-cols-2 gap-4 md:gap-8 px-4 pt-2">
        <div className="space-y-3">
          <p className="font-serif font-semibold text-destructive text-sm md:text-base">With Ads</p>
          <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
            {["Broken reading flow","Slower pages","Constant distractions"].map(t=>(<li key={t} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive shrink-0"/>{t}</li>))}
          </ul>
        </div>
        <div className="space-y-3">
          <p className="font-serif font-semibold text-accent text-sm md:text-base">Ad-Free</p>
          <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
            {["Uninterrupted reading","Faster load times","Full focus on the story"].map(t=>(<li key={t} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0"/>{t}</li>))}
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
        <p className="text-sm text-muted-foreground">Just $2/month. Cancel anytime.</p>
        <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-xs mx-auto">
          {["Every article, no interruptions","No banners, popups, or video ads","Faster, lighter pages"].map(item=>(<li key={item} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent shrink-0"/>{item}</li>))}
        </ul>
        <button onClick={goToPayment} style={{width:"100%",padding:"16px",background:CTA_COLOR,color:"#fff",border:"none",borderRadius:10,fontSize:16,fontWeight:700,cursor:"pointer"}}>Read Without Ads</button>
        <p className="text-xs text-muted-foreground">Cancel anytime. Takes seconds.</p>
      </div>
    </div>
  </section>
);

/* ─── End CTA ─── */
const EndCTA = () => (
  <section className="relative py-28">
    <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage:`url(${aircraftImg})`}} />
    <div className="relative max-w-2xl mx-auto px-6 text-center space-y-6">
      <p className="text-xl font-serif text-foreground leading-relaxed">You've read this far — now read every article without interruptions.</p>
      <button onClick={goToPayment} style={{padding:"16px 40px",background:CTA_COLOR,color:"#fff",border:"none",borderRadius:10,fontSize:16,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(187,54,27,0.3)"}}>Read Without Ads — $2/month</button>
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

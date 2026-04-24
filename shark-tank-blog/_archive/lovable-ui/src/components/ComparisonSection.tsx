const ComparisonSection = () => (
  <section className="bg-secondary py-14 sm:py-20 border-y border-border">
    <div className="max-w-lg mx-auto px-5">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-3">
          The difference is immediate
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Same article. Same content. One lets you actually read it.
        </p>
      </div>

      {/* Side-by-side mockups */}
      <div className="grid grid-cols-2 gap-3 items-stretch">
        {/* WITH ADS */}
        <div className="flex flex-col">
          <p className="text-xs font-semibold text-muted-foreground text-center mb-2 uppercase tracking-wider">With Ads</p>
          <div className="rounded-lg border border-border bg-white overflow-hidden shadow-sm flex-1">
            <AdMockup />
          </div>
        </div>
        {/* AD-FREE */}
        <div className="flex flex-col">
          <p className="text-xs font-semibold text-muted-foreground text-center mb-2 uppercase tracking-wider">Ad-Free</p>
          <div className="rounded-lg border border-border bg-white overflow-hidden shadow-sm flex-1">
            <CleanMockup />
          </div>
        </div>
      </div>

      {/* Comparison bullets */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <p className="text-sm font-semibold text-destructive mb-2">With Ads</p>
          <div className="space-y-2">
            {["Broken reading flow", "Slower pages", "Constant distractions"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-destructive flex-shrink-0" />
                <span className="text-xs text-muted-foreground">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-600 mb-2">Ad-Free</p>
          <div className="space-y-2">
            {["Uninterrupted reading", "Faster load times", "Full focus on the story"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <span className="text-xs text-foreground">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── Mockup: SharkTankBlog article WITH ads ── */
const AdMockup = () => (
  <div className="text-[5px] leading-[1.4] p-2 space-y-1.5">
    {/* Nav */}
    <div className="flex items-center justify-between pb-1 border-b border-gray-100">
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-sky-100" />
        <span className="font-bold text-[5px] text-gray-700">The Shark Tank Blog</span>
      </div>
      <div className="flex gap-1">
        <div className="h-1 w-4 bg-gray-200 rounded" />
        <div className="h-1 w-4 bg-gray-200 rounded" />
      </div>
    </div>

    {/* Title */}
    <p className="font-bold text-[6.5px] text-gray-800 leading-tight">Shark Tank Season 17 Episode 13</p>

    {/* Author line */}
    <div className="flex items-center gap-1">
      <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
      <span className="text-gray-400 text-[4px]">By Author · Mar 2026</span>
    </div>

    {/* Hero image placeholder */}
    <div className="w-full h-10 bg-gradient-to-br from-sky-50 to-indigo-50 rounded flex items-center justify-center">
      <div className="w-4 h-3 bg-sky-200/60 rounded" />
    </div>

    {/* Body text */}
    <div className="space-y-0.5">
      <div className="h-[2px] w-full bg-gray-200/60 rounded" />
      <div className="h-[2px] w-[90%] bg-gray-200/60 rounded" />
    </div>

    {/* ═══ BANNER AD ═══ */}
    <div className="border border-blue-200 rounded bg-gradient-to-r from-blue-50 to-cyan-50 p-1.5 flex items-center gap-1.5">
      <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-400 to-cyan-400 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="h-[2px] w-3/4 bg-gray-400/20 rounded mb-1" />
        <div className="h-3 w-10 bg-blue-500 rounded text-[4px] text-white font-bold flex items-center justify-center leading-none">Shop Now</div>
      </div>
      <span className="text-[3px] text-gray-300 self-start">Ad</span>
    </div>

    {/* Body continues */}
    <div className="space-y-0.5">
      <div className="h-[2px] w-full bg-gray-200/60 rounded" />
      <div className="h-[2px] w-[80%] bg-gray-200/60 rounded" />
      <div className="h-[2px] w-[70%] bg-gray-200/60 rounded" />
    </div>

    {/* ═══ VIDEO AD ═══ */}
    <div className="relative w-full h-9 bg-gradient-to-br from-rose-100 via-orange-50 to-amber-100 rounded flex items-center justify-center border border-gray-200">
      <div className="w-4 h-4 rounded-full bg-white/80 flex items-center justify-center shadow">
        <div className="w-0 h-0 border-l-[4px] border-l-gray-500 border-y-[2.5px] border-y-transparent ml-0.5" />
      </div>
      <span className="absolute top-0.5 right-0.5 bg-black/60 text-[3px] text-white font-bold px-1 rounded">Ad · 0:30</span>
      <span className="absolute top-0.5 left-0.5 bg-yellow-400 text-[3px] text-black font-bold px-1 rounded">Skip ▸</span>
    </div>

    {/* More body */}
    <div className="space-y-0.5">
      <div className="h-[2px] w-full bg-gray-200/60 rounded" />
      <div className="h-[2px] w-[85%] bg-gray-200/60 rounded" />
    </div>

    {/* ═══ NATIVE AD ═══ */}
    <div className="bg-amber-50 border border-amber-200/50 rounded p-1">
      <span className="text-[3px] text-amber-500 font-bold uppercase">Sponsored</span>
      <div className="flex gap-1 mt-0.5">
        <div className="w-5 h-4 bg-gradient-to-br from-amber-200 to-orange-200 rounded flex-shrink-0" />
        <div className="space-y-0.5 flex-1">
          <div className="h-[2px] w-full bg-gray-300/40 rounded" />
          <div className="h-[2px] w-3/4 bg-gray-300/40 rounded" />
        </div>
      </div>
    </div>

    {/* Sidebar ad peek */}
    <div className="border border-green-200 rounded p-1 bg-green-50/50">
      <span className="text-[3px] text-green-600 font-bold">Special Offer!</span>
      <div className="h-[2px] w-2/3 bg-gray-300/30 rounded mt-0.5" />
    </div>
  </div>
);

/* ── Mockup: SharkTankBlog article CLEAN ── */
const CleanMockup = () => (
  <div className="text-[5px] leading-[1.4] p-2 space-y-1.5 h-full">
    {/* Nav */}
    <div className="flex items-center justify-between pb-1 border-b border-gray-100">
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-sky-100" />
        <span className="font-bold text-[5px] text-gray-700">The Shark Tank Blog</span>
      </div>
      <div className="flex gap-1">
        <div className="h-1 w-4 bg-gray-100 rounded" />
        <div className="h-1 w-4 bg-gray-100 rounded" />
      </div>
    </div>

    {/* Title */}
    <p className="font-bold text-[6.5px] text-gray-800 leading-tight">Shark Tank Season 17 Episode 13</p>

    {/* Author line */}
    <div className="flex items-center gap-1">
      <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
      <span className="text-gray-400 text-[4px]">By Author · Mar 2026</span>
    </div>

    {/* Hero image placeholder */}
    <div className="w-full h-10 bg-gradient-to-br from-sky-50 to-indigo-50 rounded flex items-center justify-center">
      <div className="w-4 h-3 bg-sky-200/60 rounded" />
    </div>

    {/* Clean uninterrupted paragraphs */}
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="space-y-0.5">
        <div className="h-[2px] bg-gray-200/50 rounded" style={{ width: `${85 + Math.sin(i * 2) * 12}%` }} />
        <div className="h-[2px] bg-gray-200/50 rounded" style={{ width: `${78 + Math.cos(i * 3) * 15}%` }} />
        <div className="h-[2px] bg-gray-200/50 rounded" style={{ width: `${70 + Math.sin(i) * 18}%` }} />
      </div>
    ))}

    {/* Inline image */}
    <div className="w-full h-8 bg-gradient-to-br from-indigo-50 to-sky-50 rounded flex items-center justify-center">
      <div className="w-3 h-2.5 bg-sky-200/60 rounded" />
    </div>

    {/* More paragraphs */}
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={`b${i}`} className="space-y-0.5">
        <div className="h-[2px] bg-gray-200/50 rounded" style={{ width: `${80 + Math.cos(i * 2) * 14}%` }} />
        <div className="h-[2px] bg-gray-200/50 rounded" style={{ width: `${75 + Math.sin(i * 3) * 12}%` }} />
        <div className="h-[2px] bg-gray-200/50 rounded" style={{ width: `${68 + Math.cos(i) * 16}%` }} />
      </div>
    ))}

    {/* Subheading */}
    <div className="h-[3px] w-[60%] bg-gray-300/40 rounded" />

    {/* Final paragraphs */}
    {Array.from({ length: 2 }).map((_, i) => (
      <div key={`c${i}`} className="space-y-0.5">
        <div className="h-[2px] bg-gray-200/50 rounded" style={{ width: `${82 + Math.sin(i) * 10}%` }} />
        <div className="h-[2px] bg-gray-200/50 rounded" style={{ width: `${72 + Math.cos(i) * 14}%` }} />
      </div>
    ))}
  </div>
);

export default ComparisonSection;

import { useState, useRef, useCallback } from "react";

const ComparisonSlider = () => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePos(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePos(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/4] sm:aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl shadow-black/10 border border-border"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* LEFT: Cluttered with ads */}
      <div className="absolute inset-0 bg-white">
        <ClutteredArticle />
      </div>

      {/* RIGHT: Clean ad-free */}
      <div
        className="absolute inset-0 bg-white"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <CleanArticle />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-foreground/20 pointer-events-none z-30"
        style={{ left: `${pos}%` }}
      >
        {/* Drag handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xl ring-2 ring-foreground/10">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 3L2 8L5 13M11 3L14 8L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/50"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

/* ── WITH ADS: chaotic, interrupted reading ── */
const ClutteredArticle = () => (
  <div className="h-full flex flex-col overflow-hidden bg-stone-50">
    {/* Nav bar */}
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-white flex-shrink-0">
      <div className="h-2.5 w-20 bg-gray-300 rounded" />
      <div className="flex gap-2">
        <div className="h-2 w-8 bg-gray-200 rounded" />
        <div className="h-2 w-8 bg-gray-200 rounded" />
      </div>
    </div>

    <div className="flex-1 overflow-hidden px-3.5 sm:px-5 pt-3 pb-3">
      {/* Article meta */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0" />
        <div className="h-1.5 w-20 bg-gray-200 rounded" />
      </div>

      {/* Title */}
      <div className="h-3.5 w-[85%] bg-gray-700/15 rounded mb-1" />
      <div className="h-3.5 w-[60%] bg-gray-700/15 rounded mb-2.5" />

      {/* 1 line of body */}
      <div className="h-1.5 w-full bg-gray-400/10 rounded mb-1" />
      <div className="h-1.5 w-[90%] bg-gray-400/10 rounded mb-2.5" />

      {/* ═══ LEADERBOARD BANNER AD ═══ */}
      <div className="flex-shrink-0 rounded-md border border-blue-200 overflow-hidden mb-2.5 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="flex items-center gap-2 p-2">
          <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-400 to-cyan-400 flex-shrink-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-sm bg-white/40" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-1.5 w-3/4 bg-gray-600/10 rounded mb-1" />
            <div className="h-4 w-14 bg-blue-500 rounded text-[6px] text-white font-bold flex items-center justify-center">Shop Now</div>
          </div>
        </div>
        <div className="px-2 pb-0.5 flex justify-between items-center">
          <span className="text-[6px] text-gray-300 uppercase tracking-wider">Sponsored</span>
          <span className="text-[6px] text-gray-300">✕</span>
        </div>
      </div>

      {/* Body continues */}
      <div className="h-1.5 w-full bg-gray-400/10 rounded mb-1" />
      <div className="h-1.5 w-[85%] bg-gray-400/10 rounded mb-1" />
      <div className="h-1.5 w-[70%] bg-gray-400/10 rounded mb-2.5" />

      {/* ═══ FULL-WIDTH VIDEO AD ═══ */}
      <div className="flex-shrink-0 rounded-md border border-gray-200 overflow-hidden mb-2.5">
        <div className="relative h-20 sm:h-28 bg-gradient-to-br from-rose-100 via-orange-50 to-amber-100 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow">
            <div className="w-0 h-0 border-l-[8px] border-l-gray-500 border-y-[5px] border-y-transparent ml-0.5" />
          </div>
          <div className="absolute top-1.5 right-1.5 bg-black/60 text-[6px] text-white font-bold px-1.5 py-0.5 rounded">Ad · 0:30</div>
          <div className="absolute top-1.5 left-1.5 bg-yellow-400 text-[6px] text-black font-bold px-1.5 py-0.5 rounded">Skip in 5s ▸</div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200"><div className="h-full w-1/4 bg-red-400" /></div>
        </div>
      </div>

      {/* Body continues */}
      <div className="h-1.5 w-full bg-gray-400/10 rounded mb-1" />
      <div className="h-1.5 w-[78%] bg-gray-400/10 rounded mb-2.5" />

      {/* ═══ NATIVE IN-FEED AD ═══ */}
      <div className="flex-shrink-0 bg-amber-50/80 border border-amber-200/60 rounded-md p-2 mb-2">
        <span className="text-[6px] text-amber-500 font-bold uppercase tracking-wider">Promoted</span>
        <div className="flex gap-2 mt-1">
          <div className="w-12 h-10 bg-gradient-to-br from-amber-200 to-orange-200 rounded flex-shrink-0" />
          <div className="flex-1">
            <div className="h-1.5 w-full bg-gray-600/10 rounded mb-1" />
            <div className="h-1.5 w-3/4 bg-gray-400/8 rounded" />
          </div>
        </div>
      </div>

      {/* More body squeezed in */}
      <div className="h-1.5 w-full bg-gray-400/10 rounded mb-1" />
      <div className="h-1.5 w-[65%] bg-gray-400/10 rounded" />
    </div>
  </div>
);

/* ── AD-FREE: clean, focused, spacious ── */
const CleanArticle = () => (
  <div className="h-full flex flex-col overflow-hidden bg-white">
    {/* Same nav */}
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-white flex-shrink-0">
      <div className="h-2.5 w-20 bg-gray-200 rounded" />
      <div className="flex gap-2">
        <div className="h-2 w-8 bg-gray-100 rounded" />
        <div className="h-2 w-8 bg-gray-100 rounded" />
      </div>
    </div>

    <div className="flex-1 overflow-hidden px-5 sm:px-8 pt-5 pb-3">
      {/* Article meta */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0" />
        <div className="h-1.5 w-20 bg-gray-200 rounded" />
      </div>

      {/* Title */}
      <div className="h-3.5 w-[85%] bg-gray-700/15 rounded mb-1" />
      <div className="h-3.5 w-[60%] bg-gray-700/15 rounded mb-2" />
      <div className="h-0.5 w-8 bg-orange-400/30 rounded mb-5" />

      {/* Clean uninterrupted paragraphs */}
      {Array.from({ length: 8 }).map((_, block) => (
        <div key={block} className={block < 7 ? "mb-4" : ""}>
          {Array.from({ length: 3 }).map((_, line) => (
            <div
              key={line}
              className="h-1.5 bg-gray-400/8 rounded mb-[4px]"
              style={{ width: `${82 + Math.sin((block * 3 + line) * 1.7) * 16}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default ComparisonSlider;

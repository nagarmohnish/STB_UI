import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Shield, Gift, ArrowLeft } from "lucide-react";

type Frequency = "monthly" | "quarterly" | "half-yearly" | "yearly" | "one-time";

const FREQUENCY_LABELS: Record<Frequency, string> = {
  monthly: "every month",
  quarterly: "every quarter",
  "half-yearly": "every 6 months",
  yearly: "every year",
  "one-time": "",
};

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const amount = parseInt(searchParams.get("amount") || "25", 10);
  const frequency = (searchParams.get("frequency") || "quarterly") as Frequency;

  const [showContent, setShowContent] = useState(false);
  const isRecurring = frequency !== "one-time";

  const summaryText = isRecurring
    ? `$${amount} ${FREQUENCY_LABELS[frequency]}`
    : `$${amount} one-time`;

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background flex justify-center px-5 py-10 sm:py-16">
      <div className={`w-full max-w-sm space-y-6 transition-all duration-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm">
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div className="text-center space-y-3 pt-4">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Your {summaryText} support is confirmed. You're now ad-free.
          </p>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wide">Ad-Free Supporter</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3">
          <Gift className="h-3.5 w-3.5 text-primary shrink-0" />
          <p className="text-xs text-primary font-medium">
            Your ad-free experience is now active.
          </p>
        </div>

        {isRecurring && (
          <p className="text-center">
            <button className="text-[11px] text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors">
              Manage your support
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

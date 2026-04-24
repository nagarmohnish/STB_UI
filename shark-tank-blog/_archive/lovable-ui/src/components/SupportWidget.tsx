import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Gift, ChevronDown } from "lucide-react";

type Frequency = "monthly" | "quarterly" | "half-yearly" | "yearly";

const FREQUENCIES: { key: Frequency; label: string }[] = [
  { key: "yearly", label: "Annually" },
  { key: "half-yearly", label: "Half Yearly" },
  { key: "quarterly", label: "Quarterly" },
  { key: "monthly", label: "Monthly" },
];

const MONTHLY_MULTIPLIERS: Record<Frequency, number> = {
  monthly: 1, quarterly: 3, "half-yearly": 6, yearly: 12,
};

const PRESETS = [
  { value: 2, label: "$2", emphasis: "low" as const },
  { value: 5, label: "$5", emphasis: "high" as const, popular: true },
  { value: 9, label: "$9", emphasis: "medium" as const },
  { value: 15, label: "$15", emphasis: "medium" as const },
];

const TAGLINES: Record<number, string> = {
  2: "Ad-free only",
  5: "Keep us going ⭐",
  9: "Help it grow",
  15: "Keep it free for everyone",
};

function getDailyAmount(monthlyAmount: number): string {
  return `$${(monthlyAmount / 30).toFixed(2)}/day`;
}

export default function SupportWidget() {
  const navigate = useNavigate();
  const [frequency, setFrequency] = useState<Frequency>("yearly");
  const [monthlyAmount, setMonthlyAmount] = useState(3);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("3");

  const isValid = monthlyAmount >= 1.5;
  const totalBilled = monthlyAmount * MONTHLY_MULTIPLIERS[frequency];
  const tagline = selectedPreset ? TAGLINES[selectedPreset] : null;

  const handlePresetClick = (preset: typeof PRESETS[number]) => {
    setSelectedPreset(preset.value);
    setMonthlyAmount(preset.value);
    setInputValue(String(preset.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    setInputValue(raw);
    const num = parseFloat(raw);
    if (!isNaN(num) && num > 0) {
      setMonthlyAmount(num);
      const match = PRESETS.find((p) => p.value === num);
      setSelectedPreset(match ? match.value : null);
    } else {
      setMonthlyAmount(0);
      setSelectedPreset(null);
    }
  };

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="text-center space-y-1">
        <p className="text-foreground text-xl font-bold tracking-tight">
          Support Ad-Free
        </p>
        <p className="text-sm text-muted-foreground">
          Go ad-free and enjoy uninterrupted reading.
        </p>
      </div>

      {/* Main Price Display — editable */}
      <div className={`relative rounded-xl border-2 px-4 py-4 flex items-baseline gap-1 transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 ${
        !isValid && inputValue.length > 0 ? "border-destructive" : "border-border"
      }`}>
        <span className="text-2xl font-semibold text-foreground">$</span>
        <input
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={handleInputChange}
          style={{ width: `${Math.max(1, inputValue.length)}ch` }}
          className="text-3xl font-semibold bg-transparent text-foreground outline-none min-w-[1ch] max-w-[8ch]"
        />
        <span className="text-base text-muted-foreground">/ month</span>
        {isValid && (
          <span className="text-sm text-muted-foreground ml-auto self-center">
            {getDailyAmount(monthlyAmount)}
          </span>
        )}
      </div>

      {/* Tagline or validation */}
      {(!isValid && inputValue.length > 0) || tagline ? (
        <div className="flex items-center justify-center">
          {!isValid && inputValue.length > 0 ? (
            <p className="text-sm text-destructive">Minimum amount is $1.50 / month</p>
          ) : (
            <p className="text-xs font-medium text-muted-foreground animate-in fade-in-0 duration-200">
              {tagline}
            </p>
          )}
        </div>
      ) : null}

      {/* Preset Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {PRESETS.map((p) => (
          <button
            key={p.value}
            onClick={() => handlePresetClick(p)}
            className={`relative py-3.5 rounded-xl text-base font-semibold border-2 transition-all duration-150 ${
              selectedPreset === p.value
                ? "bg-primary/10 border-primary text-primary"
                : p.emphasis === "low"
                  ? "bg-card border-border text-muted-foreground hover:border-muted-foreground"
                  : p.emphasis === "high"
                    ? "bg-secondary border-border text-foreground hover:border-primary/40 ring-1 ring-primary/10"
                    : "bg-secondary border-border text-foreground hover:border-muted-foreground"
            }`}
          >
            {p.label}
            {p.popular && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-primary-foreground bg-primary px-1.5 py-0.5 rounded-full leading-none">
                Popular
              </span>
            )}
          </button>
        ))}
      </div>

      {/* CTA */}
      <button
        disabled={!isValid}
        onClick={() => navigate(`/payment?amount=${totalBilled}&frequency=${frequency}`)}
        className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all duration-200 ${
          isValid
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        Continue with ${monthlyAmount} / month
      </button>

      {/* Ad-free + Billing */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5">
          <Gift className="h-3 w-3 shrink-0 text-primary/70" />
          <p className="text-[11px] text-primary/70 font-medium">
            Includes <span className="font-bold">ad-free</span> experience
          </p>
        </div>
        <div className="relative">
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as Frequency)}
            className="appearance-none rounded-full border border-border bg-card pl-3 pr-7 py-1.5 text-[11px] font-medium text-muted-foreground outline-none transition-colors focus:border-primary cursor-pointer"
          >
            {FREQUENCIES.map((f) => {
              const total = monthlyAmount * MONTHLY_MULTIPLIERS[f.key];
              return (
                <option key={f.key} value={f.key}>
                  ${total.toFixed(total % 1 === 0 ? 0 : 2)} Billed {f.label}
                </option>
              );
            })}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {/* Trust strip */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-1 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 shrink-0" />
          <span>Secure payment</span>
        </div>
        <span className="text-border">·</span>
        <span>Cancel anytime</span>
      </div>
    </div>
  );
}

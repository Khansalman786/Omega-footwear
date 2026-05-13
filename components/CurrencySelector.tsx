import { useCurrency } from "@/context/CurrencyContext";

const CurrencySelector = () => {
  const { currency, currencies, setCurrency } = useCurrency();

  return (
    <select
      value={currency.code}
      onChange={(e) => setCurrency(e.target.value)}
      className="bg-transparent border border-primary-foreground/30 rounded-md px-2 py-1 text-xs text-primary-foreground focus:outline-none focus:border-copper cursor-pointer w-auto"
    >
      {currencies.map((c) => (
        <option key={c.code} value={c.code} className="text-foreground">
          {c.symbol} {c.code}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;

"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // relative to USD
}

const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.5 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 149.5 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.36 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.53 },
];

interface CurrencyContextType {
  currency: Currency;
  currencies: Currency[];
  setCurrency: (code: string) => void;
  formatPrice: (usdPrice: number) => string;
  convertPrice: (usdPrice: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES[0]);

  const setCurrency = useCallback((code: string) => {
    const found = CURRENCIES.find((c) => c.code === code);
    if (found) setCurrencyState(found);
  }, []);

  const convertPrice = useCallback(
    (usdPrice: number) => {
      return Math.round(usdPrice * currency.rate * 100) / 100;
    },
    [currency],
  );

  const formatPrice = useCallback(
    (usdPrice: number) => {
      const converted = convertPrice(usdPrice);
      return `${currency.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    },
    [currency, convertPrice],
  );

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencies: CURRENCIES,
        setCurrency,
        formatPrice,
        convertPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be inside CurrencyProvider");
  return ctx;
};

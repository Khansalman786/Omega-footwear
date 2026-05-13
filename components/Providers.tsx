"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { StoreProvider } from "@/context/StoreContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CurrencyProvider>
          <StoreProvider>
            <Toaster />
            <Sonner />
            {children}
          </StoreProvider>
        </CurrencyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

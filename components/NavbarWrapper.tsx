"use client";

import { Suspense } from "react";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  return (
    <Suspense fallback={<div className="h-16 bg-background border-b" />}>
      <Navbar />
    </Suspense>
  );
}

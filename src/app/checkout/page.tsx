"use client";

import { Suspense } from "react";
import CheckoutContent from "./CheckoutContent.tsx";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<>Carregando...</>}>
      <CheckoutContent />
    </Suspense>
  );
}

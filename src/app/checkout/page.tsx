"use client";

import { Suspense } from "react";
import CheckoutContent from "@/app/checkout/CheckoutContent";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<>Carregando...</>}>
      <CheckoutContent />
    </Suspense>
  );
}

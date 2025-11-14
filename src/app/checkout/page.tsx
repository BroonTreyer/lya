"use client";

import { Suspense } from "react";
import CheckoutContent from "./checkoutcontent";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<>Carregando...</>}>
      <CheckoutContent />
    </Suspense>
  );
}

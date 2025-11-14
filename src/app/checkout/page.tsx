"use client"

import { Suspense } from "react"

import CheckoutContent from "./content"

export default function CheckoutPage() {
  return (
    <Suspense fallback={<>Carregando...</>}>
      <CheckoutContent />
    </Suspense>
  )
}

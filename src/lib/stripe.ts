import Stripe from 'stripe'

// Validação opcional - não quebra o build se não estiver definida
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''

export const stripe = stripeSecretKey 
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2024-12-18.acacia',
      typescript: true,
    })
  : null

// IDs dos produtos/preços da Stripe (você vai precisar configurar esses valores)
export const STRIPE_PLANS = {
  MENSAL: {
    priceId: process.env.STRIPE_PRICE_MENSAL_ID || '',
    name: 'Plano Mensal',
    amount: 4990, // R$ 49,90
  },
  TRIMESTRAL: {
    priceId: process.env.STRIPE_PRICE_TRIMESTRAL_ID || '',
    name: 'Plano Trimestral',
    amount: 9990, // R$ 99,90
  },
  SEMESTRAL: {
    priceId: process.env.STRIPE_PRICE_SEMESTRAL_ID || '',
    name: 'Plano Semestral',
    amount: 14990, // R$ 149,90
  },
}

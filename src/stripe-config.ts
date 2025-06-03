export const STRIPE_PRODUCTS = {
  premium: {
    priceId: 'price_1RVvGdCQk75C4e345aV1qllk',
    name: 'Premium',
    description: 'Unlock all premium features and content',
    mode: 'subscription' as const,
  },
} as const;

export type StripeProduct = keyof typeof STRIPE_PRODUCTS;
import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
  const { product } = request.body

  if (request.method !== 'POST') {
    return response.status(405).json({})
  }

  if (!product?.defaultPriceId) {
    return response.status(400).json({ error: 'priceId is required' })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_URL}/success`,
    cancel_url: `${process.env.NEXT_URL}/product/${product.id}`,
    mode: 'payment',
    line_items: [
      {
        price: product.defaultPriceId,
        quantity: 1,
      }
    ]
  })

  return response.status(201).json({
    checkoutSessionUrl: checkoutSession.url
  })
}
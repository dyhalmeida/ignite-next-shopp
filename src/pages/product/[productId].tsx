import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'
import Head from 'next/head'

interface IProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}
export default function Product({ product }: IProductProps) {

  const [isCreateCheckoutSession, setIsCreateCheckoutSession] = useState(false)

  const { isFallback } = useRouter()

  const handleBuyProduct = async () => {
    try {
      setIsCreateCheckoutSession(true)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product
        })
      }).then(response => response.json())
      const { checkoutSessionUrl } = response
      window.location.href = checkoutSessionUrl
    } catch (error) {
      setIsCreateCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  if (isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button
            disabled={isCreateCheckoutSession}
            onClick={handleBuyProduct}
          >
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { productId: 'prod_O3HM6OZmvd9Qv8' }
      }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { productId: string }> = async ({ params }) => {
  const productId = params.productId
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = (product.default_price as Stripe.Price)
  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-br', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 / 2 // revalidar cache da página cada 2h
  }
}

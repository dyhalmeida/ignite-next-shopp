import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'
import { useRouter } from 'next/router'

interface IProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
  }
}
export default function Product({ product }: IProductProps) {

  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
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

  const price = (product.default_price as Stripe.Price).unit_amount / 100
  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-br', {
          style: 'currency',
          currency: 'BRL'
        }).format(price),
        description: product.description,
      }
    },
    revalidate: 60 * 60 / 2 // revalidar cache da página cada 2h
  }
}

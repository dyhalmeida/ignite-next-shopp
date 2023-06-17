import { useRouter } from 'next/router'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'

export default function Product() {

  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer>
        <img src="" alt="xpto" />
      </ImageContainer>
      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Recusandae, debitis doloribus assumenda fugit magnam,
          alias deserunt dolor ad nemo fugiat illo a error velit.
          Quos animi deserunt voluptate quasi ratione!
        </p>
        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

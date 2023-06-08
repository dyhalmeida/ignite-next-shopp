import { AppProps } from "next/app";
import Image from "next/image";
import { globalStyles } from "../styles/global";
import { Container, Header } from "../styles/pages/app";
import logoSVG from '../assets/svg/logo.svg'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoSVG} alt="Logo Ignite" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}

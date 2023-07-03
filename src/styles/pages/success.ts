import { styled } from "..";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 auto',
  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    lineHeight: 1.4,
    marginTop: '1rem',
  },
  a: {
    marginTop: '2rem',
    textDecoration: 'none',
    display: 'block',
    fontSize: '$lg',
    fontWeight: 'bold',
    color: '$green500',
    '&:hover': {
      color: '$green300',
    },
  },
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 260,
  height: 290,
  background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '3rem',
  img: {
    objectFit: 'cover',
  },
})
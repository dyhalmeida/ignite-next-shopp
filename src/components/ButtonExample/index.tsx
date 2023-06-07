import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { styled } from "../../styles";

const Button = styled('button', {
  backgroundColor: '$green300',
  border: 'none',
  borderRadius: 8,
  padding: '4px 8px',
})

interface ButtonExampleProps 
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {}

export function ButtonExample({ children, ...props }: ButtonExampleProps) {
  return <Button {...props}>{children}</Button>
}

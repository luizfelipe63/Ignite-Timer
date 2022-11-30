import { ButtonContainer, ButtonVariant } from './button.styles'

interface buttonProps {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary' }: buttonProps) {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}

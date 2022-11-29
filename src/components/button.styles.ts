import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secundary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const ButtonVariants = {
  primary: 'purple',
  secundary: 'gray',
  danger: 'red',
  success: 'green'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border: 0;
  border-radius: 8px;
  margin-right: 1rem;

  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.whithe};

  /*
  ${props => {
    return css`
      background: ${ButtonVariants[props.variant]};
    `
  }}
  */
`

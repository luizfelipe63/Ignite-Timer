import { ThemeProvider } from 'styled-components'
import { Button } from './components/button'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary" />
      <Button variant="secundary" />
      <Button variant="danger" />
      <Button variant="success" />
      <Button />
      <GlobalStyle />
    </ThemeProvider>
  )
}

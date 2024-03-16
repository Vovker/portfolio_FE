import { ThemeProvider } from 'styled-components';
import theme from '@/theme';
import AppWrapperStyled from '@components/common/AppWrapper/AppWrapper.styled';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppWrapperStyled></AppWrapperStyled>
    </ThemeProvider>
  );
}

export default App;

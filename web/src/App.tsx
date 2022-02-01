import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from 'globalStyles/GlobalStyle';
import theme from './globalStyles/theme';
import themeDark from './globalStyles/themeDark';
import Background from 'components/molecules/Background';

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  overflow: hidden;
`;

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <GlobalStyle />
      <AppWrapper className="App">
        <Background particle={darkMode ? themeDark.particle : theme.particle} />
        <button onClick={() => setDarkMode((p) => !p)}>adssadsa</button>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;

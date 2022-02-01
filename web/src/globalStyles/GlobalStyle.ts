import { createGlobalStyle, css } from 'styled-components';

const styles = css`
  body,
  html {
    margin: 0;
    padding: 0;
  }

  *,
  *:before,
  *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export default createGlobalStyle`${styles}`;

import { createGlobalStyle } from "styled-components";
import { light } from "./theme/colors";
export const GlobalStyles = createGlobalStyle`

  body, textarea, button {
    font-family: sans-serif;
    font-size: 16px;
  }

  a {
    color: ${light.textPrimary};
    text-decoration: none;
  }

  a:focus {
    outline: 0;
    color: #fff;
  }
`;

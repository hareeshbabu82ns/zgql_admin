import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { RecoilRoot } from 'recoil';
import ThemeConfig from './theme/theme';
import { ApolloProvider } from '@apollo/client';

import { SnackbarProvider } from 'notistack';

import client from './utils/GqlClient'

ReactDOM.render(
  <React.StrictMode>

    <RecoilRoot>
      <ThemeConfig>
        <SnackbarProvider maxSnack={5}>
          <ApolloProvider client={client}>
            <HashRouter>
              <App />
            </HashRouter>
          </ApolloProvider>
        </SnackbarProvider>
      </ThemeConfig>
    </RecoilRoot>
    {/* <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <p>some text</p>
      <div style={{ overflow: "scroll" }}><App /></div>
      <p>some text</p>
    </div> */}

  </React.StrictMode>,
  document.getElementById( 'root' )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

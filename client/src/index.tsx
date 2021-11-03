import { createClient as createWSClient } from "graphql-ws";
import { StrictMode } from "react";
import { render } from "react-dom";
import {
  createClient,
  defaultExchanges,
  Provider,
  subscriptionExchange,
} from "urql";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const BASE_URL = "localhost:3001/graphql";

const wsClient = createWSClient({
  url: `ws://${BASE_URL}`,
});

const client = createClient({
  url: `http://${BASE_URL}`,
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => ({
        subscribe: (sink) => ({
          unsubscribe: wsClient.subscribe(operation, sink),
        }),
      }),
    }),
  ],
});

render(
  <StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

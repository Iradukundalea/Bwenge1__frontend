import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./Redux/reducers";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import history from "./Redux/actions/history";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import thekomp from "./thekomp";

const client = new ApolloClient({
  uri: `${thekomp}/graphql`,
  cache: new InMemoryCache(),
});

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </HistoryRouter>
  </React.StrictMode>,
  document.querySelector("#root")
);

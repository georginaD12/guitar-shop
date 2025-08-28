import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';
import client from './graphql/client';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);

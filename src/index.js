import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { defaults, resolvers } from './resolvers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const cache = new InMemoryCache();

const typeDefs = `
  type Todo{
    id: Int!
    text: String!
    completed: Boolean!
  }
  
  type Mutation {
    addTodo(text: String!): Todo
    toggleTodo(id: Int!): Todo
  }
  
  type Query {
    visibilityFilter: String
    todos: [Todo]
  }
`;

const client = new ApolloClient({
  cache,
  link: withClientState({ resolvers, defaults, cache, typeDefs }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root'));
registerServiceWorker();

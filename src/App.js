import React from 'react';
import './App.css';
import ApploClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import  Jobs  from './components/Jobs';
import JobDetail from './components/JobDetail'
function App() {
  const client = new ApploClient({
    uri: 'https://api.graphql.jobs/',
  });
  return (
    <ApolloProvider client={client} >
      <Router>
        <Route exact path="/" component={Jobs} />
        <Route exact path="/job/:jobSlug/:companySlug" component={JobDetail} />

      </Router>
    </ApolloProvider>
  );
}

export default App;

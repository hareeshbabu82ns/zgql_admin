import React from 'react'
import AppRouter from './routers/AppRouter'
import { ApolloProvider } from 'react-apollo'
import gqlClient from './utils/GqlClient'

import SchemaContainer from './utils/SchemaContainer'

const App = () => (
  <ApolloProvider client={gqlClient}>
    <SchemaContainer.Provider>
      <AppRouter />
    </SchemaContainer.Provider>
  </ApolloProvider>
)

export default App;
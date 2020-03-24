import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import _ from 'lodash'
import {
  Icon
} from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts';
import { useQuery } from "react-apollo"
import { SEARCH_SCHEMA } from '../utils/gql_queries_schema'
import SchemaContainer from '../utils/SchemaContainer'
import { Provider } from 'react-redux'
import { Playground } from 'graphql-playground'
import config from '../utils/config'

function GraphiQLPage({ match }) {
  const { loading, error, data } = useQuery(SEARCH_SCHEMA, {
    variables: {
      schemaInput: {
        name: match.params.id
      }
    }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error Loading Schema {match.params.id}</p>

  const schema = _.get(data, 'schema[0]')
  if (!schema) return <p>No Schema Found by Name {match.params.id}</p>

  return (
    <div>
      <Playground
        endpoint={`${config.baseUrl}${schema.path}?sap-client=${config.sapClient}`}
        headers={[{ 'access-control-allow-origin': '*' }]} />
    </div>
  );
}

export default withRouter(GraphiQLPage);
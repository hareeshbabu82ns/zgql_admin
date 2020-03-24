import React from 'react'
import {
  Button, Card
} from 'semantic-ui-react'
import { useQuery, useMutation } from "react-apollo"

import { NavLink, withRouter } from "react-router-dom"
import SchemaView from '../components/SchemaView'
import { GET_SCHEMA_LIST, DELETE_SCHEMA_BY_NAME } from '../utils/gql_queries_schema'

const SchemaListPage = ({ history }) => {
  const { loading, error, data, refetch } = useQuery(GET_SCHEMA_LIST)
  const [deleteSchema, { loading: isDeleting }] = useMutation(DELETE_SCHEMA_BY_NAME)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error Loading Schema List</p>

  return (
    <React.Fragment>
      <Button circular primary icon="refresh" size="huge"
        onClick={() => refetch()}
        style={{ position: 'absolute', zIndex: '999', right: '30px', bottom: '30px' }} />
      <Card.Group itemsPerRow={3} >
        {data.schema.map((schema) => <SchemaView key={schema.id}
          title={schema.name} description={schema.description}
          onDelete={() => {
            deleteSchema({ variables: { name: schema.name } }).then(refetch)
          }}
        />)}
      </Card.Group>
    </React.Fragment>
  );
};

export default withRouter(SchemaListPage);

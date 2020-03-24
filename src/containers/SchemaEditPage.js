import React, { useState, Fragment } from 'react'
import {
  Card, Icon, Button, Menu, Popup, Modal
} from 'semantic-ui-react'
import _ from 'lodash'
import { toast } from 'react-semantic-toasts';
import { NavLink, withRouter } from "react-router-dom"
import { useQuery, useMutation } from "react-apollo"
import { SEARCH_SCHEMA, DELETE_SCHEMA_BY_NAME, UPDATE_SCHEMA_WHERE } from '../utils/gql_queries_schema'
import SchemaForm from '../components/SchemaForm'

const SchemaEditPage = ({ history, match }) => {

  const { loading, error, data, refetch } = useQuery(SEARCH_SCHEMA, {
    variables: {
      schemaInput: {
        name: match.params.id
      }
    }
  })
  const [deleteSchema, { loading: isDeleting }] = useMutation(DELETE_SCHEMA_BY_NAME)
  const [updateSchema, { loading: isUpdating }] = useMutation(UPDATE_SCHEMA_WHERE)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error Loading Schema {match.params.id}</p>

  const schema = _.get(data, 'schema[0]')
  if (!schema) return <p>No Schema Found by Name {match.params.id}</p>

  return (
    <Fragment>
      <p>ProjectEdit</p>
      <SchemaForm schema={schema}
        onSubmit={(data) => {
          let { id, __typename, ...updateData } = data;
          return updateSchema({
            variables: {
              where: { name: match.params.id },
              data: { ...updateData }
            }
          }).then(refetch)
            .catch(err => {
              err.graphQLErrors.map(({ message }, i) => toast({
                type: 'error',
                title: message
              }))
            })
        }}
        onDelete={() => {
          deleteSchema({ variables: { name: schema.name } })
            .catch(err => {
              err.graphQLErrors.map(({ message }, i) => toast({
                type: 'error',
                title: message
              }))
            })
          history.goBack()
        }}
      />
    </Fragment>
  )
}

export default withRouter(SchemaEditPage);
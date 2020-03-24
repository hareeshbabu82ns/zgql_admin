import React, { useState, Fragment } from 'react'
import {
  Card, Icon, Button, Menu, Popup, Modal
} from 'semantic-ui-react'
import _ from 'lodash'
import { toast } from 'react-semantic-toasts';
import { NavLink, withRouter } from "react-router-dom"
import { useQuery, useMutation } from "react-apollo"
import { CREATE_SCHEMA } from '../utils/gql_queries_schema'
import SchemaForm from '../components/SchemaForm'
import SchemaContainer from '../utils/SchemaContainer'

const SchemaCreatePage = ({ history, match }) => {
  const schemaContainer = SchemaContainer.useContainer()
  const [createSchema, { loading: isUpdating }] = useMutation(CREATE_SCHEMA)

  const schema = {
    name: '',
    description: ''
  }
  return (
    <Fragment>
      <p>SchemaCreate</p>
      <SchemaForm schema={schema}
        onSubmit={(data) => {
          return createSchema({
            variables: {
              data
            }
          }).then((result) => {
            history.push(`/dashboard/schemas/${result.data.createSchema[0].name}/edit`)
            schemaContainer.setSchema(result.data.createSchema[0].name)
            return result
          }).catch(err => {
            err.graphQLErrors.map(({ message }, i) => toast({
              type: 'error',
              title: message
            }))
          })
        }}
      />
    </Fragment>
  )
}

export default withRouter(SchemaCreatePage);
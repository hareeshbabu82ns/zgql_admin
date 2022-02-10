import React, { useState } from "react"
import { Button, Container, IconButton, Stack } from "@mui/material"
import RefreshIcon from '@mui/icons-material/Refresh'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useSnackbar } from 'notistack'

import Panel from '../components/Panel'
import SchemaFormView from "../components/SchemaFormView"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@apollo/client"

import { DELETE_SCHEMA_BY_NAME, SEARCH_SCHEMA, UPDATE_SCHEMA_WHERE } from '../utils/gql_queries_schema'
import { useParams, useNavigate } from "react-router-dom"
import _ from "lodash"

const schemaFormSchema = yup.object().shape( {
  name: yup.string().min( 5 ).max( 50 ).required()
    .matches( /[A-Za-z0-9_]+/, {
      message: 'invalid format allowes AlphaNumeric with _',
      excludeEmptyString: true
    } ),
  description: yup.string().min( 10 ).max( 255 ).required(),
  path: yup.string().min( 3 ).required(),
} )

const SchemaEditPage = () => {

  const params = useParams()
  const navigate = useNavigate()

  const { enqueueSnackbar } = useSnackbar()

  const [ count, setCount ] = useState( 0 )

  const { loading, error, data, refetch } = useQuery( SEARCH_SCHEMA, {
    variables: {
      schemaInput: {
        name: params.name
      }
    }
  } )
  const [ deleteSchema, { loading: isDeleting } ] = useMutation( DELETE_SCHEMA_BY_NAME )
  const [ updateSchema, { loading: isUpdating } ] = useMutation( UPDATE_SCHEMA_WHERE )

  const onSubmit = async ( formData ) => {
    // console.log( formData )
    const data = {
      name: formData.name,
      description: formData.description,
      path: formData.path,
    }
    try {
      await updateSchema( {
        variables: {
          where: { name: params.name },
          data,
        }
      } )
      enqueueSnackbar( 'Schema Updated', { variant: 'success' } )
    } catch ( e ) {
      enqueueSnackbar( 'Error updating Schema', { variant: 'error' } )
    }
  }

  const onDelete = async () => {
    try {
      await deleteSchema( { variables: { name: params.name } } )
      enqueueSnackbar( 'Schema Deleted', { variant: 'success' } )
      navigate( '/schema', { replace: true } )
    } catch ( err ) {
      err.graphQLErrors.map( ( { message }, i ) =>
        enqueueSnackbar( message, { variant: 'error' } )
      )
    }
  }

  return (
    <SchemaEditView
      key={( _.get( data, 'schema[0].id', params.name ) || 'schemaEdit' ) + count}
      onSubmit={onSubmit}
      onRefetch={async () => { await refetch(); setCount( count + 1 ) }}
      onDelete={onDelete}
      loading={loading || isUpdating || isDeleting}
      defaultValues={_.get( data, 'schema[0]' )} />
  )
}

const SchemaEditView = ( { onSubmit, defaultValues, loading, onRefetch, onDelete } ) => {

  const form = useForm( {
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver( schemaFormSchema )
  } )
  const { handleSubmit, reset } = form

  const handleSubmitAPI = async ( data ) => {
    await onSubmit( data )
      .then( () => form.reset( data ) )
      .catch( ( err ) => console.error( err ) )
  }

  const actionsRight = (
    <Stack direction="row" spacing={2} >
      <Button variant={"contained"}
        onClick={handleSubmit( handleSubmitAPI )} >
        Save
      </Button>

      <Button onClick={() => reset()} variant={"outlined"}>
        Reset
      </Button>

      <Button variant={"outlined"} color='error'
        onClick={onDelete} >
        Delete
      </Button>
    </Stack>
  )

  const toolbarActions = (
    <React.Fragment>
      <IconButton disabled={loading}
        onClick={onRefetch}>
        <RefreshIcon />
      </IconButton>
    </React.Fragment>
  )

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

      <Panel title='Schema Edit'
        toolbarActions={toolbarActions}
        actionsRight={actionsRight}
        loading={loading}>
        <SchemaFormView form={form} onSubmit={handleSubmitAPI} />
      </Panel>

    </Container>
  )
}

export default SchemaEditPage
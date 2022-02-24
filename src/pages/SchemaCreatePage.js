import { Button, Container, Stack } from "@mui/material"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useSnackbar } from 'notistack'

import Panel from '../components/Panel'
import SchemaFormView from "../components/SchemaFormView"
import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"

import { CREATE_SCHEMA } from '../utils/gql_queries_schema'
import { useNavigate } from "react-router-dom"
import _ from "lodash"
import { BASE_PATH_GQL_GENERIC } from "../constants"

const schemaFormSchema = yup.object().shape( {
  name: yup.string().min( 5 ).max( 50 ).required()
    .matches( /[A-Za-z0-9_]+/, {
      message: 'invalid format allowes AlphaNumeric with _',
      excludeEmptyString: true
    } ),
  description: yup.string().min( 10 ).max( 255 ).required(),
  path: yup.string().min( 3 ).required(),
} )

const defaultValues = {
  name: '',
  description: '',
  path: BASE_PATH_GQL_GENERIC,
}

const SchemaCreatePage = () => {

  const navigate = useNavigate()

  const { enqueueSnackbar } = useSnackbar()

  const [ createSchema, { loading: isUpdating } ] = useMutation( CREATE_SCHEMA )

  const onSubmit = async ( formData ) => {
    // console.log( formData )
    const data = {
      name: formData.name,
      description: formData.description,
      path: formData.path,
    }
    try {
      const res = await createSchema( {
        variables: {
          data,
        }
      } )
      // console.log( res )
      enqueueSnackbar( 'Schema Created', { variant: 'success' } )
      navigate( `/schema/${_.get( res, 'data.createSchema[0].name' )}` )
    } catch ( e ) {
      enqueueSnackbar( 'Error Creating Schema', { variant: 'error' } )
    }
  }

  return (
    <SchemaCreateView
      key={'schemaCreate'}
      onSubmit={onSubmit}
      loading={isUpdating}
      defaultValues={defaultValues} />
  )
}

const SchemaCreateView = ( { onSubmit, defaultValues, loading, onRefetch, onDelete } ) => {

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
    </Stack>
  )


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

      <Panel title='Schema Create'
        actionsRight={actionsRight}
        loading={loading}>
        <SchemaFormView form={form} onSubmit={handleSubmitAPI} />
      </Panel>

    </Container>
  )
}

export default SchemaCreatePage
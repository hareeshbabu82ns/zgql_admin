import React, { useEffect, useState } from "react"
import {
  Container, Grid, IconButton,
  Card, CardActions, CardHeader
} from "@mui/material"
import RefreshIcon from '@mui/icons-material/Refresh'
import EditIcon from '@mui/icons-material/EditOutlined'
import CodeIcon from '@mui/icons-material/AccountTreeOutlined'
import RunIcon from '@mui/icons-material/EastOutlined'
import AddIcon from '@mui/icons-material/AddOutlined'
import { useQuery, NetworkStatus } from "@apollo/client"
import { useSnackbar } from 'notistack'

import Panel from "../components/Panel"
import { GET_SCHEMA_LIST } from "../utils/gql_queries_schema"
import { useNavigate } from "react-router-dom"

const SchemaListPage = () => {

  const { enqueueSnackbar } = useSnackbar()

  const navigate = useNavigate()
  const [ refetching, setRefetching ] = useState( false )

  const { loading, error, data, refetch, networkStatus } = useQuery( GET_SCHEMA_LIST )

  const refetchData = async () => {
    setRefetching( true )
    try {
      await refetch()
    } catch ( e ) {
      enqueueSnackbar( 'Error fetching Schemas', { variant: 'error' } )
    }
    setRefetching( false )
  }

  useEffect( () => {
    if ( error )
      enqueueSnackbar( 'Error fetching Schemas', { variant: 'error' } )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ error ] )

  const toolbarActions = (
    <React.Fragment>
      <IconButton disabled={loading || ( networkStatus === NetworkStatus.refetch ) || refetching}
        onClick={refetchData}>
        <RefreshIcon />
      </IconButton>
      <IconButton aria-label="Create New Schema"
        onClick={() => navigate( 'new' )}>
        <AddIcon />
      </IconButton>
    </React.Fragment>
  )

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

      <Panel title="Schemas"
        loading={loading || refetching}
        error={error}
        toolbarActions={toolbarActions}>

        <SchemaListGrid schemas={data?.schema} />

      </Panel>

    </Container>
  )
}

const SchemaListGrid = ( { schemas = [] } ) => {

  return (
    <Grid container spacing={2} >
      {schemas.map( schema => (
        <Grid item key={schema.id}
          xs={12} sm={6} md={4}>
          <SchemaGridItem schema={schema} />
        </Grid> ) )}
    </Grid>
  )
}

const SchemaGridItem = ( { schema } ) => {
  const navigate = useNavigate()

  return (
    <Card variant="outlined">
      <CardHeader
        title={schema.name}
        subheader={schema.description}
      />

      <CardActions disableSpacing
        sx={{ justifyContent: 'flex-end' }}>
        <IconButton aria-label="Edit Schema" title="Edit Header" size="small"
          onClick={() => navigate( `/schema/${schema.name}` )}>
          <EditIcon />
        </IconButton>

        <IconButton aria-label="Edit Schema Graph" title="Edit Schema" size="small"
          onClick={() => navigate( `/editor/${schema.name}` )}>
          <CodeIcon />
        </IconButton>

        <IconButton aria-label="Run Schema" title="Run Schema" size="small"
          onClick={() => navigate( `/run/${schema.name}` )}>
          <RunIcon />
        </IconButton>

      </CardActions>
    </Card>
  )
}

export default SchemaListPage
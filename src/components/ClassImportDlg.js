import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
// import Tooltip from '@mui/material/Tooltip'
// import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
// import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ClearIcon from '@mui/icons-material/Clear'
import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'

import { useLazyQuery } from "@apollo/client"

import { GEN_SDL_CLASS } from '../utils/gql_queries_ddic'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid } from '@mui/material'
import FormInputText from './FormInput/FormInputText'
import GraphEditor from './GraphEditor'
import { gqlParse } from '../utils/gql_utils'

function copyTextToClipBoard( strData ) {
  navigator.clipboard.writeText( strData )
}

function ClassImportDlg( { open, scroll = 'paper', onClose } ) {

  const { enqueueSnackbar } = useSnackbar()

  const [ fmName, setFMName ] = useState( '' )
  const [ sdl, setSDL ] = useState( null )
  const [ generateSDL, { loading, data, error } ] = useLazyQuery( GEN_SDL_CLASS )

  useEffect( () => {
    if ( error ) {
      console.log( error.graphQLErrors )
      setSDL( null )
      enqueueSnackbar( 'Error Generating SDL', { variant: 'error' } )
      error.graphQLErrors.forEach( e =>
        enqueueSnackbar( e.message, { variant: 'error' } ) )
    } if ( data && data.sdl ) {
      // const parsed = print( parse( data.sdl ) )
      if ( sdl !== data.sdl ) {
        setSDL( gqlParse( { code: data.sdl } ) )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ error, data ] )

  const handleSubmit = async ( { name } ) => {
    await generateSDL( { variables: { className: name } } )
    setFMName( name )
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={scroll}
      // maxWidth='lg'
      // fullWidth={true}
      fullScreen={true}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle as="div" id="scroll-dialog-title"
        sx={{ backgroundColor: 'primary.100', padding: 0, }}>
        <Toolbar variant='dense'>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Import Class</Typography>
          <IconButton onClick={onClose}><ClearIcon /></IconButton>
        </Toolbar>
      </DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <FMFormView onSubmit={handleSubmit} />
        {/* <pre>{sdl || ''}</pre> */}
        {sdl !== null &&
          <GraphEditor key={fmName}
            code={sdl} libraries={''}
            loading={loading} enableImports={false}
            onCopy={( { code } ) => copyTextToClipBoard( code )}
            state={{ pane: 'hierarchy', code: true }}
          />}
      </DialogContent>
      {/* <DialogActions>
        <Tooltip title="Copy to Clipboard"><IconButton onClick={() => copyTextToClipBoard( sdl )}><ContentCopyIcon /></IconButton></Tooltip>
      </DialogActions> */}
    </Dialog>
  )
}

const fmFormSchema = yup.object().shape( {
  name: yup.string().required()
    .matches( /[A-Za-z0-9_]+/, {
      message: 'invalid format allowes AlphaNumeric with _',
      excludeEmptyString: true
    } ),
} )

const defaultValues = {
  name: '',
}

const FMFormView = ( { onSubmit } ) => {

  const form = useForm( {
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver( fmFormSchema )
  } )
  const { formState, control, handleSubmit, setValue } = form
  const { errors, isSubmitting } = formState

  const handleSubmitAPI = async ( data ) => {
    await onSubmit( data )
      .then( () => form.reset( data ) )
      .catch( ( err ) => console.error( err ) )
  }

  return (
    <form onSubmit={handleSubmit( onSubmit )}>
      <Grid container spacing={2}>

        <Grid item xs={8}>
          <FormInputText
            name="name" label="Class Name"
            control={control} />
        </Grid>

        <Grid item xs={4}>
          <Button variant={"contained"}
            onClick={handleSubmit( handleSubmitAPI )} >
            Generate
          </Button>
        </Grid>

      </Grid>
    </form>
  )
}

export default ClassImportDlg
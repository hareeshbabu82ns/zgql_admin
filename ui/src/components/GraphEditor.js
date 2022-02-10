import React, { useState } from 'react'
import { GraphQLEditor, } from 'graphql-editor'
import { useRecoilValue } from 'recoil'
import { IconButton, Tooltip, Stack } from "@mui/material"
import SaveIcon from '@mui/icons-material/SaveOutlined'
import RefreshIcon from '@mui/icons-material/Refresh'
import MoreIcon from '@mui/icons-material/MoreOutlined'

import { themeModeState, THEME_DARK } from '../state/theme_mode'
import editorTheme from '../theme/editorPalette'

export const GraphEditor = ( { code, libraries, onSave, onRefetch, loading } ) => {
  const themeMode = useRecoilValue( themeModeState )
  // console.log( editorTheme.dark )

  const [ isInvalid, setInvalid ] = useState( false )
  const [ schema, setSchema ] = useState( {
    code,
    libraries,
  } )

  const toolbarActions = (
    <React.Fragment>
      <Tooltip title="Refetch" placement='right-end'>
        <IconButton disabled={loading}
          onClick={() => onRefetch()}>
          <RefreshIcon fontSize='small' />
        </IconButton>
      </Tooltip>

      <Tooltip title="Save" placement='right-end'>
        <IconButton
          size="small"
          onClick={() => onSave( schema )}
          disabled={loading || isInvalid}
        >
          <SaveIcon fontSize='small' />
        </IconButton>
      </Tooltip>

      <Tooltip title="More" placement='right-end'>
        <IconButton
          size="small"
        >
          <MoreIcon fontSize='small' sx={{ transform: 'rotate(0.5turn)' }} />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  )

  return (

    <div
      style={{
        zIndex: 2,
        width: '100%',
        alignSelf: 'stretch',
        position: 'relative',
        height: 'calc(100% - 65px)',
      }}
    >

      <Stack
        style={{ zIndex: '999', position: 'absolute', top: '174px', left: '4px' }}
      >
        {toolbarActions}
      </Stack>

      <GraphQLEditor
        initialSizeOfSidebar={'30vw'}
        // onStateChange={( props ) => { }}
        // onSchemaChange={( props ) => {
        //   setschema( props )
        // }}
        readonly={loading}
        setSchema={( props, isInvalid ) => { setInvalid( isInvalid ); setSchema( props ) }}
        schema={schema}
        theme={themeMode === THEME_DARK ? editorTheme.dark : editorTheme.light}
      />
    </div>


  )
}

export default GraphEditor
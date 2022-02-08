import React, { useState } from 'react';
import { GraphQLEditor, } from 'graphql-editor';
import { useRecoilValue } from 'recoil';
import { themeModeState, THEME_DARK } from '../state/theme_mode';
import SaveIcon from '@mui/icons-material/SaveOutlined';

import editorTheme from '../theme/editorPalette'
import { IconButton } from '@mui/material';

export const GraphEditor = ( { code, libraries, onSave, loading } ) => {
  const themeMode = useRecoilValue( themeModeState )
  // console.log( editorTheme.dark )

  const [ isInvalid, setInvalid ] = useState( false )
  const [ schema, setSchema ] = useState( {
    code,
    libraries,
  } );

  return (

    <div
      style={{
        zIndex: 2,
        width: '100%',
        alignSelf: 'stretch',
        position: 'relative',
        height: 'calc(100% - 60px)',
      }}
    >
      <IconButton
        size="small"
        onClick={() => onSave( schema )}
        disabled={loading || isInvalid}
        style={{ zIndex: '999', position: 'absolute', top: '174px', left: '10px' }}
      >
        <SaveIcon fontSize='small' />
      </IconButton>

      <GraphQLEditor
        initialSizeOfSidebar={'30vw'}
        // onStateChange={( props ) => { }}
        // onSchemaChange={( props ) => {
        //   setschema( props );
        // }}
        readonly={loading}
        setSchema={( props, isInvalid ) => { setInvalid( isInvalid ); setSchema( props ); }}
        schema={schema}
        theme={themeMode === THEME_DARK ? editorTheme.dark : editorTheme.light}
      />
    </div>


  );
};

export default GraphEditor
import React, { useState } from 'react';
import { GraphQLEditor, } from 'graphql-editor';
import { useRecoilValue } from 'recoil';
import { themeModeState, THEME_DARK } from '../state/theme_mode';

import editorTheme from '../theme/editorPalette'

const schemas = {
  pizza: `
type Query{
	pizzas: [Pizza!]
}
`,
  pizzaLibrary: `
type Pizza{
  name:String
}
`,
};


export const GraphEditorPage = () => {
  const themeMode = useRecoilValue( themeModeState )

  console.log( editorTheme.dark )

  const [ mySchema, setMySchema ] = useState( {
    code: schemas.pizza,
    libraries: schemas.pizzaLibrary,
  } );
  return (
    <div style={{ display: "flex", alignItems: "stretch" }}>

      <div
        style={{
          flex: 1,
          alignSelf: 'stretch',
          display: 'flex',
          position: 'relative',
        }}
      >
        <GraphQLEditor
          onStateChange={( props ) => { }}
          onSchemaChange={( props ) => {
            setMySchema( props );
          }}
          setSchema={( props, isInvalid ) => { setMySchema( props ) }}
          schema={mySchema}
          theme={themeMode === THEME_DARK ? editorTheme.dark : editorTheme.light}
        />
      </div>

      <div style={{ height: "1000px" }}>
      </div>

    </div>
  );
};

export default GraphEditorPage
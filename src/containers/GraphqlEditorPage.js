import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import _ from 'lodash'
import {
  Icon
} from 'semantic-ui-react'
import { Editor } from 'graphql-editor';
import { toast } from 'react-semantic-toasts';
import SchemaContainer from '../utils/SchemaContainer'

function GraphqlEditorPage({ schemaId, match, onSave }) {
  const schemaContainer = SchemaContainer.useContainer()
  const [schemaName, setSchemaName] = useState(schemaId || _.get(match, 'params.id', ''))

  const [schema, setSchema] = useState({
    code: ``, // acutal SDL schema
    libraries: ``, // supporting Types or Enume Libraries
  });

  React.useEffect(() => {
    if (!_.isEmpty(schemaName))
      schemaContainer.load(schemaName).then((res) => setSchema({ code: res }))
  }, [schemaName])

  return (
    <div
      style={{
        alignSelf: 'streatch',
        display: 'flex',
        flex: 1,
        height: '100%',
        width: '100%'
      }}
    >
      <Icon link name='save outline' color='teal'
        disabled={schemaContainer.isLoading}
        loading={schemaContainer.isLoading}
        onClick={() => {
          if (onSave)
            onSave(schemaName, schema.code)
          if (!_.isEmpty(schemaName)) {
            // console.log(schema)
            schemaContainer.save(schemaName, schema.code)
              .then(data => {
                setSchema({ code: data })
                toast({ type: 'info', title: 'updated' });
              })
              .catch(err => toast({ type: 'error', title: _.get(err, 'response.data', err.message) }))
          }
        }}
        style={{ zIndex: '999', position: 'absolute', top: '154px', left: '8px' }} />
      <Editor
        // activePane={"code"}
        onGraphChange={(controller) => { console.log(schema) }}
        readonly={schemaContainer.isLoading}
        onSchemaChange={setSchema}
        initialSizeOfSidebar={'45vw'}
        schema={schema}
      />
    </div>
  );
}

export default withRouter(GraphqlEditorPage);
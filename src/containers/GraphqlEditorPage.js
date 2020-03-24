import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import _ from 'lodash'
import {
  Icon
} from 'semantic-ui-react'
import { Editor } from 'graphql-editor';
import { toast } from 'react-semantic-toasts';
import SchemaContainer from '../utils/SchemaContainer'

function GraphqlEditorPage(props) {
  const schemaContainer = SchemaContainer.useContainer()
  const [schemaName, setSchemaName] = useState(props.schema || _.get(props.match, 'params.id', ''))
  const [editorVisible, setEditorVisibility] = useState(props.editorVisible || true)
  const [isLoading, setLoading] = useState(false);
  let [editorController, setEditorController] = useState(null)

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
      <Icon link name='save outline'
        disabled={schemaContainer.isLoading}
        loading={schemaContainer.isLoading}
        onClick={() => {
          if (editorController && props.onSave)
            props.onSave(schemaName, editorController.schema)
          if (editorController && !_.isEmpty(schemaName)) {
            // console.log(editorController.schema)
            schemaContainer.save(schemaName, editorController.schema)
              .then(data => {
                editorController.loadGraphQL(data)
                toast({ type: 'info', title: 'updated' });
              })
              .catch(err => toast({ type: 'error', title: _.get(err, 'response.data', err.message) }))
          }
        }}
        style={{ zIndex: '999', position: 'absolute', top: '154px', left: '8px' }} />
      <Editor
        readonly={schemaContainer.isLoading}
        graphController={(controller) => {
          controller.setPassDiagramErrors((errors) => console.log(errors))
          setEditorController(controller)
          if (!_.isEmpty(schemaName))
            schemaContainer.load(schemaName).then((res) => controller.loadGraphQL(res, true))
          // controller.setOnSerialise((schema) => { console.log(schema) })
        }}
        placeholder="Start Building Graph"
        editorVisible={editorVisible || !schemaContainer.isLoading} />
    </div>
  );
}

export default withRouter(GraphqlEditorPage);
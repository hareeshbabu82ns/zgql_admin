import React, { useState } from 'react';
import {
  Menu, Dropdown, Modal, Header, Button, Grid, Form, TextArea,
  Icon, Image
} from 'semantic-ui-react'
import { NavLink, withRouter } from "react-router-dom";
import { useLazyQuery } from "react-apollo"
import {
  print,
  parse,
} from 'graphql';

import SchemaContainer from '../utils/SchemaContainer'
import { GEN_SDL_FM } from '../utils/gql_queries_ddic'

const FunctionModuleImportModal = ({ trigger }) => {
  const [fmName, setFMName] = useState('');
  const [sdl, setSDL] = useState(null);
  const [generateSDL, { loading, data, error }] = useLazyQuery(GEN_SDL_FM)

  if (error)
    console.log(error.graphQLErrors)
  if (data && data.sdl) {
    let parsed = print(parse(data.sdl))
    if (sdl !== parsed) {
      setSDL(parsed)
    }
  }

  const handleSubmit = (e, data) => {
    generateSDL({ variables: { fmName: fmName } })
  };
  const handleChange = (e, { name, value }) => {
    setFMName(value)
  };
  return (
    <Modal size={'large'} trigger={trigger} centered={false}>
      <Modal.Header>Function Module Importer</Modal.Header>
      <Modal.Content scrolling>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='Function Module'
              name='fmName'
              onChange={handleChange}
              width={6}
            />
            <Form.Button primary content='Generate SDL' />
          </Form.Group>
        </Form>
        <Form>
          {data && data.sdl && <TextArea rows={30} placeholder='Function Module SDL' value={sdl} />}
        </Form>
        {error &&
          <ul style={{ color: "red" }}>{error.graphQLErrors.map(
            err => (<li>{err.message}</li>))}</ul>}
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  );
};

export default withRouter(FunctionModuleImportModal);
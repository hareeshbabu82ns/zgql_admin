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
import { GEN_SDL_CLASS } from '../utils/gql_queries_ddic'

const ClassImportModal = ({ trigger }) => {
  const [className, setClassName] = useState('');
  const [sdl, setSDL] = useState(null);
  const [generateSDL, { loading, data }] = useLazyQuery(GEN_SDL_CLASS)

  if (data && data.sdl) {
    let parsed = print(parse(data.sdl))
    if (sdl !== parsed) {
      setSDL(parsed)
    }
  }

  const handleSubmit = (e, data) => {
    generateSDL({ variables: { className: className } })
  };
  const handleChange = (e, { name, value }) => {
    setClassName(value)
  };
  return (
    <Modal size={'large'} trigger={trigger} centered={false}>
      <Modal.Header>Class Importer</Modal.Header>
      <Modal.Content scrolling>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='Class Name'
              name='className'
              onChange={handleChange}
              width={6}
            />
            <Form.Button primary content='Generate SDL' />
          </Form.Group>
        </Form>
        <Form>
          {data && data.sdl && <TextArea rows={30} placeholder='Class SDL' value={sdl} />}
        </Form>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  );
};

export default withRouter(ClassImportModal);
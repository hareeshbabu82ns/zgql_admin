import React from 'react';
import {
  Menu, Dropdown,
  Icon, Image
} from 'semantic-ui-react'
import { NavLink, withRouter } from "react-router-dom";
import SchemaContainer from '../utils/SchemaContainer'
import FunctionModuleImportModal from '../components/FunctionModuleImportModal'
import ClassImportModal from '../components/ClassImportModal'
import _ from 'lodash'

const navbar = ({ history }) => {
  const schemaContainer = SchemaContainer.useContainer()
  return (
    <Menu inverted attached borderless size='mini'>
      <Menu.Item as='a' header>
        <Image size='mini' src='/logo192.png' style={{ width: '2em', height: '2em', marginRight: '1.5em' }} />
        GraphQL Admin
        </Menu.Item>
      <Menu.Item as={NavLink} to="/dashboard">
        <Icon name="dashboard" />Dashboard
      </Menu.Item>
      <Menu.Item as={NavLink} to={`/editor/${schemaContainer.schema}`}>
        <Icon name="code" />Editor
      </Menu.Item>
      {
        // <Menu.Item as={NavLink} to={`/graphiql/${schemaContainer.schema}`}>
        //   <Icon name="line graph" />GrqphiQL
        // </Menu.Item>
      }

      <Menu.Menu position='right' style={{ marginRight: '1.5em' }}>

        <Menu.Item as={NavLink} to="/dashboard/schemas/new" exact>
          <Icon name="file outline" /> New
        </Menu.Item>
        <Dropdown item text='Import'>
          <Dropdown.Menu>
            <FunctionModuleImportModal trigger={<Dropdown.Item>Function Module</Dropdown.Item>} />
            <ClassImportModal trigger={<Dropdown.Item>Class</Dropdown.Item>} />
            <Dropdown.Item disabled>Table</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu >
  );
};

export default withRouter(navbar);

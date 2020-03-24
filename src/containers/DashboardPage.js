import React, { useState } from "react";
import { withRouter, Route, NavLink } from "react-router-dom";
import { Grid, Menu, Container } from 'semantic-ui-react'
import SchemaListPage from "./SchemaListPage";
import SchemaEditPage from "./SchemaEditPage";
import SchemaCreatePage from "./SchemaCreatePage";
import SettingsPage from "./SettingsPage";

const DashboardPage = ({ match }) => {
  const [activeItem, setActiveItem] = useState(1)
  const handleItemClick = () => { }
  return (
    <div style={{ marginTop: '15px', height: '100vh', display: 'flex' }}>
      <div>
        <Menu vertical inverted style={{ width: '250px', height: '100%' }} size='large'>
          <Menu.Item>
            <Menu.Header>GraphQL</Menu.Header>

            <Menu.Menu>
              <Menu.Item as={NavLink} to="/dashboard/schemas" exact
                name='Schemas'
              />
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>Settings</Menu.Header>

            <Menu.Menu>
              <Menu.Item as={NavLink} to="/dashboard/user_settings" exact
                name='User Params'
              />
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      </div>
      <div style={{ width: '100%', padding: '16px', backgroundColor: '#333' }}>
        <Route path={`/dashboard/schemas/:id/edit`} component={SchemaEditPage} />
        <Route path={`/dashboard/schemas/new`} component={SchemaCreatePage} exact />
        <Route path={`/dashboard/schemas`} component={SchemaListPage} exact />
        <Route path={`/dashboard/user_settings`} component={SettingsPage} exact />
      </div>
    </div>
  )
};

export default withRouter(DashboardPage);

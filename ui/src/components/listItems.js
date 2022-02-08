import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import DashIcon from '@mui/icons-material/DashboardOutlined';
import SchemaIcon from '@mui/icons-material/SchemaOutlined';
import EditIcon from '@mui/icons-material/ModeEditOutline';
import { Link } from 'react-router-dom'

export const mainListItems = (
  <div>
    <ListItem component={Link} to="/">
      <ListItemIcon>
        <DashIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem component={Link} to="/schema">
      <ListItemIcon>
        <SchemaIcon />
      </ListItemIcon>
      <ListItemText primary="List Schema" />
    </ListItem>
    <ListItem component={Link} to="/schema/new">
      <ListItemIcon>
        <EditIcon />
      </ListItemIcon>
      <ListItemText primary="Create Schema" />
    </ListItem>
    <ListItem component={Link} to="/settings">
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="User Settings" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    {/* <ListSubheader inset>Saved Searches</ListSubheader> */}
  </div>
);
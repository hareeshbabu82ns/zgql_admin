import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import DashIcon from '@mui/icons-material/DashboardOutlined';
import SchemaIcon from '@mui/icons-material/SchemaOutlined';
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material';

export const mainListItems = (
  <div>
    <ListItem component={Link} to="/">
      <ListItemIcon>
        <DashIcon />
      </ListItemIcon>
      <ListItemText primary={<Typography color="text.primary">Dashboard</Typography>} />
    </ListItem>

    <ListItem component={Link} to="/schema">
      <ListItemIcon>
        <SchemaIcon />
      </ListItemIcon>
      <ListItemText primary={<Typography color="text.primary">Schemas</Typography>} />
    </ListItem>

    <ListItem component={Link} to="/settings">
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary={<Typography color="text.primary">User Settings</Typography>} />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    {/* <ListSubheader inset>Saved Searches</ListSubheader> */}
  </div>
);
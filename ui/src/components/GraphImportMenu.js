import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { IconButton, Tooltip } from '@mui/material'
import ImportIcon from '@mui/icons-material/FileDownloadOutlined'

export default function GraphImportMenu( { onItemClick } ) {
  const [ anchorEl, setAnchorEl ] = React.useState( null )
  const open = Boolean( anchorEl )
  const handleClick = ( event ) => {
    setAnchorEl( event.currentTarget )
  }
  const handleMenuItemClick = ( event ) => {
    handleClose()
    onItemClick && onItemClick( event.currentTarget )
  }
  const handleClose = () => {
    setAnchorEl( null )
  }

  return (
    <React.Fragment>
      <Tooltip title="Import" placement='right-end'>
        <IconButton
          size="small"
          id="graph-import"
          aria-controls={open ? 'graph-import-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <ImportIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Menu
        id="graph-import-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'graph-import',
        }}
      >
        <MenuItem onClick={handleMenuItemClick}>Function Module</MenuItem>
        <MenuItem onClick={handleMenuItemClick}>Class</MenuItem>
      </Menu>
    </React.Fragment>
  )
}

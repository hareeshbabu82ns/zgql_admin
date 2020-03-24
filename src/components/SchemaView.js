import React, { useState } from 'react'
import {
  Card, Icon, Button, Menu, Popup, Modal
} from 'semantic-ui-react'
import { NavLink } from "react-router-dom"

const DeleteConfirm = ({ openDialog, trigger, onDelete }) => {
  const [isOpen, setOpen] = useState(openDialog || false);

  let open = () => setOpen(true)
  let close = () => setOpen(false)

  return (
    <Modal
      open={isOpen}
      onOpen={open}
      onClose={close}
      size='small'
      basic
      trigger={trigger}
    >
      <Modal.Header>Delete Schema Definitions</Modal.Header>
      <Modal.Content>
        <p>This will delete all the Definitions of Schema from DB?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='green' inverted onClick={() => { close() }}>
          <Icon name='remove' /> No
        </Button>
        <Button color='red' inverted onClick={() => { close(); onDelete() }}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const SchemaView = ({ title, description, onDelete }) => {
  return (
    <Card style={{ width: '250px' }} color='red'>
      <Card.Content header={title} />
      <Card.Content description={description} />
      <Card.Content extra textAlign='right'>
        <Button.Group icon compact size='mini' basic>
          <Button as={NavLink} to={`/dashboard/schemas/${title}/edit`} icon='pencil alternate' />
          <DeleteConfirm trigger={<Button icon='trash' />}
            onDelete={onDelete} />
          <Button as={NavLink} to={`/editor/${title}`} icon='arrow right' />
        </Button.Group>
      </Card.Content>

    </Card>
  )
}

export default SchemaView;
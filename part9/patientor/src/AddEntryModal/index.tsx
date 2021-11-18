import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';


interface props {
  name: string
  onClose: ()=>void
  modalOpen: boolean,
  onSubmit: ()=> void
  error?:string
}

const AddEntryModal = ({name, modalOpen, onClose, onSubmit, error}:props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>New entry for {name}</Modal.Header>
    {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
    <Modal.Content>
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>

  </Modal>
);

export default AddEntryModal;
import React from 'react';
import { Modal } from 'react-native';

function AppModal({
  visible,
  ModalComponent,
  ...otherProps
}) {
  return (
    <Modal
      visible={ visible } 
      {...otherProps}
    >
      { ModalComponent }
    </Modal>
  );
}

export default AppModal;
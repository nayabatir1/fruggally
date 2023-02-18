import React, {memo} from 'react';
import type {PropsWithChildren} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

type Props = PropsWithChildren<{visible: boolean; toggleModal: () => void}>;

function ModalStructure({visible, children, toggleModal}: Props): JSX.Element {
  return (
    <Modal
      animationType="fade"
      presentationStyle="overFullScreen"
      hardwareAccelerated={true}
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={toggleModal}
      visible={visible}>
      <TouchableOpacity style={style.backdrop} onPress={toggleModal}>
        <KeyboardAvoidingView
          // behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
          behavior="position">
          <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
}

const style = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(ModalStructure);

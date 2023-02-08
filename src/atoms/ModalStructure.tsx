import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';

type Props = PropsWithChildren<{visible: boolean; toggleModal: () => void}>;

function ModalStructure({visible, children, toggleModal}: Props): JSX.Element {
  return (
    <Modal
      animationType="fade"
      presentationStyle="overFullScreen"
      hardwareAccelerated={true}
      transparent={true}
      visible={visible}>
      <Pressable style={style.backdrop} onPress={toggleModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'padding'}>
          {children}
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

const style = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalStructure;

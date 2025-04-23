export type CustomModalProps = {
  title?: string,
  modalVisible: boolean,
  setModalVisible: (isModalVisible: boolean) => void,
  containerStyles?: string,
}
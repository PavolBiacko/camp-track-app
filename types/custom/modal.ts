export type CustomModalProps = {
  title?: string,
  type: "confirmation" | "custom",
  modalVisible: boolean,
  setModalVisible: (isModalVisible: boolean) => void,
  handleConfirm?: () => void,
  containerStyles?: string,
}
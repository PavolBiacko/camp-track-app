export type CustomModalProps = ModalBasicProps & {
  title?: string,
  type: "confirmation" | "custom",
  handleConfirm?: () => void,
  containerStyles?: string,
}

export type ModalBasicProps = {
  modalVisible: boolean,
  setModalVisible: (isModalVisible: boolean) => void,
}
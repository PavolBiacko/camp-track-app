export type CustomModalProps = ModalBasicProps & {
  title?: string,
  subTitle?: string,
  type: "confirmation" | "custom",
  handleConfirm?: () => void | Promise<void>,
  containerStyles?: string,
}

export type ModalBasicProps = {
  modalVisible: boolean,
  setModalVisible: (isModalVisible: boolean) => void,
}
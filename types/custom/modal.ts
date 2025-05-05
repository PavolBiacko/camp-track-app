export type CustomModalProps = ModalBasicProps & {
  title?: string,
  subTitle?: string,
  type: "confirmation" | "custom",
  isSubmitDisabled?: boolean,
  handleConfirm?: () => void | Promise<void>,
  containerStyles?: string,
}

export type ModalBasicProps = {
  modalVisible: boolean,
  setModalVisible: (isModalVisible: boolean) => void,
}
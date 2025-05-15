export type CustomModalProps = ModalBasicProps & {
  title?: string,
  subTitle?: string,
  type: "confirmation" | "custom" | "loading",
  isSubmitDisabled?: boolean,
  handleConfirm?: () => void | Promise<void>,
  baseButtonText?: string,
  confirmButtonText?: string,
  containerStyles?: string,
}

export type ModalBasicProps = {
  modalVisible: boolean,
  setModalVisible: (isModalVisible: boolean) => void,
}
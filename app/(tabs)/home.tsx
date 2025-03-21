import CustomButton from "@/components/custom/CustomButton";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <SafeAreaView className='bg-background-0 w-full h-full items-center'>
      <CustomButton title="Profile" isPrimary={true} handlePress={() => setShowModal(true)} containerStyles="mt-5 w-[200px]" />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton></ModalCloseButton>
          </ModalHeader>
          <ModalBody />
          <ModalFooter />
        </ModalContent>
      </Modal>
    </SafeAreaView>
  )
}

export default Home
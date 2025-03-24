import Loading from "@/components/custom/Loading";
import BaseLayout from "@/components/layouts/BaseLayout";
import CampLeaderLayout from "@/components/layouts/home/CampLeaderLayout";
import GroupLeaderLayout from "@/components/layouts/home/GroupLeaderLayout";
import ParentLayout from "@/components/layouts/home/ParentLayout";
import UserLayout from "@/components/layouts/home/UserLayout";
import { useAuth } from "@/hooks/useAuth";
import { UserRoles } from "@/types/roles";
import { useMemo } from "react";

const Home = () => {
  const { user } = useAuth()

  const activeLayout = useMemo(() => {
    switch (user?.role) {
      case UserRoles.CAMP_LEADER:
        return <CampLeaderLayout />;
      case UserRoles.GROUP_LEADER:
        return <GroupLeaderLayout />;
      case UserRoles.PARENT:
        return <ParentLayout />;
      case UserRoles.USER:
        return <UserLayout />;
      default:
        return <Loading />;
    }
  }, [user])
  //const [showModal, setShowModal] = useState(false)

  return (
    <BaseLayout>
      {activeLayout}
    </BaseLayout>
  );
}

export default Home

{/* <Box className="bg-secondary-500 justify-center items-center">
        <Text className="text-typography-950 text-2xl font-pbold text-center">Hello</Text>
      </Box>
      <CustomButton title="Profile" isPrimary={true} handlePress={() => setShowModal(true)} containerStyles="mt-5 w-[200px]" /> */}
{/* <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton></ModalCloseButton>
          </ModalHeader>
          <ModalBody />
          <ModalFooter />
        </ModalContent>
      </Modal> */}
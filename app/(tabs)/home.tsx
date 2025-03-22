import CustomButton from "@/components/custom/CustomButton";
import { getRGBColor } from "@/components/ui/gluestack-ui-provider/colors";
import { icons } from "@/constants";
import { useColorScheme } from "nativewind";
import { Image, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { colorScheme } = useColorScheme();
  //const [showModal, setShowModal] = useState(false)

  return (
    <SafeAreaView className='bg-background-0 w-full h-full'>
      <View className="items-end mx-5 mt-5">
        <Image
          source={icons.settings}
          resizeMode="contain"
          className="w-8 h-8"
          style={{
            tintColor: getRGBColor("typography", "700", colorScheme)
          }}
        />
      </View>
      <View className="h-1/4 m-5">
        <CustomButton handlePress={() => { }} containerStyles="h-full border-2 border-tertiary-500" />
      </View>
      <View className="h-1/4 m-5">
        <CustomButton handlePress={() => { }} containerStyles="h-full border-2 border-tertiary-500" />
      </View>
      <View className="h-1/4 flex-row justify-between m-5">
        <View className="w-[47%]">
          <CustomButton handlePress={() => { }} containerStyles="h-full border-2 border-tertiary-500" />
        </View>
        <View className="w-[47%]">
          <CustomButton handlePress={() => { }} containerStyles="h-full border-2 border-tertiary-500" />
        </View>
      </View >
    </SafeAreaView>
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
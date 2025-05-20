// Coppied from Expo template project
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

const COUNT = 4; // Number of times the wave will repeat

const HelloWave = () => {
  const rotationAnimation = useSharedValue(0);
  const [repeatFlag, setRepeatFlag] = useState(false);

  useEffect(() => {
    rotationAnimation.value = withRepeat(
      withSequence(withTiming(25, { duration: 150 }), withTiming(0, { duration: 150 })),
      COUNT
    );
  }, [rotationAnimation, repeatFlag]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setRepeatFlag((rep) => !rep)}>
        <Text className='text-5xl pt-2'>
          👋
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default HelloWave;
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  const translateY = useSharedValue(0);

  const bounceConfig = {
    damping: 2,
    stiffness: 80,
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const startBounceAnimation = () => {
    translateY.value = withRepeat(
      withSpring(20, bounceConfig, isFinished => {
        if (isFinished) {
          translateY.value = withSpring(0, bounceConfig);
        }
      }),
      -1,
      false,
    );
  };

  useEffect(() => {
    if (isLoading) {
      startBounceAnimation();
    } else {
      translateY.value = 0;
    }
    // eslint-disable-next-line
  }, [isLoading]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={[
          animatedStyle,
          {
            backgroundColor: '#5c62d4',
            width: 50,
            height: 50,
            borderRadius: 25,
          },
        ]}
      />
    </View>
  );
};

export default Loader;

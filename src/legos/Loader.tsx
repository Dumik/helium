import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

import { theme } from '../utils/theme';

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  const rotate = useSharedValue(0);

  const rotateConfig = {
    damping: 2,
    stiffness: 80,
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  });

  const startRotateAnimation = () => {
    rotate.value = withRepeat(
      withSpring(360, rotateConfig, isFinished => {
        if (isFinished) {
          rotate.value = withSpring(0, rotateConfig);
        }
      }),
      -1,
      false,
    );
  };

  useEffect(() => {
    if (isLoading) {
      startRotateAnimation();
    } else {
      rotate.value = 0;
    }
    // eslint-disable-next-line
  }, [isLoading]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={[
          animatedStyle,
          {
            width: 50,
            height: 50,
            borderRadius: 25,
            borderColor: theme.colors.primary,
            borderWidth: 4,
            borderStyle: 'solid',
            borderTopColor: 'transparent',
          },
        ]}
      />
    </View>
  );
};

export default Loader;

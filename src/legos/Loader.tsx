import React, {useEffect} from 'react';
import {View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

const Loader = ({isLoading}: {isLoading: boolean}) => {
  const scale = useSharedValue(1);

  const pulseConfig = {
    damping: 2,
  };

  const animatedScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const startPulseAnimation = () => {
    scale.value = withRepeat(withSpring(1.1, pulseConfig), -1, true);
  };

  useEffect(() => {
    if (isLoading) {
      startPulseAnimation();
    } else {
      scale.value = 1;
    }
    // eslint-disable-next-line
  }, [isLoading]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        style={[
          animatedScaleStyle,
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

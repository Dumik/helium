import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const StatisticIcon = (props: any) => (
  <Svg
    width={props.size || 30}
    height={props.size || 30}
    viewBox="0 0 24 24"
    fill={props.color}
    {...props}>
    <Path d="M5 20V8.2A.2.2 0 0 1 5.2 8H7.8a.2.2 0 0 1 .2.2V20" />
    <Path d="M11 20V4.26667C11 4.11939 11.08954 4 11.2 4h2.6c.11046 0 .2.11939.2.26667V20" />
    <Path d="M17 20V11.15c0-.08284.08954-.15.2-.15h2.6c.11046 0 .2.06716.2.15V20" />
  </Svg>
);

export default StatisticIcon;

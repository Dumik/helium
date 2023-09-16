import React from 'react';
import { ViewStyle, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { SelectStyled } from './styled';
import { theme } from '../../utils/theme';

interface SelectProps {
  width?: number;
  placeholderText?: string;
  selectedValue: string | null;
  onValueChange: (value: string | null) => void;
  items: { label: string; value: string }[];
  style?: ViewStyle;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  width = 340,
  placeholderText = 'Select...',
  selectedValue,
  onValueChange,
  items,
  style,
  disabled,
}) => {
  const isIOS = Platform.OS === 'ios';
  return (
    <SelectStyled
      //@ts-ignore
      paddingTop={isIOS ? 12 : '0'}
      paddingBottom={isIOS ? 12 : '0'}
      width={width}
      bgColor={disabled ? theme.colors.grayLight : theme.colors.white}
      style={style}>
      <RNPickerSelect
        placeholder={{ label: placeholderText, value: null }}
        value={selectedValue}
        disabled={disabled}
        onValueChange={onValueChange}
        items={items}
        style={{
          placeholder: {
            color: theme.colors.gray,
          },
          inputIOS: {
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          },
          inputAndroid: {
            padding: 0,
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
    </SelectStyled>
  );
};

export default Select;

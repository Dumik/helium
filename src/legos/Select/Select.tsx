import React from 'react';
import { ViewStyle } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { SelectStyled } from './styled';

interface SelectProps {
  width?: number;
  placeholderText?: string;
  selectedValue: string | null;
  onValueChange: (value: string | null) => void;
  items: { label: string; value: string }[];
  style?: ViewStyle;
}

const Select: React.FC<SelectProps> = ({
  width = 340,
  placeholderText = 'Select...',
  selectedValue,
  onValueChange,
  items,
  style,
}) => {
  return (
    <SelectStyled width={width} style={style}>
      <RNPickerSelect
        placeholder={{ label: placeholderText, value: null }}
        value={selectedValue}
        onValueChange={onValueChange}
        items={items}
        style={{
          inputIOS: {
            color: '#555',
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

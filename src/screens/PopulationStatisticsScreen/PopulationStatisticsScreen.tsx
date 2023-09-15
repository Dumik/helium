import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import { RootState, fetchPopulationData, PopulationData } from '../../store';
import PopulationChart from './PopulationChart';
import {
  LoaderContainerStyled,
  SelectStyled,
  SelectedContainerStyled,
  StyledText,
} from './styled';
import Loader from '../../legos/Loader';
import PopulationLineChart from './PopulationLineChart';

const PopulationStatisticsScreen: React.FC = () => {
  const [selectedYear1, setSelectedYear1] = useState('0');
  const [selectedYear2, setSelectedYear2] = useState('0');
  const [selectedCountry, setSelectedCountry] = useState('');

  const dispatch = useDispatch<any>();

  const populationData = useSelector(
    (state: RootState) => state.population.data.data,
  );

  const isLoading = useSelector((state: RootState) => state.population.loading);
  const error = useSelector((state: RootState) => state.population.error);

  const chartOpacity = useSharedValue(1);
  const chartScaleX = useSharedValue(1);
  const chartScaleY = useSharedValue(1);

  const fadeInChart = () => {
    chartOpacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const updateChartWithAnimation = () => {
    chartOpacity.value = withTiming(
      0,
      { duration: 500, easing: Easing.inOut(Easing.ease) },
      () => {
        runOnJS(fadeInChart)();
      },
    );
  };

  const calculateYearsBetween = (
    selectedYear1: number,
    selectedYear2: number,
  ): string[] => {
    const yearsBetween = Array.from(
      { length: Math.abs(selectedYear2 - selectedYear1) + 1 },
      (_, index) => (Math.min(selectedYear1, selectedYear2) + index).toString(),
    );

    return yearsBetween;
  };

  const uniqueYears = useMemo(() => {
    const yearsSet = new Set();
    populationData?.forEach(item => {
      yearsSet.add(item.Year);
    });
    return Array.from(yearsSet);
  }, [populationData]);

  const availableYearsForYear2 = useMemo(() => {
    return uniqueYears.filter(year => year !== selectedYear1);
  }, [uniqueYears, selectedYear1]);

  const uniqueCountries = useMemo(() => {
    const countriesSet = new Set();
    populationData?.forEach(item => {
      countriesSet.add(item.Nation);
    });
    return Array.from(countriesSet);
  }, [populationData]);

  const populationDataForSelectedCountry: PopulationData[] = useMemo(() => {
    if (selectedCountry) {
      return populationData?.filter(item => item.Nation === selectedCountry);
    }
    return [];
  }, [selectedCountry, populationData]);

  useEffect(() => {
    dispatch(fetchPopulationData());
  }, [dispatch]);

  return (
    <ScrollView>
      {isLoading ? (
        <LoaderContainerStyled>
          <Loader isLoading={isLoading} />
        </LoaderContainerStyled>
      ) : (
        <View>
          <StyledText marginTop={30}>Select country and years</StyledText>
          <SelectedContainerStyled>
            <SelectStyled width={340}>
              <RNPickerSelect
                placeholder={{ label: 'Select Country', value: null }}
                value={selectedCountry}
                onValueChange={value => {
                  setSelectedCountry(value);
                }}
                items={uniqueCountries.map(country => ({
                  label: `${country}`,
                  value: `${country}`,
                }))}
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
          </SelectedContainerStyled>
          <SelectedContainerStyled>
            <SelectStyled>
              <RNPickerSelect
                placeholder={{ label: 'Select Year', value: null }}
                value={selectedYear1}
                onValueChange={value => {
                  setSelectedYear1(value);
                  updateChartWithAnimation();
                }}
                items={uniqueYears.map(year => ({
                  label: `${year}`,
                  value: `${year}`,
                }))}
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

            <SelectStyled>
              <RNPickerSelect
                placeholder={{ label: 'Select Year', value: null }}
                value={selectedYear2}
                onValueChange={value => {
                  setSelectedYear2(value);
                  updateChartWithAnimation();
                }}
                items={availableYearsForYear2.map(year => ({
                  label: `${year}`,
                  value: `${year}`,
                }))}
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
          </SelectedContainerStyled>
          <StyledText marginTop={30}>Statistic between two years</StyledText>
          <Animated.View
            style={{
              alignItems: 'center',
              opacity: chartOpacity,
              transform: [{ scaleX: chartScaleX }, { scaleY: chartScaleY }],
            }}>
            <PopulationChart
              data={populationDataForSelectedCountry}
              selectedYears={[selectedYear1, selectedYear2]}
            />
          </Animated.View>
          <StyledText>Statistic of range years</StyledText>
          <Animated.View
            style={{
              alignItems: 'center',
              opacity: chartOpacity,
              transform: [{ scaleX: chartScaleX }, { scaleY: chartScaleY }],
            }}>
            <PopulationLineChart
              data={populationDataForSelectedCountry}
              selectedYears={calculateYearsBetween(
                +selectedYear1,
                +selectedYear2,
              )}
            />
          </Animated.View>

          {error && <Text>Error: {`${error}`}</Text>}
        </View>
      )}
    </ScrollView>
  );
};

export default PopulationStatisticsScreen;

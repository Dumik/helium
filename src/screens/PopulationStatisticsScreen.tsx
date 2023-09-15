import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import {RootState, fetchPopulationData} from '../store';
import PopulationChart from './PopulationChart';
import {
  LoaderContainerStyled,
  SelectStyled,
  SelectedContainerStyled,
} from './styled';
import Loader from '../legos/Loader';
import PopulationLineChart from './PopulationLineChart';

const PopulationStatisticsScreen: React.FC = () => {
  const [selectedYear1, setSelectedYear1] = useState('');
  const [selectedYear2, setSelectedYear2] = useState('');

  const dispatch = useDispatch<any>();

  const populationData = useSelector(
    (state: RootState) => state.population.data.data,
  );

  const isLoading = useSelector((state: RootState) => state.population.loading);
  const error = useSelector((state: RootState) => state.population.error);

  const chartOpacity = useSharedValue(1);
  const chartScaleX = useSharedValue(1);
  const chartScaleY = useSharedValue(1);

  useEffect(() => {
    dispatch(fetchPopulationData());
  }, [dispatch]);

  const updateChartWithAnimation = () => {
    chartOpacity.value = withTiming(
      0,
      {duration: 500, easing: Easing.inOut(Easing.ease)},
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
      {length: Math.abs(selectedYear2 - selectedYear1) + 1},
      (_, index) => (Math.min(selectedYear1, selectedYear2) + index).toString(),
    );

    return yearsBetween;
  };

  const fadeInChart = () => {
    chartOpacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
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

  useEffect(() => {
    if (
      !selectedYear1 &&
      !selectedYear2 &&
      !isLoading &&
      uniqueYears &&
      availableYearsForYear2
    ) {
      setSelectedYear1(uniqueYears[0] as string);
      setSelectedYear2(uniqueYears[1] as string);
    }
  }, [
    availableYearsForYear2,
    isLoading,
    selectedYear1,
    selectedYear2,
    uniqueYears,
  ]);

  console.log(
    '%c jordan yearsBetween',
    'color: lime;',
    calculateYearsBetween(+selectedYear1, +selectedYear2),
  );

  return (
    <ScrollView>
      {isLoading || (!selectedYear1 && !selectedYear2) ? (
        <LoaderContainerStyled>
          <Loader isLoading={isLoading || (!selectedYear1 && !selectedYear2)} />
        </LoaderContainerStyled>
      ) : (
        <View>
          <SelectedContainerStyled>
            <SelectStyled>
              <RNPickerSelect
                placeholder={{label: 'Select Year', value: null}}
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
                placeholder={{label: 'Select Year', value: null}}
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

          <Animated.View
            style={{
              alignItems: 'center',
              opacity: chartOpacity,
              transform: [{scaleX: chartScaleX}, {scaleY: chartScaleY}],
            }}>
            <PopulationChart
              data={populationData}
              selectedYears={[selectedYear1, selectedYear2]}
            />
          </Animated.View>
          <Animated.View
            style={{
              alignItems: 'center',
              opacity: chartOpacity,
              transform: [{scaleX: chartScaleX}, {scaleY: chartScaleY}],
            }}>
            <PopulationLineChart
              data={populationData}
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

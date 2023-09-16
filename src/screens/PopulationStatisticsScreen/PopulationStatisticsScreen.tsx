import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import FlashMessage, { showMessage } from 'react-native-flash-message';

import PopulationChart from './PopulationChart';
import PopulationLineChart from './PopulationLineChart';
import {
  LoaderContainerStyled,
  SelectedContainerStyled,
  StyledText,
} from './styled';
import { RootState, fetchPopulationData, PopulationData } from '../../store';
import Loader from '../../legos/Loader';
import Select from '../../legos/Select/Select';

const PopulationStatisticsScreen: React.FC = () => {
  // Define component-level state variables
  const [selectedYear1, setSelectedYear1] = useState('0');
  const [selectedYear2, setSelectedYear2] = useState('0');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const dispatch = useDispatch<any>();

  // Select relevant data from the Redux store
  const populationData = useSelector(
    (state: RootState) => state.population.data.data,
  );
  const isLoading = useSelector((state: RootState) => state.population.loading);
  const error = useSelector((state: RootState) => state.population.error);

  // Define shared animation values for chart animations
  const chartOpacity = useSharedValue(1);
  const chartScaleX = useSharedValue(1);
  const chartScaleY = useSharedValue(1);

  // Define a function to fade in the chart with animation
  const fadeInChart = () => {
    chartOpacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
  };

  // Define a function to update the chart with animation
  const updateChartWithAnimation = () => {
    chartOpacity.value = withTiming(
      0,
      { duration: 500, easing: Easing.inOut(Easing.ease) },
      () => {
        runOnJS(fadeInChart)();
      },
    );
  };

  // Calculate an array of years between selectedYear1 and selectedYear2
  const calculateYearsBetween = () => {
    const yearsBetween = Array.from(
      { length: Math.abs(+selectedYear2 - +selectedYear1) + 1 },
      (_, index) =>
        (Math.min(+selectedYear1, +selectedYear2) + index).toString(),
    );
    return yearsBetween;
  };

  // Use useMemo to extract unique countries from the populationData
  const uniqueCountries = useMemo(() => {
    const countriesSet = new Set();
    populationData?.forEach(item => {
      countriesSet.add(item.Nation);
    });
    return Array.from(countriesSet);
  }, [populationData]);

  // Filter populationData for the selected country
  const populationDataForSelectedCountry: PopulationData[] = useMemo(() => {
    if (selectedCountry) {
      return populationData?.filter(item => item.Nation === selectedCountry);
    }
    return [];
  }, [selectedCountry, populationData]);

  // Use useMemo to extract unique years from the populationData
  const uniqueYears = useMemo(() => {
    const yearsSet = new Set();
    populationDataForSelectedCountry?.forEach(item => {
      yearsSet.add(item.Year);
    });
    return Array.from(yearsSet);
  }, [populationDataForSelectedCountry]);

  // Calculate available years for selectedYear2 based on selectedYear1
  const availableYearsForYear2 = useMemo(() => {
    return uniqueYears.filter(year => year !== selectedYear1);
  }, [uniqueYears, selectedYear1]);

  const showFlashMessage = () => {
    showMessage({
      message: 'Something is wrong',
      type: 'danger',
      description: error || 'Something is wrong, try again later',
      duration: 10000,
    });
  };

  // Dispatch an action to fetch population data when the component mounts
  useEffect(() => {
    dispatch(fetchPopulationData());
  }, [dispatch]);

  // Show an error message if there's an error in the Redux state
  useEffect(() => {
    if (error) {
      showFlashMessage();
    }
  }, [error]);

  return (
    <ScrollView>
      {isLoading ? (
        // Display a loader if data is loading
        <LoaderContainerStyled>
          <Loader isLoading={isLoading} />
        </LoaderContainerStyled>
      ) : (
        <View>
          {/* @ts-ignore */}
          <StyledText marginTop={30}>Select country and years</StyledText>
          <SelectedContainerStyled>
            {/* Render a Select component to select a country */}
            <Select
              placeholderText="Select Country"
              selectedValue={selectedCountry}
              onValueChange={value => {
                setSelectedCountry(value as string);
              }}
              items={uniqueCountries.map(country => ({
                label: `${country}`,
                value: `${country}`,
              }))}
            />
          </SelectedContainerStyled>
          <SelectedContainerStyled>
            {/* Render Select components to select years */}
            <Select
              width={162}
              placeholderText="Select Year"
              selectedValue={selectedYear1}
              onValueChange={value => {
                setSelectedYear1(value as string);
                updateChartWithAnimation();
              }}
              items={uniqueYears.map(year => ({
                label: `${year}`,
                value: `${year}`,
              }))}
              disabled={!selectedCountry}
            />

            <Select
              width={160}
              placeholderText="Select Year"
              selectedValue={selectedYear2}
              onValueChange={value => {
                setSelectedYear2(value as string);
                updateChartWithAnimation();
              }}
              items={availableYearsForYear2.map(year => ({
                label: `${year}`,
                value: `${year}`,
              }))}
              disabled={!selectedCountry}
            />
          </SelectedContainerStyled>

          {/* @ts-ignore */}
          <StyledText marginTop={30} fontSize={20}>
            Statistic between two years
          </StyledText>
          <Animated.View
            style={{
              alignItems: 'center',
              opacity: chartOpacity,
              transform: [{ scaleX: chartScaleX }, { scaleY: chartScaleY }],
            }}>
            {/* Render the PopulationChart component */}
            <PopulationChart
              data={populationDataForSelectedCountry}
              selectedYears={[selectedYear1, selectedYear2]}
            />
          </Animated.View>

          {/* @ts-ignore */}
          <StyledText fontSize={20}>Statistic of range years</StyledText>
          <Animated.View
            style={{
              alignItems: 'center',
              opacity: chartOpacity,
              transform: [{ scaleX: chartScaleX }, { scaleY: chartScaleY }],
            }}>
            {/* Render the PopulationLineChart component */}
            <PopulationLineChart
              data={populationDataForSelectedCountry}
              selectedYears={calculateYearsBetween()}
            />
          </Animated.View>
        </View>
      )}
      {/* Render FlashMessage component for displaying messages */}
      <FlashMessage position="top" />
    </ScrollView>
  );
};

export default PopulationStatisticsScreen;

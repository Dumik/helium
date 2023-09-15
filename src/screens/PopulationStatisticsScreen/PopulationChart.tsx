import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { PopulationData } from 'store';

const PopulationChart = ({
  data,
  selectedYears,
}: {
  data: PopulationData[];
  selectedYears: string[];
}) => {
  if (!data || !selectedYears || selectedYears.length !== 2) {
    return null;
  }

  const filteredData = data.filter(item =>
    selectedYears.includes(item.Year.toString()),
  );

  const labels = filteredData.map(item => item.Year.toString());

  const populationData = filteredData.map(item => {
    const populationInMillions = item.Population / 1000000;
    if (populationInMillions >= 1) {
      return populationInMillions.toFixed(3);
    } else {
      return item.Population?.toFixed(0);
    }
  });
  console.log('%c jordan labels', 'color: lime;', labels, populationData);

  const chartData = {
    labels: labels.length ? labels : ['0'],
    datasets: [
      {
        data: populationData.length ? populationData : ['0'],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#5c62d4',
    backgroundGradientFrom: '#555ABE',
    backgroundGradientTo: '#9396de',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
      paddingTop: 20,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#5c62d4',
    },
    yAxisLabel: '',
  };

  return (
    <BarChart
      //@ts-ignore
      data={chartData}
      width={340}
      height={220}
      yAxisSuffix="M"
      chartConfig={chartConfig}
      verticalLabelRotation={0}
      fromZero
      style={{
        marginVertical: 16,
        borderRadius: 16,
      }}
    />
  );
};

export default PopulationChart;

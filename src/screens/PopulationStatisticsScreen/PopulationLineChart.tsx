import React from 'react';
import { LineChart } from 'react-native-chart-kit';

import { PopulationData } from 'store';

const PopulationLineChart = ({
  data,
  selectedYears,
}: {
  data: PopulationData[];
  selectedYears: string[];
}) => {
  // Filter data to include only the selected years
  const filteredData = data.filter(item => {
    return selectedYears.includes(item.Year.toString());
  });

  // Extract labels (years) and population data for the chart
  const labels = filteredData.map(item => {
    return item.Year.toString();
  });

  const populationData = filteredData.map(item => {
    // Format population values (in millions or whole numbers)
    const populationInMillions = item.Population / 1000000;
    if (populationInMillions >= 1) {
      return populationInMillions.toFixed(3);
    } else {
      return item.Population?.toFixed(0);
    }
  });

  // Define chart data with labels and population data
  const chartData = {
    labels: labels.length ? labels.reverse() : ['0'], // Reverse labels for chronological order
    datasets: [
      {
        data: populationData.length ? populationData.reverse() : [100], // Reverse data for chronological order
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Population'],
  };

  // Define chart configuration including styles and colors
  const chartConfig = {
    backgroundColor: '#5c62d4',
    backgroundGradientFrom: '#999ce5',
    backgroundGradientTo: '#555ABE',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#5c62d4',
    },
    yAxisLabel: '',
  };

  return (
    <LineChart
      //@ts-ignore
      data={chartData}
      width={340}
      height={200}
      verticalLabelRotation={20}
      chartConfig={chartConfig}
      bezier
      style={{
        marginVertical: 16,
        borderRadius: 16,
        marginTop: 10,
        marginBottom: 50,
      }}
    />
  );
};

export default PopulationLineChart;

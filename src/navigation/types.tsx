export enum Screens {
  StatisticsPopulations = 'Statistics',
  FavoriteCountryPopulations = 'FavoriteCountry',
  Tabs = 'Tabs',
}

export type RootStackParamList = {
  [Screens.StatisticsPopulations]: undefined;
  [Screens.FavoriteCountryPopulations]: undefined;
  [Screens.Tabs]: undefined;
};

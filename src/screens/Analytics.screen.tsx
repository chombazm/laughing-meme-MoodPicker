import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppContext } from './App.provider';
import { groupBy } from 'lodash';
import { VictoryPie } from 'victory-native';

export const Analytics: React.FC = () => {
  const appContext = useAppContext();
  const data = Object.entries(groupBy(appContext.moodList, 'mood.emoji')).map(
    ([key, value]) => ({
      x: key,
      y: value.length,
    }),
  );

  return (
    <View style={styeles.container}>
      <VictoryPie
        data={data}
        colorScale={['tomato', 'orange', 'gold', 'lavender', 'magenta']}
      />
    </View>
  );
};

const styeles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { MoodItemRow } from '../components/MoodItemRow';
import { MoodPicker } from '../components/MoodPicker';
import { MoodOptionTypes, MoodOptionWithTimestamp } from '../types';

export const Home: React.FC = () => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectedMood = React.useCallback((mood: MoodOptionTypes) => {
    setMoodList(prevState => [
      ...prevState,
      { mood, timestamp: new Date().getTime() },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <MoodPicker onSelect={handleSelectedMood} />
      {moodList.map(item => (
        <MoodItemRow item={item} key={item.timestamp} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

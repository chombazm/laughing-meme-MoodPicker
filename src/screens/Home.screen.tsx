import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { MoodOptionTypes, MoodOptionWithTimestamp } from '../types';

export const Home: React.FC = () => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectedMood = React.useCallback((moodList: MoodOptionTypes) => {
    setMoodList(prevState => [
      ...prevState,
      { ...moodList, timestamp: new Date().getTime() },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <MoodPicker onSelect={handleSelectedMood} />
      {moodList.map(item => (
        <Text key={item.timestamp}>
          {item.emoji} - {new Date(item.timestamp).toString()}
        </Text>
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

import { View, Image, Text, StyleSheet } from 'react-native';
import React from 'react';
import { MoodOptionTypes } from '../types';

const celebratoryGif = require('../../assets/celebratory.gif');
const happyGif = require('../../assets/happy.gif');
const frustratedGif = require('../../assets/frustrated.gif');
const pensiveGif = require('../../assets/pensive.gif');
const clapDefault = require('../../assets/clap.gif');

type AddGifProps = {
  mood: MoodOptionTypes;
};
export const AddGif: React.FC<AddGifProps> = ({ mood }) => {
  const [gif, setGif] = React.useState(celebratoryGif);
  // set gif based on mood

  React.useState(() => {
    switch (mood.description) {
      case 'celebratory':
        setGif(celebratoryGif);
        break;
      case 'happy':
        setGif(happyGif);
        break;
      case 'frustrated':
        setGif(frustratedGif);
        break;
      case 'pensive':
        setGif(pensiveGif);
        break;
      default:
        setGif(clapDefault);
    }
  }, [mood]);

  return (
    <View style={styles.container}>
      <Image source={gif} style={styles.gifImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  gifImage: {
    width: 100,
    alignContent: 'center',
    alignSelf: 'center',
    height: 100,
  },
});

import React from 'react';
import { MoodOptionTypes, MoodOptionWithTimestamp } from '../types';
import { constants } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppData = {
  moodList: MoodOptionWithTimestamp[];
};

const setAppData = async (appData: AppData) => {
  try {
    if (appData) {
      await AsyncStorage.setItem(constants.dataKey, JSON.stringify(appData));
    }
  } catch {
    return null;
  }
};

const getAppData = async (): Promise<AppData | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(constants.dataKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch {
    return null;
  }
};

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectedMood: (mood: MoodOptionTypes) => void;
  handleDeleteMood: (mood: MoodOptionWithTimestamp) => void;
};
const defaultValue = {
  moodList: [],
  handleSelectedMood: () => {},
  handleDeleteMood: () => {},
};

type AppProviderProps = {
  children: React.ReactNode;
};

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectedMood = React.useCallback((mood: MoodOptionTypes) => {
    setMoodList(prevState => {
      const newValue = [
        ...prevState,
        { mood, timestamp: new Date().getTime() },
      ];
      setAppData({ moodList: newValue });
      return newValue;
    });
  }, []);

  const handleDeleteMood = React.useCallback(
    (mood: MoodOptionWithTimestamp) => {
      setMoodList(current => {
        const newValue = current.filter(
          item => item.timestamp !== mood.timestamp,
        );
        setAppData({ moodList: newValue });
        return newValue;
      });
    },
    [],
  );

  React.useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.moodList);
      }
    };
    getDataFromStorage();
  }, []);
  return (
    <AppContext.Provider
      value={{ moodList, handleSelectedMood, handleDeleteMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext) as AppContextType;

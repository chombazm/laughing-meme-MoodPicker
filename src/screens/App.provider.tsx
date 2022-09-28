import React from 'react';
import { MoodOptionTypes, MoodOptionWithTimestamp } from '../types';

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectedMood: (mood: MoodOptionTypes) => void;
};
const defaultValue = {
  moodList: [],
  handleSelectedMood: () => {},
};

type AppProviderProps = {
  children: React.ReactNode;
};

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectedMood = React.useCallback((mood: MoodOptionTypes) => {
    setMoodList(prevState => [
      ...prevState,
      { mood, timestamp: new Date().getTime() },
    ]);
  }, []);
  return (
    <AppContext.Provider value={{ moodList, handleSelectedMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);

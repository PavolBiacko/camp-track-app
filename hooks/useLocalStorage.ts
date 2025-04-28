import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setStoredValue(JSON.parse(value));
        }
      } catch (error) {
        console.error(`Error loading ${key} from AsyncStorage:`, error);
      }
    };
    loadStoredValue();
  }, [key]);

  useEffect(() => {
    const saveStoredValue = async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(`Error saving ${key} to AsyncStorage:`, error);
      }
    };
    saveStoredValue();
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};

export default useLocalStorage;
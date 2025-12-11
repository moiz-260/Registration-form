import { useState, useEffect } from "react";

interface UseLocalStorageOptions<T> {
  key: string;
  initialValue: T;
}

export function useLocalStorage<T>({
  key,
  initialValue,
}: UseLocalStorageOptions<T>) {
  // Get initial value from localStorage or use default
  const getStoredValue = (): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Save to localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [key, storedValue]);

  const clearStorage = () => {
    localStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  return [storedValue, setStoredValue, clearStorage] as const;
}
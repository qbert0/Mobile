import { useState } from "react";

export const useLocalStorage = (key: string) => {
    const setItem = (value: unknown) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    };

    const setAnother = ( keya : string) => {
      try {
        window.localStorage.setItem(keya, JSON.stringify('0'));
      } catch (error) {
        console.log(error);
      }
    }
  
    const getItem = () => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
      } catch (error) {
        console.log(error);
      }
    };
  
    const removeItem = () => {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.log(error);
      }
    };
  
    return { setItem,setAnother, getItem, removeItem };
  };
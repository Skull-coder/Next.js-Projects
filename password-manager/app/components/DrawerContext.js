"use client";
import { createContext, useContext, useState } from "react";

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [isAPOpen, setIsAPOpen] = useState(false);
  const [isGPOpen, setIsGPOpen] = useState(false);

  const openDrawer = () => setIsAPOpen(true);
  const closeDrawer = () => setIsAPOpen(false);
  
  const GPopenDrawer = () => setIsGPOpen(true);
  const GPcloseDrawer = () => setIsGPOpen(false);

  return (
    <DrawerContext.Provider value={{ isAPOpen, openDrawer, closeDrawer, isGPOpen, GPcloseDrawer, GPopenDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);

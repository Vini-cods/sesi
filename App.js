import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CarregamentoScreen from './CarregamentoScreen';
import InicioScreen from './InicioScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <CarregamentoScreen />;
  }

  return <InicioScreen />;
}
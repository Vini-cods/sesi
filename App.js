import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarregamentoScreen from './CarregamentoScreen';
import InicioScreen from './InicioScreen';
import TelaDesperdicioScreen from './TelaDesperdicioScreen';
import TelaPesquisaScreen from './TelaPesquisaScreen';
import CadastroScreen from './CadastroScreen';
import LoginScreen from './LoginScreen';

const Stack = createNativeStackNavigator();

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

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="TelaDesperdicio" component={TelaDesperdicioScreen} />
        <Stack.Screen name="Pesquisa" component={TelaPesquisaScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

// Importe suas telas do app
import Home from './Home';
import FloatingNavBar from '@/components/FloatingNavBar';

// 1. Crie a tipagem para as rotas das abas
export type AppTabParamList = {
  Home: undefined;
  Progress: undefined;
  Profile: undefined;
};

// Telas provisórias para Progresso e Perfil enquanto você não as cria
const ProgressPlaceholder = () => <View className="flex-1 bg-neutral items-center justify-center"><Text className="text-on-tertiary font-bold">Progresso em breve</Text></View>;
const ProfilePlaceholder = () => <View className="flex-1 bg-neutral items-center justify-center"><Text className="text-on-tertiary font-bold">Perfil em breve</Text></View>;

// 2. Passe a tipagem para o construtor do Tab
const Tab = createBottomTabNavigator<AppTabParamList>();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <FloatingNavBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Progress" component={ProgressPlaceholder} />
      <Tab.Screen name="Profile" component={ProfilePlaceholder} />
    </Tab.Navigator>
  );
}
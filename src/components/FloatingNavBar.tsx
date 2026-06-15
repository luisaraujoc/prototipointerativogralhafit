import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function FloatingNavBar({ state, navigation }: BottomTabBarProps) {
  // state.index diz qual é a aba ativa no momento (0, 1 ou 2)
  const activeIndex = state.index;

  const tabs = [
    { route: 'Home', label: 'Meu Plano', icon: 'share-2' as const },
    { route: 'Progress', label: 'Progresso', icon: 'bar-chart-2' as const },
    { route: 'Profile', label: 'Perfil', icon: 'user' as const },
  ];

  return (
    <View className="absolute bottom-xl left-lg right-lg bg-surface flex-row justify-around items-center p-sm rounded-lg border border-border shadow-sm">
      
      {tabs.map((tab, index) => {
        const isActive = activeIndex === index;

        return (
          <Pressable 
            key={tab.route}
            className={`flex-col items-center justify-center px-lg py-sm flex-1 ${
              isActive ? 'bg-neutral rounded-md' : 'opacity-50'
            }`}
            onPress={() => navigation.navigate(tab.route)}
          >
            <Feather name={tab.icon} size={20} className="text-on-tertiary mb-1" />
            <Text className="text-label-small text-on-tertiary font-bold uppercase tracking-widest">
              {tab.label}
            </Text>
          </Pressable>
        );
      })}

    </View>
  );
}
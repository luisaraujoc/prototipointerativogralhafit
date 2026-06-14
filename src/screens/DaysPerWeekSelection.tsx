import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

// 1. Tipagem das Props que vêm do Orquestrador
type Props = { 
  onNext: (days: number) => void; 
  onBack: () => void; 
  currentStep: number; 
  totalSteps: number; 
};

export default function DaysPerWeekSelection({ onNext, onBack, currentStep, totalSteps }: Props) {
  // Começando em 5, como na sua imagem de referência
  const [days, setDays] = useState(5);

  const handleDecrement = () => {
    if (days > 1) {
      setDays(prev => prev - 1);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleIncrement = () => {
    if (days < 7) {
      setDays(prev => prev + 1);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral px-lg">
      
      {/* 1. HEADER */}
      <View className="flex-row items-center justify-between mt-sm mb-lg">
        <Pressable
          onPress={onBack} // <-- CORRIGIDO PARA onBack
          className="w-12 h-12 bg-surface rounded-full items-center justify-center active:scale-90 active:opacity-80 transition-all"
        >
          <Feather name="chevron-left" size={24} color="var(--color-on-tertiary)" />
        </Pressable>
        <Text className="text-body-large text-on-tertiary font-bold tracking-widest">
          {currentStep} / {totalSteps} {/* <-- DINÂMICO! */}
        </Text>
        <View className="w-12 h-12" />
      </View>

      {/* 2. TÍTULO */}
      <Text className="text-display-small text-on-tertiary mb-md leading-tight tracking-tight mt-md">
        Com que frequência você gostaria de treinar?
      </Text>

      {/* 3. CONTADOR CENTRAL (Botões + Número) */}
      <View className="flex-1 items-center justify-center mb-xl">
        <View className="flex-row items-center justify-center gap-xl w-full px-md">
          
          {/* Botão de Menos */}
          <Pressable
            onPress={handleDecrement}
            disabled={days <= 1}
            className={`w-16 h-16 bg-surface rounded-full items-center justify-center transition-all ${
              days <= 1 ? 'opacity-30' : 'active:scale-90 active:opacity-80 shadow-sm'
            }`}
          >
            <Feather name="minus" size={32} color="var(--color-on-tertiary)" />
          </Pressable>

          {/* Número Gigante */}
          <Text 
            className="text-on-tertiary font-bold tracking-tighter text-center w-24" 
            style={{ fontSize: 96, lineHeight: 100 }}
          >
            {days}
          </Text>

          {/* Botão de Mais */}
          <Pressable
            onPress={handleIncrement}
            disabled={days >= 7}
            className={`w-16 h-16 bg-surface rounded-full items-center justify-center transition-all ${
              days >= 7 ? 'opacity-30' : 'active:scale-90 active:opacity-80 shadow-sm'
            }`}
          >
            <Feather name="plus" size={32} color="var(--color-on-tertiary)" />
          </Pressable>
          
        </View>

        {/* Legenda abaixo do número */}
        <Text className="text-body-large text-on-tertiary/50 mt-lg">
          {days === 1 ? 'dia por semana' : 'dias por semana'}
        </Text>
      </View>

      {/* 4. BOTÃO DE PRÓXIMO */}
      <Pressable 
        className="btn-primary mb-xl"
        onPress={() => onNext(days)} // <-- CORRIGIDO! Manda o valor selecionado
      >
        <Text className="btn-primary-text font-bold uppercase tracking-wider">
          Próximo
        </Text>
      </Pressable>

    </SafeAreaView>
  );
}
import React, { useState } from 'react';
import { View, Text, Pressable, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import WheelPicker from 'react-native-wheel-picker-expo';
import * as Haptics from 'expo-haptics';

const AGE_MIN = 15;
const AGE_MAX = 80;
const ageOptions = Array.from({ length: AGE_MAX - AGE_MIN + 1 }, (_, i) => ({
  label: `${i + AGE_MIN}`,
  value: i + AGE_MIN,
}));

type Props = { 
  onNext: (age: number) => void; 
  onBack: () => void; 
  currentStep: number; 
  totalSteps: number; 
};

export default function AgeSelection({ onNext, onBack, currentStep, totalSteps }: Props) {
  const initialAge = 24; 
  const [selectedAge, setSelectedAge] = useState(initialAge);

  // A MÁGICA 1: Índice Dinâmico!
  // Lê a idade selecionada atualmente para não perder a posição ao trocar de tema.
  const currentIndex = ageOptions.findIndex(option => option.value === selectedAge);

  // 1. Pegamos o tema do celular em tempo real
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // 2. Definimos o HEX exato do nosso `bg-neutral` para a biblioteca usar
  const pickerBgColor = isDark ? '#000713' : '#fcfcfc';

  return (
    <SafeAreaView className="flex-1 bg-neutral px-lg">
      
      {/* HEADER */}
      <View className="flex-row items-center justify-between mt-sm mb-lg">
        <Pressable
          onPress={onBack}
          className="w-12 h-12 bg-surface rounded-full items-center justify-center active:scale-90 active:opacity-80 transition-all"
        >
          <Feather name="chevron-left" size={24} color="var(--color-tertiary)" />
        </Pressable>
        <Text className="text-body-large text-on-tertiary font-bold tracking-widest">
          {currentStep} / {totalSteps}
        </Text>
        <View className="w-12 h-12" />
      </View>

      {/* TÍTULO */}
      <Text className="text-display-small text-on-tertiary mb-xl leading-tight tracking-tight mt-md">
        Qual a sua idade?
      </Text>

      {/* DISPLAY GIGANTE DA IDADE */}
      <View className="items-center mt-xl mb-xl">
        <Text 
          className="text-on-tertiary font-bold tracking-tighter" 
          style={{ fontSize: 96, lineHeight: 100 }}
        >
          {selectedAge}
        </Text>
      </View>

      {/* ROLETA */}
      <View className="flex-1 items-center justify-center w-full relative">
        
        <WheelPicker
          // A MÁGICA 2: O key amarrado ao colorScheme força o recarregamento instantâneo
          key={`age-picker-${colorScheme}`}
          initialSelectedIndex={currentIndex}
          items={ageOptions}
          onChange={({ item }) => {
            setSelectedAge(item.value);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          height={250}
          backgroundColor={pickerBgColor} 
          selectedStyle={{ 
            borderColor: 'transparent',
            borderWidth: 0,
          }}
          renderItem={(props) => {
            const isSelected = props.label === selectedAge.toString();
            return (
              <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text 
                  className={`transition-all ${
                    isSelected 
                      ? 'text-on-tertiary font-bold text-xl' 
                      : 'text-on-tertiary/30 text-body-large'
                  }`}
                >
                  {props.label}
                </Text>
              </View>
            );
          }}
        />

        {/* 3. A BARRA DE SELEÇÃO INVISÍVEL AO TOQUE! */}
        <View 
          className="absolute w-full bg-black/5 dark:bg-white/10" 
          style={{ height: 50, borderRadius: 14 }} 
          pointerEvents="none"
        />

      </View>

      {/* BOTÃO DE PRÓXIMO */}
      <Pressable 
        className="btn-primary mb-xl mt-auto"
        onPress={() => onNext(selectedAge)} 
      >
        <Text className="btn-primary-text font-bold uppercase tracking-wider">
          Próximo
        </Text>
      </Pressable>

    </SafeAreaView>
  );
}
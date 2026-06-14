import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import WheelPicker from 'react-native-wheel-picker-expo';
import * as Haptics from 'expo-haptics';

// 1. Geração das opções de idade (15 a 80 anos)
const AGE_MIN = 15;
const AGE_MAX = 80;
const ageOptions = Array.from({ length: AGE_MAX - AGE_MIN + 1 }, (_, i) => ({
  label: `${i + AGE_MIN}`,
  value: i + AGE_MIN,
}));

// 2. Definindo as Props que vêm do Orquestrador
type Props = { 
  onNext: (age: number) => void; 
  onBack: () => void; 
  currentStep: number; 
  totalSteps: number; 
};

export default function AgeSelection({ onNext, onBack, currentStep, totalSteps }: Props) {
  // 3. Configuração do estado inicial
  const initialAge = 24; 
  const initialIndex = ageOptions.findIndex(option => option.value === initialAge);
  const [selectedAge, setSelectedAge] = useState(initialAge);

  return (
    <SafeAreaView className="flex-1 bg-neutral px-lg">
      
      {/* HEADER: Botão Voltar + Contador */}
      <View className="flex-row items-center justify-between mt-sm mb-lg">
        <Pressable
          onPress={onBack}
          className="w-12 h-12 bg-surface rounded-full items-center justify-center active:scale-90 active:opacity-80 transition-all"
        >
          <Feather name="chevron-left" size={24} color="var(--color-on-tertiary)" />
        </Pressable>
        
        <Text className="text-body-large text-on-tertiary font-bold tracking-widest">
          {currentStep} / {totalSteps}
        </Text>
        
        {/* Espaçador para manter perfeitamente centralizado */}
        <View className="w-12 h-12" />
      </View>

      {/* TÍTULO DA PERGUNTA */}
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

      {/* ROLETA COM HAPTIC FEEDBACK */}
      <View className="flex-1 items-center justify-center w-full">
        
        <WheelPicker
          initialSelectedIndex={initialIndex}
          items={ageOptions}
          onChange={({ item }) => {
            setSelectedAge(item.value);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          height={250}
          // Fundo transparente para herdar a cor do bg-neutral
          // O Estilo customizado aplica o bg-surface apenas no item selecionado no meio
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
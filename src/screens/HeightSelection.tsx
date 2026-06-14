import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import WheelPicker from 'react-native-wheel-picker-expo';
import * as Haptics from 'expo-haptics';

// 1. Geração das opções para Centímetros
const CM_MAIN_OPTIONS = Array.from({ length: 151 }, (_, i) => ({ label: `${i + 100}`, value: i + 100 })); // 100 a 250
const CM_DECIMAL_OPTIONS = Array.from({ length: 10 }, (_, i) => ({ label: `${i}`, value: i })); // 0 a 9

// 2. Geração das opções para Pés e Polegadas (Feet / Inches)
const FT_MAIN_OPTIONS = Array.from({ length: 6 }, (_, i) => ({ label: `${i + 3}`, value: i + 3 })); // 3 a 8 pés
const FT_INCHES_OPTIONS = Array.from({ length: 12 }, (_, i) => ({ label: `${i}`, value: i })); // 0 a 11 polegadas

// 3. Tipagem das Props do Orquestrador
type Props = { 
  onNext: (heightInCm: number) => void; 
  onBack: () => void; 
  currentStep: number; 
  totalSteps: number; 
};

export default function HeightSelection({ onNext, onBack, currentStep, totalSteps }: Props) {
  // Estado da Unidade de Medida
  const [unit, setUnit] = useState<'CM' | 'FT'>('CM');

  // Estados para CM
  const [cmMain, setCmMain] = useState(182);
  const [cmDecimal, setCmDecimal] = useState(0);

  // Estados para FT
  const [ftMain, setFtMain] = useState(5);
  const [ftInches, setFtInches] = useState(11);

  // Índices Iniciais
  const initialCmMainIndex = CM_MAIN_OPTIONS.findIndex(o => o.value === 182);
  const initialCmDecIndex = CM_DECIMAL_OPTIONS.findIndex(o => o.value === 0);
  const initialFtMainIndex = FT_MAIN_OPTIONS.findIndex(o => o.value === 5);
  const initialFtIncIndex = FT_INCHES_OPTIONS.findIndex(o => o.value === 11);

  return (
    <SafeAreaView className="flex-1 bg-neutral px-lg">
      
      {/* HEADER */}
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
        <View className="w-12 h-12" />
      </View>

      {/* TÍTULO */}
      <Text className="text-display-small text-on-tertiary mb-md leading-tight tracking-tight mt-md">
        Qual a sua altura?
      </Text>

      {/* SELETOR DE UNIDADE */}
      <View className="flex-row bg-surface rounded-full p-1 mx-auto w-64 mb-xl mt-sm">
        <Pressable 
          onPress={() => {
            setUnit('CM');
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          className={`flex-1 py-3 items-center rounded-full transition-all ${unit === 'CM' ? 'bg-neutral shadow-sm' : ''}`}
        >
          <Text className={`font-bold tracking-widest ${unit === 'CM' ? 'text-on-tertiary' : 'text-on-tertiary/50'}`}>CM</Text>
        </Pressable>
        
        <Pressable 
          onPress={() => {
            setUnit('FT');
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          className={`flex-1 py-3 items-center rounded-full transition-all ${unit === 'FT' ? 'bg-neutral shadow-sm' : ''}`}
        >
          <Text className={`font-bold tracking-widest ${unit === 'FT' ? 'text-on-tertiary' : 'text-on-tertiary/50'}`}>FT</Text>
        </Pressable>
      </View>

      {/* DISPLAY GIGANTE */}
      <View className="flex-row items-end justify-center mb-xl">
        <Text className="text-on-tertiary font-bold tracking-tighter" style={{ fontSize: 96, lineHeight: 100 }}>
          {unit === 'CM' ? cmMain : ftMain}
        </Text>
        <Text className="text-on-tertiary font-bold text-2xl mb-4 ml-2">
          {unit === 'CM' ? 'cm' : `' ${ftInches}"`}
        </Text>
      </View>

      {/* A ROLETA DUPLA */}
      <View className="flex-1 items-center justify-center w-full relative">
        
        {/* OVERLAY DE FUNDO */}
        <View 
          className="absolute w-full bg-surface" 
          style={{ height: 50, borderRadius: 14 }} 
        />

        {/* Separador Visual (Vírgula aparece apenas no CM) */}
        <Text 
          className="absolute text-on-tertiary text-xl font-bold" 
          style={{ zIndex: 10, top: '50%', marginTop: -14, display: unit === 'CM' ? 'flex' : 'none' }}
        >
          ,
        </Text>

        {/* --- CONTAINER DAS ROLETAS DE CM (Oculta se for FT) --- */}
        <View className="flex-row w-full justify-between px-10" style={{ display: unit === 'CM' ? 'flex' : 'none' }}>
          <View className="flex-1">
            <WheelPicker
              initialSelectedIndex={initialCmMainIndex}
              items={CM_MAIN_OPTIONS}
              onChange={({ item }) => {
                setCmMain(item.value);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              height={250}
              backgroundColor="transparent"
              selectedStyle={{ borderColor: 'transparent' }}
              renderItem={(props) => {
                const isSelected = props.label === cmMain.toString();
                return (
                  <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text className={`transition-all ${isSelected ? 'text-on-tertiary font-bold text-xl' : 'text-on-tertiary/30 text-body-large'}`}>{props.label}</Text>
                  </View>
                );
              }}
            />
          </View>

          <View className="flex-1">
            <WheelPicker
              initialSelectedIndex={initialCmDecIndex}
              items={CM_DECIMAL_OPTIONS}
              onChange={({ item }) => {
                setCmDecimal(item.value);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              height={250}
              backgroundColor="transparent"
              selectedStyle={{ borderColor: 'transparent' }}
              renderItem={(props) => {
                const isSelected = props.label === cmDecimal.toString();
                return (
                  <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text className={`transition-all ${isSelected ? 'text-on-tertiary font-bold text-xl' : 'text-on-tertiary/30 text-body-large'}`}>{props.label}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>

        {/* --- CONTAINER DAS ROLETAS DE FT (Oculta se for CM) --- */}
        <View className="flex-row w-full justify-between px-10" style={{ display: unit === 'FT' ? 'flex' : 'none' }}>
          <View className="flex-1">
            <WheelPicker
              initialSelectedIndex={initialFtMainIndex}
              items={FT_MAIN_OPTIONS}
              onChange={({ item }) => {
                setFtMain(item.value);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              height={250}
              backgroundColor="transparent"
              selectedStyle={{ borderColor: 'transparent' }}
              renderItem={(props) => {
                const isSelected = props.label === ftMain.toString();
                return (
                  <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text className={`transition-all ${isSelected ? 'text-on-tertiary font-bold text-xl' : 'text-on-tertiary/30 text-body-large'}`}>{props.label}</Text>
                  </View>
                );
              }}
            />
          </View>

          <View className="flex-1">
            <WheelPicker
              initialSelectedIndex={initialFtIncIndex}
              items={FT_INCHES_OPTIONS}
              onChange={({ item }) => {
                setFtInches(item.value);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              height={250}
              backgroundColor="transparent"
              selectedStyle={{ borderColor: 'transparent' }}
              renderItem={(props) => {
                const isSelected = props.label === ftInches.toString();
                return (
                  <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text className={`transition-all ${isSelected ? 'text-on-tertiary font-bold text-xl' : 'text-on-tertiary/30 text-body-large'}`}>{props.label}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>

      </View>

      {/* BOTÃO DE PRÓXIMO */}
      <Pressable 
        className="btn-primary mb-xl mt-auto"
        onPress={() => {
          let finalHeightCm = 0;
          if (unit === 'CM') {
            finalHeightCm = cmMain + (cmDecimal / 10);
          } else {
            finalHeightCm = (ftMain * 30.48) + (ftInches * 2.54);
          }
          onNext(parseFloat(finalHeightCm.toFixed(1)));
        }}
      >
        <Text className="btn-primary-text font-bold uppercase tracking-wider">
          Próximo
        </Text>
      </Pressable>

    </SafeAreaView>
  );
}
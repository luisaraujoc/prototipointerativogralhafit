import React, { useState } from 'react';
import { View, Text, Pressable, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather } from '@expo/vector-icons';
import WheelPicker from 'react-native-wheel-picker-expo';
import * as Haptics from 'expo-haptics';
import { cssInterop } from 'nativewind';

// 1. Geração das opções para Centímetros
const CM_MAIN_OPTIONS = Array.from({ length: 151 }, (_, i) => ({ label: `${i + 100}`, value: i + 100 })); // 100 a 250
const CM_DECIMAL_OPTIONS = Array.from({ length: 10 }, (_, i) => ({ label: `${i}`, value: i })); // 0 a 9

// 2. Geração das opções para Pés e Polegadas (Feet / Inches)
const FT_MAIN_OPTIONS = Array.from({ length: 6 }, (_, i) => ({ label: `${i + 3}`, value: i + 3 })); // 3 a 8 pés
const FT_INCHES_OPTIONS = Array.from({ length: 12 }, (_, i) => ({ label: `${i}`, value: i })); // 0 a 11 polegadas

type Props = {
  onNext: (heightInCm: number) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
};

cssInterop(Feather, {
  className: {
    target: 'style',
    nativeStyleToProp: { color: true }
  },
});

cssInterop(AntDesign, {
  className: {
    target: 'style',
    nativeStyleToProp: { color: true }
  },
});

export default function HeightSelection({ onNext, onBack, currentStep, totalSteps }: Props) {
  const [unit, setUnit] = useState<'CM' | 'FT'>('CM');

  const [cmMain, setCmMain] = useState(182);
  const [cmDecimal, setCmDecimal] = useState(0);

  const [ftMain, setFtMain] = useState(5);
  const [ftInches, setFtInches] = useState(11);

  // A MÁGICA 1: Índices Dinâmicos! 
  // Agora eles leem o estado atual para não perder a posição quando o tema mudar.
  const currentCmMainIndex = CM_MAIN_OPTIONS.findIndex(o => o.value === cmMain);
  const currentCmDecIndex = CM_DECIMAL_OPTIONS.findIndex(o => o.value === cmDecimal);
  const currentFtMainIndex = FT_MAIN_OPTIONS.findIndex(o => o.value === ftMain);
  const currentFtIncIndex = FT_INCHES_OPTIONS.findIndex(o => o.value === ftInches);

  // Tema do Sistema
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const pickerBgColor = isDark ? '#000713' : '#fcfcfc';

  return (
    <SafeAreaView className="flex-1 bg-neutral px-lg">

      {/* HEADER */}
      <View className="flex-row items-center justify-between mt-sm mb-lg">
        <Pressable
          onPress={onBack}
          className="w-12 h-12 bg-surface rounded-full items-center justify-center active:scale-90 active:opacity-80 transition-all"
        >
          <Feather name="chevron-left" size={24} className="text-tertiary" />
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

        {/* --- CONTAINER DAS ROLETAS DE CM --- */}
        <View className="flex-row w-full justify-between px-10" style={{ display: unit === 'CM' ? 'flex' : 'none' }}>
          <View className="flex-1">
            <WheelPicker
              // A MÁGICA 2: O key amarrado ao colorScheme força o recarregamento instantâneo
              key={`cm-main-${colorScheme}`}
              initialSelectedIndex={currentCmMainIndex}
              items={CM_MAIN_OPTIONS}
              onChange={({ item }) => {
                setCmMain(item.value);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              height={250}
              backgroundColor={pickerBgColor}
              selectedStyle={{ borderColor: 'transparent', borderWidth: 0 }}
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
              key={`cm-dec-${colorScheme}`}
              initialSelectedIndex={currentCmDecIndex}
              items={CM_DECIMAL_OPTIONS}
              onChange={({ item }) => {
                setCmDecimal(item.value);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              height={250}
              backgroundColor={pickerBgColor}
              selectedStyle={{ borderColor: 'transparent', borderWidth: 0 }}
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

        {/* --- CONTAINER DAS ROLETAS DE FT --- */}
        <View className="flex-row w-full justify-between px-10" style={{ display: unit === 'FT' ? 'flex' : 'none' }}>
          <View className="flex-1">
            <WheelPicker
              key={`ft-main-${colorScheme}`}
              initialSelectedIndex={currentFtMainIndex}
              items={FT_MAIN_OPTIONS}
              onChange={({ item }) => {
                setFtMain(item.value);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              height={250}
              backgroundColor={pickerBgColor}
              selectedStyle={{ borderColor: 'transparent', borderWidth: 0 }}
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
              key={`ft-inc-${colorScheme}`}
              initialSelectedIndex={currentFtIncIndex}
              items={FT_INCHES_OPTIONS}
              onChange={({ item }) => {
                setFtInches(item.value);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              height={250}
              backgroundColor={pickerBgColor}
              selectedStyle={{ borderColor: 'transparent', borderWidth: 0 }}
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

        {/* A BARRA DE SELEÇÃO INVISÍVEL AO TOQUE! */}
        <View
          className="absolute w-full bg-black/5 dark:bg-white/10"
          style={{ height: 50, borderRadius: 14 }}
          pointerEvents="none"
        />

        {/* Separador Visual (Vírgula aparece apenas no CM) */}
        <Text
          className="absolute text-on-tertiary text-xl font-bold"
          style={{ zIndex: 10, top: '50%', marginTop: -14, display: unit === 'CM' ? 'flex' : 'none' }}
          pointerEvents="none"
        >
          ,
        </Text>

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
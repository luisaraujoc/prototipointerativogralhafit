import React, { useState, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { RulerPicker } from 'react-native-ruler-picker';
import * as Haptics from 'expo-haptics';

type Props = { 
  onNext: (w: number) => void; 
  onBack: () => void; 
  currentStep: number; 
  totalSteps: number; 
  heightInMeters: number; 
};

export default function WeightSelection({ onNext, onBack, currentStep, totalSteps, heightInMeters }: Props) {
  const [unit, setUnit] = useState<'KG' | 'LB'>('KG');
  const [showRuler, setShowRuler] = useState(true);

  const [weightKg, setWeightKg] = useState<number>(68.0);
  const [weightLb, setWeightLb] = useState<number>(149.9);

  const imc = useMemo(() => {
    return (weightKg / (heightInMeters * heightInMeters)).toFixed(1);
  }, [weightKg, heightInMeters]);

  const toggleUnit = (newUnit: 'KG' | 'LB') => {
    if (newUnit === unit) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    setShowRuler(false);

    if (newUnit === 'LB') {
      setWeightLb(Number((weightKg * 2.20462).toFixed(1)));
    } else {
      setWeightKg(Number((weightLb / 2.20462).toFixed(1)));
    }
    setUnit(newUnit);

    setTimeout(() => {
      setShowRuler(true);
    }, 50);
  };

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
        Qual o seu peso?
      </Text>

      {/* SELETOR DE UNIDADE */}
      <View className="flex-row bg-surface rounded-full p-1 mx-auto w-64 mb-xl mt-sm">
        <Pressable 
          onPress={() => toggleUnit('KG')}
          className={`flex-1 py-3 items-center rounded-full transition-all ${unit === 'KG' ? 'bg-neutral shadow-sm' : ''}`}
        >
          <Text className={`font-bold tracking-widest ${unit === 'KG' ? 'text-on-tertiary' : 'text-on-tertiary/50'}`}>KG</Text>
        </Pressable>
        
        <Pressable 
          onPress={() => toggleUnit('LB')}
          className={`flex-1 py-3 items-center rounded-full transition-all ${unit === 'LB' ? 'bg-neutral shadow-sm' : ''}`}
        >
          <Text className={`font-bold tracking-widest ${unit === 'LB' ? 'text-on-tertiary' : 'text-on-tertiary/50'}`}>LB</Text>
        </Pressable>
      </View>

      {/* DISPLAY GIGANTE DO PESO */}
      <View className="flex-row items-end justify-center mb-xl">
        <Text className="text-on-tertiary font-bold tracking-tighter" style={{ fontSize: 96, lineHeight: 100 }}>
          {unit === 'KG' ? weightKg.toFixed(1).replace('.', ',') : weightLb.toFixed(1).replace('.', ',')}
        </Text>
        <Text className="text-on-tertiary font-bold text-2xl mb-4 ml-2">
          {unit === 'KG' ? 'kg' : 'lb'}
        </Text>
      </View>

      {/* CONTAINER DAS RÉGUAS */}
      <View className="items-center mt-xl justify-center mb-xl w-full" style={{ height: 120 }}>
        
        {showRuler && (
          unit === 'KG' ? (
            <RulerPicker
              min={30} 
              max={250} 
              step={0.1} 
              fractionDigits={1} 
              initialValue={weightKg}
              onValueChange={(number) => {
                const numVal = parseFloat(number);
                setWeightKg(numVal);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              // A SALVAÇÃO: Definir 1px absoluto para impedir o Android de ver 0px.
              valueTextStyle={{ color: 'transparent', fontSize: 1}} 
              unitTextStyle={{ color: 'transparent', fontSize: 1}}
              indicatorColor="#034cd5" 
              shortStepColor="#e4e4e4" 
              longStepColor="#A0A0A0" 
              // Aumentar a distância entre o topo e o "texto invisível" para manter o alinhamento
              indicatorHeight={50}
              height={120} 
              width={350}
            />
          ) : (
            <RulerPicker
              min={60} 
              max={400} 
              step={0.1} 
              fractionDigits={1} 
              initialValue={weightLb}
              onValueChange={(number) => {
                const numVal = parseFloat(number);
                setWeightLb(numVal);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              // A SALVAÇÃO: Definir 1px absoluto para impedir o Android de ver 0px.
              valueTextStyle={{ color: 'transparent', fontSize: 1}} 
              unitTextStyle={{ color: 'transparent', fontSize: 1 }}
              indicatorColor="#034cd5" 
              shortStepColor="#e4e4e4" 
              longStepColor="#A0A0A0" 
              indicatorHeight={50}
              height={120} 
              width={350}
            />
          )
        )}

      </View>

      {/* CARD DE IMC */}
      <View className="card-surface flex-row items-center mt-auto mb-xl gap-md shadow-sm">
        <Text className="text-3xl">🔥</Text>
        <View className="flex-1">
          <Text className="text-body-large text-on-tertiary leading-relaxed">
            O seu IMC é de <Text className="font-bold text-primary">{imc}</Text>. Isso é ótimo! Vamos te ajudar a ficar ainda mais forte e saudável.
          </Text>
        </View>
      </View>

      {/* BOTÃO DE PRÓXIMO */}
      <Pressable 
        className="btn-primary mb-xl"
        onPress={() => onNext(weightKg)} 
      >
        <Text className="btn-primary-text font-bold uppercase tracking-wider">
          Próximo
        </Text>
      </Pressable>

    </SafeAreaView>
  );
}
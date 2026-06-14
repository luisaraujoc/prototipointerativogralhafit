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
  currentWeightKg: number; 
};

export default function WeightGoalSelection({ onNext, onBack, currentStep, totalSteps, currentWeightKg }: Props) {
  const [unit, setUnit] = useState<'KG' | 'LB'>('KG');
  
  // O Estado Salvador: Controla o respiro da memória
  const [showRuler, setShowRuler] = useState(true);

  // Iniciando a meta com o mesmo peso atual
  const [goalWeightKg, setGoalWeightKg] = useState<number>(currentWeightKg);
  const [goalWeightLb, setGoalWeightLb] = useState<number>(Number((currentWeightKg * 2.20462).toFixed(1)));

  // Cálculo da porcentagem de ganho/perda
  const { percentageText, icon, message } = useMemo(() => {
    const diff = goalWeightKg - currentWeightKg;
    const percentage = Math.abs((diff / currentWeightKg) * 100).toFixed(2);

    if (diff > 0) {
      return {
        icon: '📈',
        percentageText: `+${percentage}%`,
        message: 'em relação ao seu peso atual. Foco na construção muscular!'
      };
    } else if (diff < 0) {
      return {
        icon: '📉',
        percentageText: `-${percentage}%`,
        message: 'em relação ao seu peso atual. Foco na definição!'
      };
    } else {
      return {
        icon: '⚖️',
        percentageText: '0%',
        message: 'Meta de manutenção. Perfeito para consolidação e recomposição corporal!'
      };
    }
  }, [goalWeightKg, currentWeightKg]);

  // Função para mudar a unidade com segurança de memória
  const toggleUnit = (newUnit: 'KG' | 'LB') => {
    if (newUnit === unit) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Esconde a régua
    setShowRuler(false);

    // Converte os valores
    if (newUnit === 'LB') {
      setGoalWeightLb(Number((goalWeightKg * 2.20462).toFixed(1)));
    } else {
      setGoalWeightKg(Number((goalWeightLb / 2.20462).toFixed(1)));
    }
    setUnit(newUnit);

    // Respira e renderiza
    setTimeout(() => {
      setShowRuler(true);
    }, 50);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral px-lg">
      
      {/* 1. HEADER */}
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

      {/* 2. TÍTULO */}
      <Text className="text-display-small text-on-tertiary mb-md leading-tight tracking-tight mt-md">
        Qual é a sua meta de peso?
      </Text>

      {/* 3. SELETOR DE UNIDADE */}
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

      {/* 4. DISPLAY GIGANTE DA META */}
      <View className="flex-row items-end justify-center mb-xl">
        <Text className="text-on-tertiary font-bold tracking-tighter" style={{ fontSize: 96, lineHeight: 100 }}>
          {unit === 'KG' ? goalWeightKg.toFixed(1).replace('.', ',') : goalWeightLb.toFixed(1).replace('.', ',')}
        </Text>
        <Text className="text-on-tertiary font-bold text-2xl mb-4 ml-2">
          {unit === 'KG' ? 'kg' : 'lb'}
        </Text>
      </View>

      {/* 5. A RÉGUA (Com altura fixa e renderização condicional) */}
      <View className="items-center justify-center mb-xl w-full" style={{ height: 120 }}>
        
        {showRuler && (
          unit === 'KG' ? (
            <RulerPicker
              key="ruler-goal-kg"
              min={30} 
              max={250} 
              step={0.1} 
              fractionDigits={1} 
              initialValue={goalWeightKg}
              onValueChange={(number) => {
                const numVal = parseFloat(number);
                setGoalWeightKg(numVal);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              valueTextStyle={{ color: 'transparent', fontSize: 1}} 
              unitTextStyle={{ color: 'transparent', fontSize: 1}}
              indicatorColor="#034cd5" 
              shortStepColor="#e4e4e4" 
              longStepColor="#A0A0A0" 
              indicatorHeight={50} // Alinhamento da linha azul
              height={120} 
              width={350}
            />
          ) : (
            <RulerPicker
              key="ruler-goal-lb"
              min={60} 
              max={400} 
              step={0.1} 
              fractionDigits={1} 
              initialValue={goalWeightLb}
              onValueChange={(number) => {
                const numVal = parseFloat(number);
                setGoalWeightLb(numVal);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              valueTextStyle={{ color: 'transparent', fontSize: 1}} 
              unitTextStyle={{ color: 'transparent', fontSize: 1}}
              indicatorColor="#034cd5" 
              shortStepColor="#e4e4e4" 
              longStepColor="#A0A0A0" 
              indicatorHeight={50} // Alinhamento da linha azul
              height={120} 
              width={350}
            />
          )
        )}

      </View>

      {/* 6. CARD DINÂMICO DE PORCENTAGEM */}
      <View className="card-surface flex-row items-center mt-auto mb-xl gap-md shadow-sm">
        <Text className="text-3xl">{icon}</Text>
        <View className="flex-1">
          <Text className="text-body-large text-on-tertiary leading-relaxed">
            <Text className="font-bold text-primary">{percentageText} </Text>
            {message}
          </Text>
        </View>
      </View>

      {/* 7. BOTÃO DE PRÓXIMO */}
      <Pressable 
        className="btn-primary mb-xl"
        onPress={() => onNext(goalWeightKg)} 
      >
        <Text className="btn-primary-text font-bold uppercase tracking-wider">
          Próximo
        </Text>
      </Pressable>

    </SafeAreaView>
  );
}
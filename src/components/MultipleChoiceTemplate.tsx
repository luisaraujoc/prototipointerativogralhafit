import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export type Option = {
  id: string;
  label: string;
};

type Props = {
  currentStep: number;
  totalSteps: number;
  questionText: string;
  options: Option[];
  onNext: (selectedIds: string[]) => void;
  onBack: () => void;
};

export default function MultipleChoiceTemplate({
  currentStep,
  totalSteps,
  questionText,
  options,
  onNext,
  onBack,
}: Props) {
  // Guarda um array com os IDs selecionados
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const progressPercentage = (currentStep / totalSteps) * 100;

  const toggleOption = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Regra de Exclusividade: Se clicou em "não" ou "nenhum", limpa as outras seleções
    if (id === 'nao' || id === 'nenhum') {
      setSelectedIds([id]);
      return;
    }

    setSelectedIds((prev) => {
      // Se tinha "não" ou "nenhum" marcado e o usuário clicou em outra coisa, remove a negativa
      const filtered = prev.filter((item) => item !== 'nao' && item !== 'nenhum');

      if (filtered.includes(id)) {
        return filtered.filter((item) => item !== id); // Desmarca se já estava marcado
      } else {
        return [...filtered, id]; // Marca a nova opção
      }
    });
  };

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

      {/* BARRA DE PROGRESSO */}
      <View className="h-1.5 bg-surface rounded-full mb-xl overflow-hidden">
        <View
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </View>

      {/* TÍTULO */}
      <Text className="text-display-small text-on-tertiary mb-xl leading-tight tracking-tight">
        {questionText}
      </Text>

      {/* LISTA DE OPÇÕES MÚLTIPLAS */}
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-md pb-xl"
        showsVerticalScrollIndicator={false}
      >
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id);

          return (
            <Pressable
              key={option.id}
              onPress={() => toggleOption(option.id)}
              className={`card-surface flex-row justify-between items-center transition-all ${isSelected
                  ? 'border border-primary bg-primary/5' // Destaca a opção selecionada com uma borda azul e fundo super claro
                  : 'border border-transparent'
                }`}
            >
              <Text className={`text-body-large ${isSelected ? 'text-primary font-bold' : 'text-on-tertiary'}`}>
                {option.label}
              </Text>

              {/* Checkbox visual */}
              <View className={`w-6 h-6 rounded-md border items-center justify-center transition-all ${isSelected ? 'bg-primary border-primary' : 'border-border bg-neutral'
                }`}>
                {isSelected && <Feather name="check" size={16} color="white" />}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* BOTÃO DE PRÓXIMO (Fixo no rodapé) */}
      <Pressable
        className={`btn-primary mb-xl mt-md ${selectedIds.length === 0 ? 'opacity-50' : 'opacity-100'}`}
        disabled={selectedIds.length === 0} // Impede de avançar sem selecionar nada
        onPress={() => onNext(selectedIds)}
      >
        <Text className="btn-primary-text font-bold uppercase tracking-wider">
          Próximo
        </Text>
      </Pressable>

    </SafeAreaView>
  );
}
import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { cssInterop } from 'nativewind';

// Interoperabilidade para os ícones respeitarem os tokens do tema
cssInterop(Feather, {
  className: {
    target: 'style',
    nativeStyleToProp: { color: true }
  },
});

export default function AddWorkout({ navigation }: any) {
  const [workoutName, setWorkoutName] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-neutral">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* HEADER: Title Bar 
          Removido: Valores arbitrários e opacidades soltas.
          Usando: padding oficial e borda sólida do tema.
      */}
      <View className="flex-row items-center justify-between px-lg py-md border-b border-border">
        
        <Pressable onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={28} className="text-on-tertiary" />
        </Pressable>

        <Text className="text-body-large font-bold text-on-tertiary">
          Novo Treino
        </Text>

        <Pressable onPress={() => console.log('Treino salvo:', workoutName)}>
          <Text className="text-label-large font-bold text-primary uppercase">
            Salvar
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="p-lg" keyboardShouldPersistTaps="handled">
        
        {/* NOME DO TREINO */}
        <View className="mb-xl">
          <Text className="text-body-medium text-on-tertiary mb-sm ml-sm">
            Nome do Treino
          </Text>
          {/* input-default puxando as propriedades do global.css! */}
          <TextInput
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Ex: Peito e Tríceps"
            placeholderTextColor="gray"
            className="input-default w-full"
            autoFocus
          />
        </View>

        {/* HEADER DA LISTA DE EXERCÍCIOS */}
        <View className="flex-row items-center justify-between mb-md">
          <Text className="text-body-large font-bold text-on-tertiary">
            Exercícios
          </Text>

          {/* BOTÃO GHOST PURO: Apenas a classe, sem paddings extras para não quebrar a UI */}
          <Pressable 
            onPress={() => console.log('Abrir tela de escolher exercícios')}
            className="btn-ghost flex-row items-center gap-sm"
          >
            <Feather name="plus" size={16} className="text-primary" />
            <Text className="btn-ghost-text uppercase">
              Adicionar Exercício
            </Text>
          </Pressable>
        </View>

        {/* LISTA DE EXERCÍCIOS */}
        <View className="gap-md">
          
          {/* ESTADO VAZIO */}
          <View className="card-surface border border-border py-xl items-center justify-center">
            <Feather name="list" size={32} className="text-on-tertiary mb-sm" />
            <Text className="text-body-medium text-on-tertiary text-center">
              Nenhum exercício no treino.
            </Text>
          </View>

          {/* MOCKUP DO EXERCÍCIO ADICIONADO */}
          <View className="card-surface border border-border flex-row items-center">
            
            {/* Ícone (Substituindo os arbitrários w-16 h-16 por paddings do Design System) */}
            <View className="bg-neutral border border-border rounded-sm items-center justify-center p-md mr-md">
              <Feather name="image" size={24} className="text-on-tertiary" />
            </View>
            
            {/* Info */}
            <View className="flex-1">
              <Text className="text-body-large font-bold text-on-tertiary mb-sm">
                Supino Reto
              </Text>
              <Text className="text-body-medium text-on-tertiary">
                4 Séries • 8 a 10 Reps
              </Text>
            </View>

            <Pressable>
              <Feather name="more-vertical" size={24} className="text-on-tertiary" />
            </Pressable>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
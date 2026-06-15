import React from 'react';
import { View, Text, Pressable, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { cssInterop } from 'nativewind';

// Novos imports para corrigir a tipagem aninhada
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppTabParamList } from '@/screens/app/AppNavigator';
import { RootStackParamList } from '@/routes/routes'; 

// Mágica do TypeScript: Junta as rotas do Tab com as rotas do Stack!
type Props = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

cssInterop(Feather, {
  className: {
    target: 'style',
    nativeStyleToProp: { color: true }
  },
});

export default function Home({ navigation }: Props) {
  const treinos = [
    { id: '1', titulo: 'Segunda', stats: '6 exercícios • 48min • 238kcal' }
  ];

  return (
    <SafeAreaView className="flex-1 bg-neutral">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* HEADER */}
      <View className="flex-row items-center px-lg pt-12 pb-md">
        <Pressable 
          className="flex-row items-center bg-surface border border-border rounded-lg py-sm px-md active:opacity-80 transition-all"
          onPress={() => console.log('Abrir Bottom Sheet Personalizado')}
        >
          <Feather name="file-text" size={16} className="text-on-tertiary mr-2 opacity-80" />
          <Text className="text-body-medium text-on-tertiary font-medium mr-2">
            Personalizado
          </Text>
          <Feather name="chevron-down" size={16} className="text-on-tertiary opacity-80" />
        </Pressable>
      </View>

      {/* CORPO / LISTA DE TREINOS */}
      <ScrollView contentContainerClassName="px-lg pb-[120px]">
        
        {treinos.map((treino) => (
          <View key={treino.id} className="card-surface mb-md border border-border">
            <View className="flex-row justify-between items-start mb-sm">
              <Text className="text-body-large text-on-tertiary font-bold">
                {treino.titulo}
              </Text>
              <Pressable className="p-1 active:opacity-70">
                <Feather name="more-horizontal" size={20} className="text-on-tertiary opacity-70" />
              </Pressable>
            </View>
            
            <Text className="text-body-medium text-on-tertiary opacity-60 mb-lg">
              {treino.stats}
            </Text>

            <View className="flex-row justify-between items-end">
              <View className="flex-row gap-sm">
                <View className="w-10 h-12 bg-neutral rounded-sm border border-border items-center justify-center">
                  <Feather name="user" size={16} className="text-primary" />
                </View>
                <View className="w-10 h-12 bg-neutral rounded-sm border border-border items-center justify-center">
                  <Feather name="user" size={16} className="text-primary" />
                </View>
              </View>

              <Pressable className="btn-primary px-lg py-sm">
                <Text className="btn-primary-text font-bold uppercase tracking-wider">
                  Iniciar
                </Text>
              </Pressable>
            </View>
          </View>
        ))}

        {/* BOTÃO ADICIONAR TREINO */}
        <Pressable 
          className="border-2 border-border rounded-md py-md items-center justify-center flex-row gap-sm active:bg-surface transition-all"
          // <-- CORREÇÃO: Função anônima adicionada aqui!
          onPress={() => navigation.navigate('AddWorkout')} 
        >
          <Feather name="plus" size={18} className="text-on-tertiary opacity-80" />
          <Text className="text-label-large text-on-tertiary font-bold tracking-wider uppercase opacity-90">
            Adicionar Treino
          </Text>
        </Pressable>
        
      </ScrollView>
      
    </SafeAreaView>
  );
}
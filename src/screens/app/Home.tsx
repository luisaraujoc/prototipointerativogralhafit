import React from 'react';
import { View, Text, Pressable, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/routes/routes';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  // Simulação de estado: se tem treinos cadastrados ou não.
  // Você pode alternar para [] para ver apenas o botão de adicionar.
  const treinos = [
    { id: '1', titulo: 'Segunda', stats: '6 exercícios • 48min • 238kcal' }
  ];

  return (
    <SafeAreaView className="flex-1 bg-neutral">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* HEADER */}
      <View className="flex-row items-center px-lg pt-12 pb-md">
        <Pressable 
          className="flex-row items-center bg-surface border border-border/50 rounded-full px-4 py-2 active:opacity-70"
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
      {/* O contentContainerStyle garante um padding no final para a Navbar flutuante não cobrir o conteúdo */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}>
        
        {treinos.map((treino) => (
          <View key={treino.id} className="card-surface mb-md border border-border/30">
            {/* Topo do Card */}
            <View className="flex-row justify-between items-start mb-1">
              <Text className="text-body-large text-on-tertiary font-bold tracking-wide">
                {treino.titulo}
              </Text>
              <Pressable className="p-1">
                <Feather name="more-horizontal" size={20} className="text-on-tertiary opacity-70" />
              </Pressable>
            </View>
            
            {/* Subtítulo */}
            <Text className="text-body-medium text-on-tertiary opacity-50 mb-xl">
              {treino.stats}
            </Text>

            {/* Base do Card: Ícones Musculares e Botão */}
            <View className="flex-row justify-between items-end">
              <View className="flex-row gap-2">
                {/* Placeholders para as imagens dos mapas musculares */}
                <View className="w-10 h-12 bg-neutral rounded-md border border-border/50 items-center justify-center">
                  <Feather name="user" size={16} className="text-primary" />
                </View>
                <View className="w-10 h-12 bg-neutral rounded-md border border-border/50 items-center justify-center">
                  <Feather name="user" size={16} className="text-primary" />
                </View>
              </View>

              <Pressable className="bg-neutral px-6 py-3 rounded-full border border-border/50 active:opacity-80">
                <Text className="text-on-tertiary text-xs font-bold tracking-wider uppercase">
                  Iniciar
                </Text>
              </Pressable>
            </View>
          </View>
        ))}

        {/* BOTÃO ADICIONAR TREINO */}
        <Pressable 
          className="border border-border/50 rounded-[14px] py-5 items-center justify-center flex-row gap-2 active:bg-surface/50 transition-all"
        >
          <Feather name="plus" size={18} className="text-on-tertiary opacity-80" />
          <Text className="text-on-tertiary font-bold tracking-wider text-xs uppercase opacity-90">
            Adicionar Treino
          </Text>
        </Pressable>
        
      </ScrollView>

      {/* FLOATING NAVBAR */}
      <View className="absolute bottom-6 left-6 right-6 bg-surface/95 flex-row justify-around items-center px-2 py-2 rounded-[32px] border border-border/50 shadow-lg">
        
        {/* Aba Ativa: Meu Plano */}
        <Pressable className="bg-neutral/60 flex-col items-center justify-center rounded-[24px] px-6 py-2 w-1/3">
          <Feather name="share-2" size={20} className="text-on-tertiary mb-1" />
          <Text className="text-on-tertiary text-[10px] font-bold uppercase tracking-widest">
            Meu Plano
          </Text>
        </Pressable>

        {/* Aba Inativa: Progresso */}
        <Pressable className="flex-col items-center justify-center px-4 py-2 opacity-50 w-1/3">
          <Feather name="bar-chart-2" size={22} className="text-on-tertiary mb-1" />
          <Text className="text-on-tertiary text-[10px] font-bold uppercase tracking-widest">
            Progresso
          </Text>
        </Pressable>

        {/* Aba Inativa: Perfil */}
        <Pressable className="flex-col items-center justify-center px-4 py-2 opacity-50 w-1/3">
          <Feather name="user" size={22} className="text-on-tertiary mb-1" />
          <Text className="text-on-tertiary text-[10px] font-bold uppercase tracking-widest">
            Perfil
          </Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}
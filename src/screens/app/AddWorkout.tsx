import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, StatusBar, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  
  // 1. ESTADOS PARA MAGIA DA APRESENTAÇÃO
  const [exercises, setExercises] = useState<any[]>([]); // Array que guarda os exercícios
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [showDropdownFor, setShowDropdownFor] = useState<string | null>(null);

  // Função "Migué" da apresentação
  const handleAddSupino = () => {
    const novoExercicio = {
      id: Date.now().toString(), // ID único
      name: 'Supino Reto',
      info: '4 Séries • 8 a 10 Reps'
    };
    setExercises([...exercises, novoExercicio]);
    setBottomSheetVisible(false); // Fecha o Bottom Sheet
  };

  const handleDelete = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
    setShowDropdownFor(null); // Esconde o dropdown
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral">
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* HEADER */}
      <View className="flex-row items-center justify-between px-lg py-sm">
        <Pressable onPress={() => navigation.goBack()} className="p-sm -ml-sm">
          <Feather name="chevron-left" size={28} className="text-on-tertiary" />
        </Pressable>

        <Text className="text-body-large font-bold text-on-tertiary">
          Novo Treino
        </Text>

        <Pressable onPress={() => console.log('Treino salvo:', workoutName)} className="p-sm -mr-sm">
          <Text className="text-label-large font-bold text-primary uppercase">
            Salvar
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="p-lg gap-xl" keyboardShouldPersistTaps="handled">
        
        {/* NOME DO TREINO */}
        <View>
          <Text className="text-body-medium font-bold text-on-tertiary mb-sm ml-sm">
            Nome do Treino
          </Text>
          <TextInput
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Ex: Peito e Tríceps"
            placeholderTextColor="#A0A0A0"
            className="bg-surface text-on-tertiary rounded-sm px-md py-[14px] text-body-medium w-full"
            autoFocus
          />
        </View>

        {/* ÁREA DA LISTA DE EXERCÍCIOS */}
        <View className="gap-md z-10">
            
          {/* HEADER DA LISTA */}
          <View className="flex-row items-center justify-between mb-sm">
            <Text className="text-body-large font-bold text-on-tertiary">
              Exercícios
            </Text>

            {/* BOTÃO QUE ABRE O BOTTOM SHEET */}
            <Pressable 
              onPress={() => setBottomSheetVisible(true)}
              className="flex-row items-center gap-sm px-sm py-sm rounded-sm"
            >
              <Feather name="plus" size={18} className="text-primary" />
              <Text className="text-label-large font-bold text-primary uppercase">
                Adicionar
              </Text>
            </Pressable>
          </View>
          
          {/* LÓGICA DE EXIBIÇÃO MUTUAMENTE EXCLUSIVA */}
          {exercises.length === 0 ? (
            
            /* ESTADO VAZIO (Aparece se não houver exercícios) */
            <View className="bg-surface rounded-md py-xl items-center justify-center">
              <Feather name="list" size={32} className="text-on-tertiary mb-sm opacity-40" />
              <Text className="text-body-medium text-on-tertiary text-center opacity-60">
                Nenhum exercício no treino.
              </Text>
            </View>

          ) : (
            
            /* LISTA DE EXERCÍCIOS (Aparece se houver exercícios) */
            exercises.map((ex) => (
              <View key={ex.id} className="bg-surface rounded-md p-md flex-row items-center relative">
                
                <View className="bg-neutral rounded-sm items-center justify-center p-md mr-md">
                  <Feather name="image" size={24} className="text-on-tertiary opacity-40" />
                </View>
                
                <View className="flex-1">
                  <Text className="text-body-large font-bold text-on-tertiary mb-[2px]">
                    {ex.name}
                  </Text>
                  <Text className="text-body-medium text-on-tertiary opacity-60">
                    {ex.info}
                  </Text>
                </View>

                {/* BOTÃO DE OPÇÕES (3 PONTOS) */}
                <Pressable 
                  className="p-sm -mr-sm"
                  onPress={() => setShowDropdownFor(showDropdownFor === ex.id ? null : ex.id)}
                >
                  <Feather name="more-vertical" size={24} className="text-on-tertiary opacity-60" />
                </Pressable>

                {/* DROPDOWN FLUTUANTE (Exclusão) */}
                {showDropdownFor === ex.id && (
                  <View 
                    className="absolute right-12 top-10 bg-neutral rounded-sm shadow-md py-2 px-4 z-50 border border-border"
                    style={{ elevation: 5 }} // Sombra para Android
                  >
                    <Pressable 
                      onPress={() => handleDelete(ex.id)} 
                      className="flex-row items-center gap-sm p-2"
                    >
                      <Feather name="trash-2" size={18} color="#FF3B30" />
                      <Text style={{ color: '#FF3B30' }} className="text-label-large font-bold">
                        Excluir
                      </Text>
                    </Pressable>
                  </View>
                )}

              </View>
            ))
          )}

        </View>
      </ScrollView>

      {/* =======================================================
          BOTTOM SHEET MOCK (Adição Rápida para Apresentação)
          ======================================================= */}
      <Modal visible={isBottomSheetVisible} transparent animationType="slide">
        {/* Scrim Overlay (Escurece o fundo e permite fechar clicando fora) */}
        <View className="flex-1 justify-end bg-black/50">
          <Pressable className="flex-1" onPress={() => setBottomSheetVisible(false)} />
          
          {/* Card do Bottom Sheet subindo do rodapé */}
          <View className="bg-neutral rounded-t-[32px] p-lg pb-xl shadow-lg">
            
            {/* Tracinho de Drag (Estética iOS) */}
            <View className="w-12 h-1.5 bg-border rounded-full self-center mb-md" />
            
            <Text className="text-headline-small font-bold text-on-tertiary mb-xl text-center">
              Adicionar Exercício
            </Text>

            {/* Ação principal da Apresentação */}
            <Pressable 
              onPress={handleAddSupino} 
              className="bg-primary rounded-sm py-4 items-center justify-center flex-row gap-sm"
            >
              <Feather name="plus-circle" size={20} color="#FCFCFC" />
              <Text className="text-label-large font-bold text-neutral uppercase">
                Add Supino Reto
              </Text>
            </Pressable>
            
            <Pressable 
              onPress={() => setBottomSheetVisible(false)} 
              className="mt-md py-4 items-center justify-center"
            >
              <Text className="text-label-large font-bold text-on-tertiary uppercase opacity-60">
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
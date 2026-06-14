import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function SignUp({ navigation }: any) {
  return (
    <SafeAreaView className="flex-1 bg-neutral px-lg">
      
      {/* HEADER: Botão Voltar (caso ele queira repensar a assinatura) */}
      <View className="mt-sm mb-xl">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-12 h-12 bg-surface rounded-full items-center justify-center active:scale-90 active:opacity-80 transition-all"
        >
          <Feather name="chevron-left" size={24} color="var(--color-on-tertiary)" />
        </Pressable>
      </View>

      <View className="flex-1 justify-center pb-xl">
        
        {/* ÍCONE DE DESTAQUE NO LUGAR DAQUELAS IMAGENS CONFUSAS */}
        <View className="items-center mb-xl">
          <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-sm">
            <Feather name="cloud-drizzle" size={40} color="var(--color-primary)" />
          </View>
        </View>

        {/* TEXTOS */}
        <Text className="text-display-small font-bold text-on-tertiary text-center mb-md leading-tight tracking-tight">
          Salve seus dados: A qualquer hora, em qualquer lugar!
        </Text>
        
        <Text className="text-body-large text-on-tertiary/60 text-center mb-xl px-sm leading-relaxed">
          Junte-se à nossa comunidade e faça login para salvar seu progresso e continuar avançando!
        </Text>

        {/* BOTÕES DE AÇÃO */}
        <View className="gap-md w-full mt-lg">
          
          {/* BOTÃO GOOGLE */}
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              console.log('Login com Google acionado!');
              // navigation.replace('Home');
            }}
            className="flex-row items-center justify-center py-4 rounded-xl border border-border bg-surface active:scale-95 transition-all"
          >
            <AntDesign 
              name="google" 
              size={24} 
              color="var(--color-on-tertiary)" 
              style={{ position: 'absolute', left: 24 }} 
            />
            <Text className="text-body-large font-bold text-on-tertiary uppercase tracking-wider">
              Entrar com o Google
            </Text>
          </Pressable>

          {/* BOTÃO E-MAIL */}
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              console.log('Ir para fluxo de E-mail');
              // navigation.navigate('EmailLogin');
            }}
            className="flex-row items-center justify-center py-4 rounded-xl bg-primary active:scale-95 active:opacity-80 transition-all"
          >
            <Feather 
              name="mail" 
              size={24} 
              color="#ffffff" 
              style={{ position: 'absolute', left: 24 }} 
            />
            <Text className="text-body-large font-bold text-white uppercase tracking-wider">
              Continuar com E-mail
            </Text>
          </Pressable>

        </View>
      </View>

    </SafeAreaView>
  );
}
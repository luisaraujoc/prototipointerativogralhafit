import React, { useState } from 'react';
import { View, Text, Pressable, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

interface AuthBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

type Step = 'options' | 'email_form';

export default function AuthBottomSheet({ visible, onClose }: AuthBottomSheetProps) {
  const [step, setStep] = useState<Step>('options');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Reseta o estado sempre que o modal for fechado
  const handleClose = () => {
    setStep('options');
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-end bg-black/60"
      >
        {/* Usando a sua classe .bottom-sheet do global.css! 
          Adicionamos rounded-b-none para tirar o arredondamento de baixo 
          e pb-10 para dar espaço para o detalhe de navegação do iOS/Android.
        */}
        <View className="bottom-sheet rounded-b-none pb-10 pt-6">
          
          {/* CONTEÚDO 1: OPÇÕES DE LOGIN */}
          {step === 'options' && (
            <View className="min-h-[300px]">
              {/* Botão Fechar */}
              <Pressable onPress={handleClose} className="self-end mb-sm p-2">
                <Feather name="x" size={24} className="text-on-tertiary" />
              </Pressable>

              <Text className="text-display-small text-on-tertiary font-bold mb-sm tracking-tight">
                Bem-vindo de volta!
              </Text>
              
              <Text className="text-body-large text-on-tertiary opacity-70 mb-xl leading-relaxed">
                Seu progresso, exercícios e dados pessoais são armazenados com segurança e estão prontos para você. Basta um toque e você estará de volta ao caminho certo.
              </Text>

              <View className="gap-md mt-auto">
                {/* Botão Google - Usando seu btn-secondary */}
                <Pressable className="btn-tertiary w-full flex-row relative">
                  <AntDesign name="google" size={24} className="text-neutral absolute left-6" />
                  <Text className="btn-tertiary-text font-bold uppercase tracking-wider">Entrar com o Google</Text>
                </Pressable>

                {/* Botão Email - Usando seu btn-primary */}
                <Pressable 
                  onPress={() => setStep('email_form')}
                  className="btn-primary w-full flex-row relative"
                >
                  <Feather name="mail" size={24} className="text-neutral absolute left-6" />
                  <Text className="btn-primary-text font-bold uppercase tracking-wider">Continuar com E-mail</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* CONTEÚDO 2: FORMULÁRIO DE EMAIL E SENHA */}
          {step === 'email_form' && (
            <View className="min-h-[400px]"> {/* Altura maior para não cortar os inputs! */}
              {/* Botão Voltar */}
              <Pressable 
                onPress={() => setStep('options')} 
                className="flex-row items-center mb-lg py-2"
              >
                <Feather name="arrow-left" size={20} className="text-on-tertiary mr-2" />
                <Text className="text-body-medium text-on-tertiary font-medium">Voltar</Text>
              </Pressable>

              <Text className="text-display-small text-on-tertiary font-bold mb-sm">Entrar</Text>
              <Text className="text-body-large text-on-tertiary opacity-70 mb-xl">
                Digite seu e-mail e senha para acessar sua conta.
              </Text>

              <View className="gap-md mb-xl">
                {/* Input Email */}
                <View>
                  <Text className="text-body-medium text-on-tertiary opacity-80 mb-2 ml-1">E-mail</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="exemplo@email.com"
                    placeholderTextColor="gray"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="input-default w-full"
                  />
                </View>

                {/* Input Senha */}
                <View>
                  <Text className="text-body-medium text-on-tertiary opacity-80 mb-2 ml-1">Senha</Text>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Sua senha secreta"
                    placeholderTextColor="gray"
                    secureTextEntry
                    className="input-default w-full"
                  />
                </View>
              </View>

              <Pressable 
                className="btn-primary w-full mt-auto"
                onPress={() => console.log('Fazendo login com:', email, password)}
              >
                <Text className="btn-primary-text font-bold uppercase tracking-wider">Continuar</Text>
              </Pressable>
            </View>
          )}

        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
import { useEffect, useState } from 'react';
import { View, Text, Pressable, ImageBackground, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/routes/routes';
import AuthBottomSheet from '@/components/AuthBottomSheet';

type Props = NativeStackScreenProps<RootStackParamList, 'OnBoarding'>;

export default function OnBoarding({ navigation, route }: Props) {
  const isLogged = route.params?.isLogged || false;

  // <-- Estado para controlar a visibilidade do Bottom Sheet
  const [isAuthSheetVisible, setIsAuthSheetVisible] = useState(false);

  useEffect(() => {
    if (isLogged) {
      navigation.replace('Home');
    }
  }, [isLogged, navigation]);

  return (
    <>
      {/* Configuração da Status Bar para fundos escuros */}
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/736x/d5/7f/81/d57f817acc21517ddda14b48c62530a5.jpg' }}
        className="flex-1"
        resizeMode="cover"
      >
        <View className="flex-1 bg-zinc-950/70 justify-end px-lg pb-xl pt-12">

          {/* TRAVADO EM BRANCO (text-white) */}
          <Text className="text-display-small text-white font-bold tracking-tight mb-sm leading-tight">
            Potencialize com um treino todo seu!
          </Text>

          {/* TRAVADO EM CINZA CLARO (text-zinc-200) para manter a hierarquia do subtítulo */}
          <Text className="text-body-large text-zinc-200 mb-xl opacity-90 leading-relaxed">
            Obtenha um plano personalizado para seu perfil, avaliando seus objetivos e metas.
          </Text>

          <View className="gap-md w-full mb-md">

            {/* BOTÃO COMEÇAR */}
            <Pressable
              className="btn-primary w-full"
              onPress={() => navigation.navigate('Survey')}
            >
              <Text className="btn-primary-text font-bold uppercase tracking-wider">Começar</Text>
            </Pressable>

            {/* BOTÃO FANTASMA - Texto também travado em branco */}
            <Pressable
              className="btn-ghost w-full"
              onPress={() => {
                console.log('Botão clicado! Estado atual antes de mudar:', isAuthSheetVisible);
                setIsAuthSheetVisible(true);
              }}
            >
              <Text className="btn-ghost-text text-white font-bold uppercase tracking-wider">
                Eu já tenho uma conta
              </Text>
            </Pressable>

          </View>

        </View>
      </ImageBackground>

      {/* <-- O Bottom Sheet fica aqui embaixo, fora da ImageBackground mas dentro do Fragment */}
      <AuthBottomSheet
        visible={isAuthSheetVisible}
        onClose={() => setIsAuthSheetVisible(false)}
      />
    </>
  );
}
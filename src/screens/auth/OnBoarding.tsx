import { useEffect } from 'react';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/routes'; 

type Props = NativeStackScreenProps<RootStackParamList, 'OnBoarding'>;

export default function OnBoarding({ navigation, route }: Props) {
  const isLogged = route.params?.isLogged || false;

  useEffect(() => {
    if (isLogged) {
      navigation.replace('Home');
    }
  }, [isLogged, navigation]);

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/d5/7f/81/d57f817acc21517ddda14b48c62530a5.jpg' }} 
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 bg-zinc-950/70 justify-end px-lg pb-xl pt-12">

        <Text className="text-display-small text-neutral font-bold tracking-tight mb-sm leading-tight">
          Potencialize com um treino todo seu!
        </Text>

        <Text className="text-body-large text-surface mb-xl opacity-90 leading-relaxed">
          Obtenha um plano personalizado para seu perfil, avaliando seus objetivos e metas.
        </Text>

        <View className="gap-md w-full mb-md">
          
          {/* BOTÃO COMEÇAR - Agora com navegação real! */}
          <Pressable
            className="btn-primary w-full"
            onPress={() => navigation.navigate('Survey')} 
          >
            <Text className="btn-primary-text font-bold uppercase tracking-wider">Começar</Text>
          </Pressable>

          <Pressable
            className="btn-ghost w-full"
            onPress={() => console.log('Ir para tela de Login')}
          >
            <Text className="btn-ghost-text text-neutral font-bold uppercase tracking-wider">
              Eu já tenho uma conta
            </Text>
          </Pressable>

        </View>

      </View>
    </ImageBackground>
  );
}
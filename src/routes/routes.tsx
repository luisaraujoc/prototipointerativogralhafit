import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Pressable } from 'react-native';

// 1. Importações
import OnBoarding from '@/screens/auth/OnBoarding'; // Ajuste o caminho se necessário
import SurveyScreen from '@/screens/OnboardingSurvey';

// 2. Tipagem das Rotas
export type RootStackParamList = {
  Home: undefined;
  DesignExample: undefined;
  OnBoarding: { isLogged?: boolean }; 
  Survey: undefined; // Adicionamos a rota do Survey (sem parâmetros obrigatórios)
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <Stack.Navigator 
      initialRouteName="OnBoarding"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      {/* 3. Registrando a tela do Survey */}
      <Stack.Screen name="Survey" component={SurveyScreen} />
    </Stack.Navigator>
  );
}
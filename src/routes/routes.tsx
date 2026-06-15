import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Pressable } from 'react-native';

// 1. Importações
import OnBoarding from '@/screens/auth/OnBoarding';
import SurveyScreen from '@/screens/auth/OnboardingSurvey';
import Paywall from '@/screens/auth/Paywall';
import SignUp from '@/screens/auth/SignUp';

// 2. Tipagem das Rotas
export type RootStackParamList = {
  Home: undefined;
  DesignExample: undefined;
  OnBoarding: { isLogged?: boolean }; 
  Survey: undefined; 
  Paywall: undefined;
  SignUp: undefined;
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
      <Stack.Screen name="Survey" component={SurveyScreen} />
      <Stack.Screen name="Paywall" component={Paywall} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
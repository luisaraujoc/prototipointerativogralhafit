import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1. Importações
import OnBoarding from '@/screens/auth/OnBoarding';
import SurveyScreen from '@/screens/auth/OnboardingSurvey';
import Paywall from '@/screens/auth/Paywall';
import SignUp from '@/screens/auth/SignUp';
import AppNavigator from '@/screens/app/AppNavigator'; 
import AddWorkout from '@/screens/app/AddWorkout'; // <-- Nova importação do AddWorkout

// 2. Tipagem das Rotas
export type RootStackParamList = {
  AppNavigator: undefined; // A nova rota raiz da área logada
  DesignExample: undefined;
  OnBoarding: { isLogged?: boolean }; 
  Survey: undefined; 
  Paywall: undefined;
  SignUp: undefined;
  AddWorkout: undefined; // <-- Adicionado na tipagem
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
      
      {/* O Orquestrador assume o comando aqui */}
      <Stack.Screen name="AppNavigator" component={AppNavigator} /> 
      
      {/* <-- Nova rota independente para criar treinos */}
      <Stack.Screen name="AddWorkout" component={AddWorkout} />
    </Stack.Navigator>
  );
}
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Mantemos essas configurações para evitar erros e carregar o CSS
import './global.css';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

import { Routes } from './routes/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* NavigationContainer é o cara que gerencia o estado das rotas no app todo */}
      <NavigationContainer>
        <StatusBar/>
        
        {/* Aqui chamamos o motor que vai renderizar a tela certa */}
        <Routes />
        
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
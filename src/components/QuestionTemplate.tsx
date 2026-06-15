import { View, Text, Pressable, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather } from '@expo/vector-icons'; // Pacote de ícones nativo do Expo
import { cssInterop } from 'nativewind';

export type Option = {
  id: string;
  label: string;
};

type Props = {
  currentStep: number;
  totalSteps: number;
  questionText: string;
  options: Option[];
  onSelect: (optionId: string) => void;
  onBack: () => void;
  showTerms?: boolean; // Para exibir os termos na primeira tela, como na imagem
};

cssInterop(Feather, {
  className: {
    target: 'style',
    nativeStyleToProp: { color: true }
  },
});

cssInterop(AntDesign, {
  className: {
    target: 'style',
    nativeStyleToProp: { color: true }
  },
});

export default function QuestionTemplate({
  currentStep,
  totalSteps,
  questionText,
  options,
  onSelect,
  onBack,
  showTerms = false,
}: Props) {
  // Cálculo dinâmico para a barra de progresso
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <SafeAreaView className="flex-1 bg-neutral px-lg">

      {/* HEADER: Botão Voltar + Contador de Passos */}
      <View className="flex-row items-center justify-between mt-sm mb-lg">
        <Pressable
          onPress={onBack}
          className="w-12 h-12 bg-surface rounded-full items-center justify-center active:scale-90 active:opacity-80 transition-all"
        >
          <Feather name="chevron-left" size={24} className="text-tertiary" />
        </Pressable>

        <Text className="text-body-large text-on-tertiary font-bold tracking-widest">
          {currentStep} / {totalSteps}
        </Text>

        {/* Espaçador vazio para centralizar o texto do passo perfeitamente */}
        <View className="w-12 h-12" />
      </View>

      {/* BARRA DE PROGRESSO */}
      <View className="h-1.5 bg-surface rounded-full mb-xl overflow-hidden">
        <View
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </View>

      {/* TÍTULO DA PERGUNTA */}
      <Text className="text-display-small text-on-tertiary mb-xl leading-tight tracking-tight">
        {questionText}
      </Text>

      {/* LISTA DE OPÇÕES (CARDS) */}
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-md pb-xl"
        showsVerticalScrollIndicator={false}
      >
        {options.map((option) => (
          <Pressable
            key={option.id}
            onPress={() => onSelect(option.id)}
            // Usando as classes do global.css: card-surface traz cor, padding e cantos (14px)
            className="card-surface flex-row justify-between items-center active:scale-[0.98] active:opacity-70 border border-transparent active:border-border"
          >
            <Text className="text-body-large text-on-tertiary">
              {option.label}
            </Text>
            <Feather name="chevron-right" size={20} className="color-on-tertiary" />
          </Pressable>
        ))}
      </ScrollView>

      {/* TERMOS E CONDIÇÕES (Condicional) */}
      {showTerms && (
        <Text className="text-label-medium text-center text-on-tertiary opacity-50 mb-md mt-auto px-4">
          Ao continuar, você concorda com nossos <Text className="font-bold">Termos</Text> e <Text className="font-bold">Política de Privacidade</Text>
        </Text>
      )}

    </SafeAreaView>
  );
}
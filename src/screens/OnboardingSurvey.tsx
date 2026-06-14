import React, { useState } from 'react';
import { View } from 'react-native';

// 1. Importando os dados das 31 perguntas
import { surveyQuestions } from '../data/surveyQuestions';

// 2. Importando os Templates Visuais
import QuestionTemplate from '../components/QuestionTemplate';
import MultipleChoiceTemplate from '../components/MultipleChoiceTemplate';

// 3. Importando as Telas Customizadas
import AgeSelection from './AgeSelection';
import HeightSelection from './HeightSelection';
import WeightSelection from './WeightSelection';
import WeightGoalSelection from './WeightGoalSelection';
import DaysPerWeekSelection from './DaysPerWeekSelection';

export default function SurveyScreen({ navigation }: any) {
  // Controle de qual pergunta estamos vendo agora (inicia no índice 0)
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Objeto gigante que vai guardar todas as respostas para mandar pro Backend depois
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const totalSteps = surveyQuestions.length;
  const currentQuestion = surveyQuestions[currentIndex];

  // Função disparada quando o usuário clica em "Próximo" ou seleciona uma opção
  const handleNext = (answerValue: any) => {
    // Salva a resposta no nosso objeto de estado
    const newAnswers = { ...answers, [currentQuestion.id]: answerValue };
    setAnswers(newAnswers);

    // Se ainda tem pergunta pela frente, avança o índice
    if (currentIndex < totalSteps - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Se acabou, imprime tudo e finaliza o Onboarding!
      console.log('🎉 RESPOSTAS FINAIS DO GRALHAFIT:', newAnswers);
      // Aqui entraria a chamada da sua API e o redirecionamento:
      // navigation.replace('Home');
    }
  };

  // Função disparada quando clica em "Voltar"
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      navigation.goBack(); // Volta pra tela de Boas-vindas se estiver na pergunta 1
    }
  };

  // Prevenção de quebra caso o array esteja vazio
  if (!currentQuestion) return <View className="flex-1 bg-neutral" />;

  // ==========================================
  // O GRANDE ROTEADOR (SWITCH)
  // ==========================================
  switch (currentQuestion.type) {
    case 'choice':
      return (
        <QuestionTemplate
          currentStep={currentIndex + 1}
          totalSteps={totalSteps}
          questionText={currentQuestion.questionText!}
          options={currentQuestion.options!}
          onSelect={handleNext}
          onBack={handleBack}
          showTerms={currentQuestion.showTerms}
        />
      );
    
    case 'multipleChoice':
      return (
        <MultipleChoiceTemplate
          currentStep={currentIndex + 1}
          totalSteps={totalSteps}
          questionText={currentQuestion.questionText!}
          options={currentQuestion.options!}
          onNext={handleNext}
          onBack={handleBack}
        />
      );
    
    case 'age':
      return <AgeSelection onNext={handleNext} onBack={handleBack} currentStep={currentIndex + 1} totalSteps={totalSteps} />;
    
    case 'height':
      return <HeightSelection onNext={handleNext} onBack={handleBack} currentStep={currentIndex + 1} totalSteps={totalSteps} />;
    
    case 'weight':
      return (
        <WeightSelection 
          onNext={handleNext} 
          onBack={handleBack} 
          currentStep={currentIndex + 1} 
          totalSteps={totalSteps} 
          // Passamos a altura respondida no passo 5 (se existir) para calcular o IMC!
          heightInMeters={answers.height ? answers.height / 100 : 1.82} 
        />
      );
    
    case 'weightGoal':
      return (
        <WeightGoalSelection 
          onNext={handleNext} 
          onBack={handleBack} 
          currentStep={currentIndex + 1} 
          totalSteps={totalSteps} 
          // Passamos o peso atual respondido no passo 6 (se existir)
          currentWeightKg={answers.weight || 68.0} 
        />
      );
    
    case 'daysPerWeek':
      return <DaysPerWeekSelection onNext={handleNext} onBack={handleBack} currentStep={currentIndex + 1} totalSteps={totalSteps} />;
    
    default:
      return <View className="flex-1 bg-neutral" />;
  }
}
export type SurveyQuestion = {
  id: string;
  // Adicionamos 'multipleChoice' para o futuro, caso você queira permitir selecionar mais de um item em perguntas específicas
  type: 'choice' | 'multipleChoice' | 'age' | 'height' | 'weight' | 'weightGoal' | 'daysPerWeek';
  questionText?: string;
  options?: { id: string; label: string }[];
  showTerms?: boolean;
};

export const surveyQuestions: SurveyQuestion[] = [
  // --- 🎯 OBJETIVOS ---
  {
    id: 'objective',
    type: 'choice',
    questionText: 'Qual é o seu objetivo principal?',
    options: [
      { id: 'hipertrofia', label: 'Hipertrofia e ganho de massa' },
      { id: 'perda_gordura', label: 'Perda de gordura' },
      { id: 'recomposicao', label: 'Recomposição corporal' },
      { id: 'forca', label: 'Ganho de força' },
    ],
    showTerms: true, // Termos apenas no passo 1
  },
  {
    id: 'motivation',
    type: 'choice',
    questionText: 'Você tem alguma motivação específica?',
    options: [
      { id: 'saude', label: 'Melhorar a saúde e disposição' },
      { id: 'estetica', label: 'Foco na estética corporal' },
      { id: 'evento', label: 'Preparação para um evento/viagem' },
      { id: 'constancia', label: 'Apenas criar constância' },
    ],
  },
  
  // --- 📊 MÉTRICAS E CORPO ---
  {
    id: 'gender',
    type: 'choice',
    questionText: 'Qual gênero você se identifica?',
    options: [
      { id: 'masculino', label: 'Masculino' },
      { id: 'feminino', label: 'Feminino' },
      { id: 'outro', label: 'Outro / Prefiro não dizer' },
    ],
  },
  {
    id: 'age',
    type: 'age', // Passo 4: Tela Customizada
  },
  {
    id: 'height',
    type: 'height', // Passo 5: Tela Customizada
  },
  {
    id: 'weight',
    type: 'weight', // Passo 6: Tela Customizada
  },
  {
    id: 'weightGoal',
    type: 'weightGoal', // Passo 7: Tela Customizada
  },
  {
    id: 'bodyFat',
    type: 'choice',
    questionText: 'Como você avalia seu percentual de gordura visualmente?',
    options: [
      { id: 'baixo', label: 'Baixo (Musculatura aparente)' },
      { id: 'medio', label: 'Médio (Pouca gordura visível)' },
      { id: 'alto', label: 'Alto (Excesso de gordura)' },
      { id: 'muito_alto', label: 'Muito Alto' },
    ],
  },

  // --- 🏋️ EXPERIÊNCIA DE TREINO ---
  {
    id: 'trainingTime',
    type: 'choice',
    questionText: 'Há quanto tempo você treina sem parar?',
    options: [
      { id: 'nenhum', label: 'Nunca treinei / Começando agora' },
      { id: 'menos_6m', label: 'Menos de 6 meses' },
      { id: '6m_1a', label: 'De 6 meses a 1 ano' },
      { id: 'mais_1a', label: 'Mais de 1 ano consistente' },
    ],
  },
  {
    id: 'experienceLevel',
    type: 'choice',
    questionText: 'Como você classifica seu nível de experiência?',
    options: [
      { id: 'iniciante', label: 'Iniciante' },
      { id: 'intermediario', label: 'Intermediário' },
      { id: 'avancado', label: 'Avançado' },
    ],
  },
  {
    id: 'knowsBasics',
    type: 'choice',
    questionText: 'Sabe executar exercícios básicos? (Agachamento, Supino, Terra)',
    options: [
      { id: 'sim_todos', label: 'Sim, com boa técnica' },
      { id: 'alguns', label: 'Apenas alguns' },
      { id: 'nao', label: 'Não, preciso de instrução' },
    ],
  },
  {
    id: 'tracksLoads',
    type: 'choice',
    questionText: 'Você costuma registrar suas cargas e repetições?',
    options: [
      { id: 'sempre', label: 'Sempre, anoto tudo' },
      { id: 'as_vezes', label: 'Às vezes / Lembro de cabeça' },
      { id: 'nunca', label: 'Nunca registro' },
    ],
  },
  {
    id: 'weeklyVolume',
    type: 'choice',
    questionText: 'Quantas séries por semana para músculos grandes no último treino?',
    options: [
      { id: 'menos_10', label: 'Menos de 10 séries' },
      { id: '10_15', label: '10 a 15 séries' },
      { id: '15_20', label: '15 a 20 séries' },
      { id: 'mais_20', label: 'Mais de 20 séries / Não sei' },
      {id: 'none', label: 'Nenhuma!'}
    ],
  },

  // --- 🏢 LOCAL E EQUIPAMENTOS ---
  {
    id: 'trainingLocation',
    type: 'choice',
    questionText: 'Onde você vai treinar?',
    options: [
      { id: 'academia', label: 'Academia comercial completa' },
      { id: 'predio', label: 'Academia de prédio/condomínio' },
      { id: 'casa', label: 'Em casa' },
    ],
  },
  {
    id: 'dumbbellsAccess',
    type: 'choice',
    questionText: 'Você tem acesso a halteres de diversos pesos?',
    options: [
      { id: 'sim_completos', label: 'Sim, kit completo' },
      { id: 'alguns', label: 'Apenas alguns pares' },
      { id: 'nao', label: 'Não' },
    ],
  },
  {
    id: 'barbellAccess',
    type: 'choice',
    questionText: 'Você tem acesso a barras livres e anilhas?',
    options: [
      { id: 'sim', label: 'Sim' },
      { id: 'nao', label: 'Não' },
    ],
  },
  {
    id: 'machinesAccess',
    type: 'choice',
    questionText: 'Você tem acesso a máquinas variadas e polias?',
    options: [
      { id: 'sim_muitas', label: 'Sim, muitas opções' },
      { id: 'basicas', label: 'Apenas polias básicas' },
      { id: 'nao', label: 'Não, treino livre' },
    ],
  },

  // --- 📅 DISPONIBILIDADE E ROTINA ---
  {
    id: 'daysPerWeek',
    type: 'daysPerWeek', // Passo 18: Tela Customizada
  },
  {
    id: 'sessionDuration',
    type: 'choice',
    questionText: 'Quanto tempo disponível por sessão de treino?',
    options: [
      { id: '30_45m', label: '30 a 45 minutos (Corrido)' },
      { id: '45_60m', label: '45 a 60 minutos' },
      { id: '60_90m', label: '1 hora a 1h30' },
      { id: 'sem_limite', label: 'Mais de 1h30 (Sem pressa)' },
    ],
  },
  {
    id: 'preferredDays',
    type: 'multipleChoice', // Futuro: Componente de múltipla escolha
    questionText: 'Quais dias da semana você prefere treinar?',
    options: [
      { id: 'seg_sex', label: 'Segunda a Sexta' },
      { id: 'qualquer_dia', label: 'Qualquer dia, incluindo final de semana' },
      { id: 'finais_semana', label: 'Prioridade aos finais de semana' },
    ],
  },
  {
    id: 'routineFlexibility',
    type: 'choice',
    questionText: 'Sua rotina permite mudar os dias de treino?',
    options: [
      { id: 'flexivel', label: 'Sim, sou 100% flexível' },
      { id: 'parcial', label: 'Consigo adaptar se precisar' },
      { id: 'fixa', label: 'Não, minha rotina é fixa' },
    ],
  },

  // --- 🔋 RECUPERAÇÃO E ESTILO DE VIDA ---
  {
    id: 'sleepQuality',
    type: 'choice',
    questionText: 'Como é a qualidade média do seu sono?',
    options: [
      { id: 'ruim', label: 'Menos de 6h / Sono interrompido' },
      { id: 'media', label: 'Cerca de 6h a 7h por noite' },
      { id: 'boa', label: '7h a 8h ou mais / Durmo bem' },
    ],
  },
  {
    id: 'stressLevel',
    type: 'choice',
    questionText: 'Como é o seu nível de estresse no dia a dia?',
    options: [
      { id: 'baixo', label: 'Baixo (Tranquilo)' },
      { id: 'moderado', label: 'Moderado' },
      { id: 'alto', label: 'Alto (Rotina pesada)' },
    ],
  },
  {
    id: 'physicalWork',
    type: 'choice',
    questionText: 'Seu trabalho/rotina exige muito esforço físico?',
    options: [
      { id: 'sedentario', label: 'Não, passo muito tempo sentado' },
      { id: 'moderado', label: 'Trabalho em pé ou caminhando' },
      { id: 'pesado', label: 'Sim, carrego peso ou exijo muito do corpo' },
    ],
  },
  {
    id: 'otherSports',
    type: 'choice',
    questionText: 'Pratica outro esporte? (Cardio, lutas, futebol)',
    options: [
      { id: 'sim_frequente', label: 'Sim, quase todos os dias' },
      { id: 'sim_as_vezes', label: 'Sim, 1 a 2x na semana' },
      { id: 'nao', label: 'Não, apenas musculação' },
    ],
  },
  {
    id: 'sportsDuration',
    type: 'choice',
    questionText: 'Qual a duração dessas outras atividades?',
    options: [
      { id: 'menos_30m', label: 'Menos de 30 minutos' },
      { id: '30_60m', label: 'Entre 30 minutos e 1 hora' },
      { id: 'mais_1h', label: 'Mais de 1 hora' },
      { id: 'nao_se_aplica', label: 'Não pratico outras atividades' },
    ],
  },

  // --- 🧬 FOCO ANATÔMICO E LIMITAÇÕES ---
  {
    id: 'strongPoints',
    type: 'multipleChoice', // Futuro: Componente de múltipla escolha
    questionText: 'Quais os seus pontos FORTES? (Crescem fácil)',
    options: [
      { id: 'peito', label: 'Peito / Ombros / Tríceps' },
      { id: 'costas', label: 'Costas / Bíceps' },
      { id: 'pernas', label: 'Quadríceps / Posteriores / Glúteos' },
      { id: 'nenhum', label: 'Acho tudo equilibrado' },
    ],
  },
  {
    id: 'weakPoints',
    type: 'multipleChoice', // Futuro: Componente de múltipla escolha
    questionText: 'Quais os seus pontos FRACOS? (Foco principal)',
    options: [
      { id: 'peito', label: 'Peito / Ombros / Tríceps' },
      { id: 'costas', label: 'Costas / Bíceps' },
      { id: 'pernas', label: 'Pernas / Panturrilhas' },
      { id: 'nenhum', label: 'Quero focar no corpo todo' },
    ],
  },
  {
    id: 'injuries',
    type: 'multipleChoice',
    questionText: 'Possui lesão ou dor crônica limitante?',
    options: [
      { id: 'ombros', label: 'Sim, nos ombros' },
      { id: 'cotovelos', label: 'Sim, nos cotovelos' },
      { id: 'joelhos', label: 'Sim, nos joelhos' },
      { id: 'quadris', label: 'Sim, nos quadris' },
      { id: 'coluna', label: 'Sim, na coluna/lombar' },
      { id: 'nao', label: 'Não, estou 100%' },
    ],
  },

  // --- 🍏 NUTRIÇÃO BÁSICA ---
  {
    id: 'dietPhase',
    type: 'choice',
    questionText: 'Como está sua alimentação atual?',
    options: [
      { id: 'superavit', label: 'Comendo mais (Bulking / Ganho de peso)' },
      { id: 'deficit', label: 'Comendo menos (Cutting / Perda de peso)' },
      { id: 'manutencao', label: 'Apenas mantendo o peso' },
      { id: 'nao_conto', label: 'Não controlo a alimentação' },
    ],
  },
  {
    id: 'proteinGoal',
    type: 'choice',
    questionText: 'Você consegue bater sua meta diária de proteínas?',
    options: [
      { id: 'sim', label: 'Sim, sempre bato a meta' },
      { id: 'as_vezes', label: 'Às vezes / Tento consumir' },
      { id: 'nao', label: 'Não presto muita atenção nisso' },
    ],
  },

  // --- ⚙️ PREFERÊNCIAS DE ESTRUTURA ---
  {
    id: 'trainingSplit',
    type: 'choice',
    questionText: 'Tem preferência por alguma divisão de treino?',
    options: [
      { id: 'ppl', label: 'Push / Pull / Legs (PPL)' },
      { id: 'upper_lower', label: 'Upper / Lower (Superiores / Inferiores)' },
      { id: 'fullbody', label: 'Full Body (Corpo inteiro)' },
      { id: 'abcde', label: 'ABCDE (Um músculo por dia)' },
      { id: 'auto', label: 'Deixe o app escolher a melhor pra mim' },
    ],
  },
];
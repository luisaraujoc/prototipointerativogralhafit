> **⚠️ AVISO IMPORTANTE:** Este repositório contém atualmente um **Protótipo Interativo (Front-end)**. O aplicativo foi desenvolvido estritamente para fins de apresentação de UI/UX, fluxos de navegação e demonstração de usabilidade (pitch). No momento, não possui conexão com um back-end real ou banco de dados. Os dados apresentados nas telas são simulados ("mockados").

## 📱 Sobre o GralhaFit

GralhaFit é um aplicativo de geração e acompanhamento de desempenho fitness, focado na máxima performance esportiva. Inspirado na estética e fluidez do ecossistema Apple, a interface do GralhaFit é minimalista e livre de distrações, projetada para o registro rápido de treinos com o mínimo de atrito.

## 🛠 Tecnologias Utilizadas

- **React Native / Expo** - Framework de desenvolvimento mobile
- **TypeScript** - Tipagem estática
- **NativeWind (Tailwind CSS)** - Estilização baseada em tokens de design globais
- **React Navigation** - Orquestração de rotas e fluxos
- **React Native Safe Area Context** - Gerenciamento de margens e status bar
- **Expo Vector Icons (Feather)** - Ícones

## ✨ Funcionalidades do Protótipo

Nesta versão de demonstração, os seguintes fluxos interativos estão disponíveis para exploração:

- **Onboarding e Questionário (Survey):** Fluxo imersivo de avaliação do usuário em múltiplas etapas.
- **Paywall e Autenticação:** Telas de simulação de conversão para planos e fluxo de "Sign Up".
- **Home / Dashboard principal:** Navegação baseada em *Bottom Tabs* (Home, Progresso, Perfil).
- **Criação Rápida de Treino (Add Workout):** - Interface baseada no Design System com interações em tempo real.
  - Demonstração de estados "vazios" vs "preenchidos".
  - *Bottom Sheet* mockado e animado para simular adição de exercícios (Ex: Supino Reto).
  - Componente dropdown dinâmico simulando exclusão.

## 🎨 Design System

A UI foi construída baseada em um rigoroso sistema de regras documentado (`design.md`), que garante a consistência visual em todo o app:
- **Tipografia:** Padrão Material Design 3 (MD3).
- **Espaçamento e Layout:** Grid System de 8 pontos (8pt grid).
- **Formas e Relevo:** Arredondamento suave usando *Squircles* e contraste de cores para profundidade, sem uso de sombras pesadas (estilo Apple).

## 🚀 Como Executar o Protótipo

1. Clone este repositório:

```

```text
File generated successfully.

```bash
git clone [https://github.com/luisaraujoc/gralhafit.git](https://github.com/luisaraujoc/gralhafit.git)
cd gralhafit

```

2. Instale as dependências do projeto:

```bash
npm install

```

3. Inicie o servidor do Expo:

```bash
npx expo start

```

4. Escaneie o QR Code exibido no terminal com o aplicativo **Expo Go** no seu celular (iOS/Android) ou pressione `i` / `a` para rodar em um emulador instalado no seu computador.

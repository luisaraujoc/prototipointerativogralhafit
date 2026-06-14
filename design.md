---
version: alpha
name: GralhaFit
description: Aplicativo de geração e acompanhamento de desempenho fitness.
colors:
  primary: "#034CD5"
  secondary: "#F4FBFF"
  tertiary: "#DFBA00"
  neutral: "#FCFCFC"
  surface: "#F1F1F1"
  on-tertiary: "#000713"
  border: "#E4E4E4"
typography:
  displayLarge:
    fontFamily: Elms Sans
    fontSize: 3.5rem
    fontWeight: 400
  displayMedium:
    fontFamily: Elms Sans
    fontSize: 2.8rem
    fontWeight: 400
  displaySmall:
    fontFamily: Elms Sans
    fontSize: 2.25rem
    fontWeight: 400
  headlineLarge:
    fontFamily: Elms Sans
    fontSize: 2rem
    fontWeight: 400
  headlineMedium:
    fontFamily: Elms Sans
    fontSize: 1.75rem
    fontWeight: 400
  headlineSmall:
    fontFamily: Elms Sans
    fontSize: 1.5rem
    fontWeight: 400
  titleLarge:
    fontFamily: Elms Sans
    fontSize: 1.375rem
    fontWeight: 400
  titleMedium:
    fontFamily: Elms Sans
    fontSize: 1rem
    fontWeight: 400
  titleSmall:
    fontFamily: Elms Sans
    fontSize: 0.875rem
    fontWeight: 400
  bodyLarge:
    fontFamily: Elms Sans
    fontSize: 1rem
    fontWeight: 400
  bodyMedium:
    fontFamily: Elms Sans
    fontSize: 0.875rem
    fontWeight: 400
  bodySmall:
    fontFamily: Elms Sans
    fontSize: 0.75rem
    fontWeight: 400
  labelLarge:
    fontFamily: Elms Sans
    fontSize: 0.875rem
    fontWeight: 400
  labelMedium:
    fontFamily: Elms Sans
    fontSize: 0.75rem
    fontWeight: 400
  labelSmall:
    fontFamily: Elms Sans
    fontSize: 0.6875rem
    fontWeight: 400
rounded:
  sm: 8px
  md: 14px
  lg: 32px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
    typography: "{typography.labelLarge}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
    typography: "{typography.labelLarge}"
  button-tertiary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
    typography: "{typography.labelLarge}"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
    typography: "{typography.labelLarge}"
  input-default:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
    typography: "{typography.bodyMedium}"
  input-filled:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
    typography: "{typography.bodyMedium}"
  card-default:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.sm}"
    padding: 16px
    typography: "{typography.bodyMedium}"
  card-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.md}"
    padding: 16px
    typography: "{typography.bodyMedium}"
  modal:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.lg}"
    padding: 16px
    typography: "{typography.bodyLarge}"
  bottom-sheet:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.lg}"
    padding: 16px
    typography: "{typography.bodyLarge}"
---

# GralhaFit

## Overview

Minimalismo funcional voltado para a máxima performance esportiva. A interface do GralhaFit evoca a precisão e a fluidez do ecossistema Apple, projetada para o registro rápido de treinos com o mínimo de atrito. É um ambiente digital limpo, onde não há distrações visuais, permitindo que o foco do usuário permaneça no levantamento de peso e na sua evolução contínua.

## Colors

The palette is rooted in semantic tokens. Use the role (e.g. `{colors.primary}`) — never the hex literal — when authoring components.

- **primary (#034CD5)**
- **secondary (#F4FBFF)**
- **tertiary (#DFBA00)**
- **neutral (#FCFCFC)**
- **surface (#F1F1F1)**
- **on-tertiary (#000713)**
- **border (#E4E4E4)**

## Typography

| Token | Font | Size | Weight |
| --- | --- | --- | --- |
| `displayLarge` | Elms Sans | 3.5rem | 400 |
| `displayMedium` | Elms Sans | 2.8rem | 400 |
| `displaySmall` | Elms Sans | 2.25rem | 400 |
| `headlineLarge` | Elms Sans | 2rem | 400 |
| `headlineMedium` | Elms Sans | 1.75rem | 400 |
| `headlineSmall` | Elms Sans | 1.5rem | 400 |
| `titleLarge` | Elms Sans | 1.375rem | 400 |
| `titleMedium` | Elms Sans | 1rem | 400 |
| `titleSmall` | Elms Sans | 0.875rem | 400 |
| `bodyLarge` | Elms Sans | 1rem | 400 |
| `bodyMedium` | Elms Sans | 0.875rem | 400 |
| `bodySmall` | Elms Sans | 0.75rem | 400 |
| `labelLarge` | Elms Sans | 0.875rem | 400 |
| `labelMedium` | Elms Sans | 0.75rem | 400 |
| `labelSmall` | Elms Sans | 0.6875rem | 400 |

## Layout

Spacing scale (use the named scale; avoid arbitrary values):

- `spacing.sm` — 8px
- `spacing.md` — 16px
- `spacing.lg` — 24px
- `spacing.xl` — 32px

## Elevation & Depth

A hierarquia visual é construída através de contrastes sutis de cores de fundo e raios de arredondamento generosos (squircles). Em vez de depender de sombras pesadas (drop shadows), a profundidade e a separação de conteúdo são estabelecidas pelo contraste natural entre o fundo 'neutral' do aplicativo e os cards da cor 'surface', guiando os olhos do usuário de forma orgânica.

## Shapes

Corner radius scale:

- `rounded.sm` — 8px
- `rounded.md` — 14px
- `rounded.lg` — 32px

## Components

### button-primary
- backgroundColor: `{colors.primary}`
- textColor: `{colors.neutral}`
- rounded: `{rounded.sm}`
- padding: `12px 24px`
- typography: `{typography.labelLarge}`

### button-secondary
- backgroundColor: `{colors.secondary}`
- textColor: `{colors.primary}`
- rounded: `{rounded.sm}`
- padding: `12px 24px`
- typography: `{typography.labelLarge}`

### button-tertiary
- backgroundColor: `{colors.tertiary}`
- textColor: `{colors.on-tertiary}`
- rounded: `{rounded.sm}`
- padding: `12px 24px`
- typography: `{typography.labelLarge}`

### button-ghost
- backgroundColor: `transparent`
- textColor: `{colors.primary}`
- rounded: `{rounded.sm}`
- padding: `12px 24px`
- typography: `{typography.labelLarge}`

### input-default
- backgroundColor: `{colors.neutral}`
- textColor: `{colors.on-tertiary}`
- rounded: `{rounded.sm}`
- padding: `14px 16px`
- typography: `{typography.bodyMedium}`

### input-filled
- backgroundColor: `{colors.surface}`
- textColor: `{colors.on-tertiary}`
- rounded: `{rounded.sm}`
- padding: `14px 16px`
- typography: `{typography.bodyMedium}`

### card-default
- backgroundColor: `{colors.neutral}`
- textColor: `{colors.on-tertiary}`
- rounded: `{rounded.sm}`
- padding: `16px`
- typography: `{typography.bodyMedium}`

### card-surface
- backgroundColor: `{colors.surface}`
- textColor: `{colors.on-tertiary}`
- rounded: `{rounded.md}`
- padding: `16px`
- typography: `{typography.bodyMedium}`

### modal
- backgroundColor: `{colors.neutral}`
- textColor: `{colors.on-tertiary}`
- rounded: `{rounded.lg}`
- padding: `16px`
- typography: `{typography.bodyLarge}`

### bottom-sheet
- backgroundColor: `{colors.neutral}`
- textColor: `{colors.on-tertiary}`
- rounded: `{rounded.lg}`
- padding: `16px`
- typography: `{typography.bodyLarge}`

## Do's and Don'ts

- Do: Utilize a cor Primária (azul) para as ações principais de navegação e registro de treinos.
- Do: Mantenha os formulários e campos de input preenchidos com cores sólidas (surface) e cantos arredondados, no padrão iOS.
- Don't: Não utilize a cor Terciária (amarelo/dourado) em ações comuns; reserve-a estritamente para ações de alto destaque, avisos ou conversão para o plano Premium.
- Don't: Não utilize bordas retas ou com raio de 4px em botões e cards; o padrão exige cantos suaves e arredondados.

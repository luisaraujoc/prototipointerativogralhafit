import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function Paywall({ navigation }: any) {
    // Estado para controlar qual plano está selecionado
    const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual');

    // Lista de benefícios do plano
    const features = [
        "Treine com um plano personalizado",
        "Orientação de peso para cada exercício",
        "Dados de progresso liberados",
        "Exercícios novos todos os meses"
    ];

    // Função para simular o "Continuar"
    const handleContinue = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        navigation.navigate('SignUp');
    };

    // Função para Pular
    const handleSkip = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate('SignUp');
    };

    return (
        <SafeAreaView className="flex-1 bg-neutral">
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 24 }}>

                {/* HEADER: Botão de Fechar e Restaurar */}
                <View className="flex-row items-center justify-between mt-sm mb-lg">
                    <Pressable
                        onPress={handleSkip}
                        className="w-10 h-10 bg-surface rounded-full items-center justify-center active:scale-90 transition-all"
                    >
                        <Feather name="x" size={20} color="var(--color-on-tertiary)" />
                    </Pressable>

                    <Pressable onPress={() => console.log('Restaurar compras')} className="active:opacity-70">
                        <Text className="text-body-large text-primary font-bold">Restaurar</Text>
                    </Pressable>
                </View>

                {/* HEADLINE */}
                <Text className="text-display-small font-bold text-on-tertiary mb-xl leading-tight tracking-tight">
                    Tenha acesso ao seu plano personalizado
                </Text>

                {/* LISTA DE BENEFÍCIOS */}
                <View className="gap-md mb-xl">
                    {features.map((feature, index) => (
                        <View key={index} className="flex-row items-center gap-md">
                            <Feather name="check-circle" size={22} color="var(--color-primary)" />
                            <Text className="text-body-large text-on-tertiary flex-1 leading-relaxed">
                                {feature}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* ESPAÇADOR FLEXÍVEL PARA EMPURRAR OS CARDS PRO FINAL */}
                <View className="flex-1 min-h-[24px]" />

                {/* PLANO ANUAL (12 MESES) */}
                <Pressable
                    onPress={() => {
                        setSelectedPlan('annual');
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                    // Se selecionado: Borda com a cor principal. Se não: fundo surface padrão
                    className={`relative p-md rounded-xl mb-md border-2 transition-all ${selectedPlan === 'annual'
                        ? 'border-primary bg-primary/5'
                        : 'border-transparent bg-surface'
                        }`}
                >
                    {/* BADGE DE DESCONTO */}
                    <View className="absolute -top-3 right-4 bg-primary px-3 py-1 rounded-full shadow-sm">
                        <Text className="text-white text-label-small font-bold tracking-wider uppercase">
                            58% Desconto
                        </Text>
                    </View>

                    <View className="flex-row justify-between items-center">
                        <Text className="text-headline-small font-bold text-on-tertiary">12 meses</Text>
                        <View className="items-end">
                            <Text className="text-headline-small font-bold text-on-tertiary">R$ 14,99</Text>
                            <Text className="text-body-small text-on-tertiary/60">por mês</Text>
                        </View>
                    </View>
                </Pressable>

                {/* PLANO MENSAL (1 MÊS) */}
                <Pressable
                    onPress={() => {
                        setSelectedPlan('monthly');
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                    className={`p-md rounded-xl mb-xl border-2 transition-all ${selectedPlan === 'monthly'
                        ? 'border-primary bg-primary/5'
                        : 'border-transparent bg-surface'
                        }`}
                >
                    <View className="flex-row justify-between items-center">
                        <Text className="text-headline-small font-bold text-on-tertiary">1 mês</Text>
                        <View className="items-end">
                            <Text className="text-headline-small font-bold text-on-tertiary">R$ 34,90</Text>
                            <Text className="text-body-small text-on-tertiary/60">por mês</Text>
                        </View>
                    </View>
                </Pressable>

                {/* BOTÃO CONTINUAR */}
                <Pressable
                    className="btn-primary mb-md"
                    onPress={handleContinue}
                >
                    <Text className="btn-primary-text font-bold uppercase tracking-wider">
                        Continuar
                    </Text>
                </Pressable>

                {/* TEXTO DE AVISO DINÂMICO */}
                <Text className="text-center text-label-medium text-on-tertiary/60 mb-lg px-lg">
                    {selectedPlan === 'annual'
                        ? 'Cobrança de R$ 179,88 por ano, cancelamento a qualquer momento.'
                        : 'Cobrança de R$ 34,90 por mês, cancelamento a qualquer momento.'}
                </Text>

                {/* BOTÃO PULAR */}
                <Pressable
                    onPress={handleSkip}
                    className="items-center py-sm active:opacity-60 transition-all"
                >
                    <Text className="text-body-large font-bold text-on-tertiary uppercase tracking-widest">
                        Pular
                    </Text>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
    );
}
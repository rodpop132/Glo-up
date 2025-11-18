import { AdminMetric } from "./types";

export const formatCurrency = (value: number, currency: string = "EUR") =>
  new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);

export const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

export const formatDateOnly = (value: string) =>
  new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

export const isUserOnline = (lastActivity: string, minutesThreshold = 5) => {
  const diffMinutes = (Date.now() - new Date(lastActivity).getTime()) / 60000;
  return diffMinutes <= minutesThreshold;
};

export const metricLabels: Record<AdminMetric, string> = {
  users: "Novos utilizadores/dia",
  analyses: "Analises faciais/dia",
  chat: "Mensagens IA/dia",
  meals: "Refeicoes analisadas/dia",
  revenue: "Receita diaria estimada",
};

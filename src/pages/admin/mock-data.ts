import {
  AdminLimitsConfig,
  AdminMetric,
  AdminSummary,
  AdminUser,
  BroadcastMessage,
  DirectMessage,
  SubscriptionSummary,
  TimeSeriesMap,
} from "./types";

const summary: AdminSummary = {
  total_users: 1042,
  total_free: 830,
  total_pro: 212,
  new_users_today: 23,
  analyses_today: 45,
  chat_messages_today: 130,
  meals_today: 28,
  mrr_estimate: 3175.5,
};

const timeseriesDates = [
  "2025-02-01",
  "2025-02-02",
  "2025-02-03",
  "2025-02-04",
  "2025-02-05",
  "2025-02-06",
  "2025-02-07",
  "2025-02-08",
  "2025-02-09",
  "2025-02-10",
  "2025-02-11",
  "2025-02-12",
  "2025-02-13",
  "2025-02-14",
  "2025-02-15",
];

const createSeries = (values: number[]) =>
  timeseriesDates.map((date, index) => ({
    date,
    value: values[index] ?? values[values.length - 1],
  }));

const timeSeries: TimeSeriesMap = {
  users: createSeries([18, 22, 16, 19, 25, 24, 21, 20, 18, 23, 28, 27, 30, 26, 23]),
  analyses: createSeries([12, 18, 15, 19, 24, 30, 21, 25, 18, 22, 28, 35, 32, 30, 29]),
  chat: createSeries([90, 110, 105, 104, 125, 140, 133, 150, 142, 135, 148, 168, 155, 162, 130]),
  meals: createSeries([10, 12, 14, 11, 15, 16, 18, 17, 14, 20, 19, 22, 18, 20, 28]),
  revenue: createSeries([2800, 2825, 2860, 2890, 2940, 2985, 3010, 3035, 3048, 3085, 3100, 3125, 3150, 3170, 3185]),
};

const usageTemplate = [
  { date: "2025-02-10", chat_count: 6, analysis_count: 1, meal_count: 1 },
  { date: "2025-02-11", chat_count: 5, analysis_count: 0, meal_count: 1 },
  { date: "2025-02-12", chat_count: 4, analysis_count: 1, meal_count: 0 },
  { date: "2025-02-13", chat_count: 6, analysis_count: 1, meal_count: 1 },
  { date: "2025-02-14", chat_count: 5, analysis_count: 0, meal_count: 1 },
  { date: "2025-02-15", chat_count: 7, analysis_count: 1, meal_count: 0 },
];

const duplicateUsage = (offset = 0) =>
  usageTemplate.map((entry, index) => ({
    ...entry,
    chat_count: Math.max(0, entry.chat_count + (index % 2 === 0 ? offset : -offset)),
    analysis_count: Math.max(0, entry.analysis_count),
    meal_count: Math.max(0, entry.meal_count + (index % 3 === 0 ? 0 : 1)),
  }));

const buildTimeline = (prefix: string, type: "analysis" | "meal" | "chat" | "routine", count = 3) =>
  Array.from({ length: count }).map((_, index) => ({
    id: `${prefix}-${index + 1}`,
    title:
      type === "analysis"
        ? "Analise Facial Glow"
        : type === "meal"
          ? "Refeicao analisada"
          : type === "routine"
            ? "Rotina personalizada"
            : "Mensagem no chat IA",
    timestamp: `2025-02-${12 + index}T0${index + 8}:15:00Z`,
    meta:
      type === "analysis"
        ? `Score ${80 + index * 3}/100`
        : type === "meal"
          ? ["Almoco", "Jantar", "Snacks"][index % 3]
          : type === "routine"
            ? ["Sono", "Pele", "Postura"][index % 3]
            : "Pergunta sobre skincare",
    tags:
      type === "analysis"
        ? ["IA", "Glow"]
        : type === "meal"
          ? ["Nutricao"]
          : type === "routine"
            ? ["Plano diario"]
            : ["Suporte"],
    type,
  }));

const users: AdminUser[] = [
  {
    id: 1,
    name: "Joao Silva",
    email: "joao@example.com",
    plan: "PRO",
    is_active: true,
    is_admin: false,
    created_at: "2025-01-01T10:00:00Z",
    last_login_at: "2025-02-15T09:55:00Z",
    last_activity_at: "2025-02-15T10:10:00Z",
    usage: {
      today: { chat_count: 3, analysis_count: 1, meal_count: 1 },
      totals: { chat_count: 52, analysis_count: 8, meal_count: 12 },
      perDay: duplicateUsage(1),
    },
    last_analyses: buildTimeline("joao-analysis", "analysis"),
    last_meals: buildTimeline("joao-meal", "meal"),
    last_chat_messages: buildTimeline("joao-chat", "chat"),
    last_routines: buildTimeline("joao-routine", "routine"),
    stripe_customer_id: "cus_JOAO123",
    notes: "Interessado no coaching PRO. Envia feedback semanal.",
  },
  {
    id: 2,
    name: "Maria Costa",
    email: "maria@example.com",
    plan: "FREE",
    is_active: true,
    is_admin: false,
    created_at: "2025-01-05T13:00:00Z",
    last_login_at: "2025-02-15T08:25:00Z",
    last_activity_at: "2025-02-15T08:45:00Z",
    usage: {
      today: { chat_count: 1, analysis_count: 0, meal_count: 1 },
      totals: { chat_count: 21, analysis_count: 2, meal_count: 6 },
      perDay: duplicateUsage(-2),
    },
    last_analyses: buildTimeline("maria-analysis", "analysis"),
    last_meals: buildTimeline("maria-meal", "meal"),
    last_chat_messages: buildTimeline("maria-chat", "chat"),
    last_routines: buildTimeline("maria-routine", "routine"),
    notes: "Proxima do limite FREE. Excelente candidata ao upgrade.",
  },
  {
    id: 3,
    name: "Andreia Mendes",
    email: "andreia@example.com",
    plan: "PRO",
    is_active: true,
    is_admin: true,
    created_at: "2024-12-10T11:00:00Z",
    last_login_at: "2025-02-14T20:05:00Z",
    last_activity_at: "2025-02-15T01:30:00Z",
    usage: {
      today: { chat_count: 4, analysis_count: 1, meal_count: 0 },
      totals: { chat_count: 88, analysis_count: 15, meal_count: 20 },
      perDay: duplicateUsage(2),
    },
    last_analyses: buildTimeline("andreia-analysis", "analysis"),
    last_meals: buildTimeline("andreia-meal", "meal"),
    last_chat_messages: buildTimeline("andreia-chat", "chat"),
    last_routines: buildTimeline("andreia-routine", "routine"),
    stripe_customer_id: "cus_ANDREIA777",
    notes: "Admin interno. Responsavel por feedbacks da comunidade.",
  },
  {
    id: 4,
    name: "Rafael Pinto",
    email: "rafael@example.com",
    plan: "FREE",
    is_active: false,
    is_admin: false,
    created_at: "2025-01-20T09:00:00Z",
    last_login_at: "2025-02-12T18:40:00Z",
    last_activity_at: "2025-02-12T18:42:00Z",
    usage: {
      today: { chat_count: 0, analysis_count: 0, meal_count: 0 },
      totals: { chat_count: 8, analysis_count: 1, meal_count: 1 },
      perDay: duplicateUsage(-3),
    },
    last_analyses: buildTimeline("rafael-analysis", "analysis"),
    last_meals: buildTimeline("rafael-meal", "meal"),
    last_chat_messages: buildTimeline("rafael-chat", "chat"),
    last_routines: buildTimeline("rafael-routine", "routine"),
    notes: "Conta bloqueada por chargeback. Aguardando contacto.",
  },
  {
    id: 5,
    name: "Sofia Lemos",
    email: "sofia@example.com",
    plan: "PRO",
    is_active: true,
    is_admin: false,
    created_at: "2024-11-18T17:00:00Z",
    last_login_at: "2025-02-15T06:50:00Z",
    last_activity_at: "2025-02-15T07:20:00Z",
    usage: {
      today: { chat_count: 2, analysis_count: 0, meal_count: 1 },
      totals: { chat_count: 65, analysis_count: 9, meal_count: 18 },
      perDay: duplicateUsage(0),
    },
    last_analyses: buildTimeline("sofia-analysis", "analysis"),
    last_meals: buildTimeline("sofia-meal", "meal"),
    last_chat_messages: buildTimeline("sofia-chat", "chat"),
    last_routines: buildTimeline("sofia-routine", "routine"),
    stripe_customer_id: "cus_SOFIA555",
    notes: "Participa no programa Glow Squad beta.",
  },
  {
    id: 6,
    name: "Miguel Rocha",
    email: "miguel@example.com",
    plan: "FREE",
    is_active: true,
    is_admin: false,
    created_at: "2025-02-10T14:30:00Z",
    last_login_at: "2025-02-15T10:20:00Z",
    last_activity_at: "2025-02-15T10:22:00Z",
    usage: {
      today: { chat_count: 2, analysis_count: 0, meal_count: 0 },
      totals: { chat_count: 6, analysis_count: 1, meal_count: 1 },
      perDay: duplicateUsage(-1),
    },
    last_analyses: buildTimeline("miguel-analysis", "analysis"),
    last_meals: buildTimeline("miguel-meal", "meal"),
    last_chat_messages: buildTimeline("miguel-chat", "chat"),
    last_routines: buildTimeline("miguel-routine", "routine"),
    notes: "Acabou de concluir o onboarding. Precisa de orientacao.",
  },
];

const broadcasts: BroadcastMessage[] = [
  {
    id: "broadcast-1",
    title: "Atualizacao importante do plano PRO",
    body: "O plano PRO ganhou mais 10 analises/mes e rotinas dinamicas.",
    target_plan: "PRO",
    created_at: "2025-02-13T18:10:00Z",
    sent_by: "Rodrigo",
    audience_count: 212,
  },
  {
    id: "broadcast-2",
    title: "Evento Glow Squad",
    body: "Nova masterclass com especialistas em skincare. Abre inscricao amanha.",
    target_plan: null,
    created_at: "2025-02-10T09:30:00Z",
    sent_by: "Andreia",
    audience_count: 1042,
  },
  {
    id: "broadcast-3",
    title: "Limite FREE atualizado",
    body: "Os utilizadores FREE agora tem 2 refeicoes analisadas por dia.",
    target_plan: "FREE",
    created_at: "2025-02-05T14:05:00Z",
    sent_by: "Rodrigo",
    audience_count: 830,
  },
];

const directMessages: DirectMessage[] = [
  {
    id: "dm-1",
    user_id: 1,
    user_name: "Joao Silva",
    title: "Bem-vindo ao PRO",
    body: "Joao, ja tens acesso ao coach VIP. Qualquer duvida responde a esta mensagem.",
    created_at: "2025-02-14T08:00:00Z",
    status: "sent",
  },
  {
    id: "dm-2",
    user_id: 2,
    user_name: "Maria Costa",
    title: "Feedback sobre rotina",
    body: "Maria, notei que nao completas as rotinas ha 3 dias. Precisas de ajuda?",
    created_at: "2025-02-15T07:45:00Z",
    status: "sent",
  },
  {
    id: "dm-3",
    user_id: 4,
    user_name: "Rafael Pinto",
    title: "Conta bloqueada",
    body: "Rafael, precisamos confirmar as informacoes de pagamento. Responde e resolvemos tudo.",
    created_at: "2025-02-12T20:15:00Z",
    status: "scheduled",
  },
  {
    id: "dm-4",
    user_id: 5,
    user_name: "Sofia Lemos",
    title: "Convite Glow Squad",
    body: "Sofia, temos vagas abertas para o Glow Squad. Queres participar?",
    created_at: "2025-02-11T19:30:00Z",
    status: "sent",
  },
];

const subscriptions: SubscriptionSummary[] = [
  {
    user_id: 1,
    user_email: "joao@example.com",
    plan: "PRO",
    stripe_customer_id: "cus_JOAO123",
    stripe_subscription_id: "sub_00001",
    status: "active",
    current_period_end: "2025-03-15T00:00:00Z",
    period: "monthly",
    mrr: 19.9,
  },
  {
    user_id: 3,
    user_email: "andreia@example.com",
    plan: "PRO",
    stripe_customer_id: "cus_ANDREIA777",
    stripe_subscription_id: "sub_00002",
    status: "active",
    current_period_end: "2025-03-02T00:00:00Z",
    period: "monthly",
    mrr: 29.9,
  },
  {
    user_id: 5,
    user_email: "sofia@example.com",
    plan: "PRO",
    stripe_customer_id: "cus_SOFIA555",
    stripe_subscription_id: "sub_00003",
    status: "active",
    current_period_end: "2025-04-18T00:00:00Z",
    period: "yearly",
    mrr: 24.9,
  },
  {
    user_id: 7,
    user_email: "inativo@example.com",
    plan: "PRO",
    stripe_customer_id: "cus_INATIVO123",
    stripe_subscription_id: "sub_00004",
    status: "canceled",
    current_period_end: "2025-01-25T00:00:00Z",
    period: "monthly",
    mrr: 0,
  },
  {
    user_id: 8,
    user_email: "pastdue@example.com",
    plan: "PRO",
    stripe_customer_id: "cus_PASTDUE001",
    stripe_subscription_id: "sub_00005",
    status: "past_due",
    current_period_end: "2025-02-05T00:00:00Z",
    period: "monthly",
    mrr: 19.9,
  },
];

const limits: AdminLimitsConfig = {
  free: {
    max_analyses: 1,
    max_chat_per_day: 5,
    max_meals_per_day: 1,
  },
  pro: {
    max_analyses: 999,
    max_chat_per_day: 999,
    max_meals_per_day: 999,
  },
};

export const adminMockSummary = summary;
export const adminMockTimeSeries = timeSeries;
export const adminMockUsers = users;
export const adminMockBroadcasts = broadcasts;
export const adminMockDirectMessages = directMessages;
export const adminMockSubscriptions = subscriptions;
export const adminMockLimits = limits;
export const adminMetrics: AdminMetric[] = ["users", "analyses", "chat", "meals", "revenue"];

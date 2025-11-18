export type PlanTier = "FREE" | "PRO";

export type AdminMetric = "users" | "analyses" | "chat" | "meals" | "revenue";

export interface TimeSeriesPoint {
  date: string;
  value: number;
}

export type TimeSeriesMap = Record<AdminMetric, TimeSeriesPoint[]>;

export interface AdminSummary {
  total_users: number;
  total_free: number;
  total_pro: number;
  new_users_today: number;
  analyses_today: number;
  chat_messages_today: number;
  meals_today: number;
  mrr_estimate: number;
}

export interface AdminUserListItem {
  id: number;
  name: string;
  email: string;
  plan: PlanTier;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
  last_login_at: string;
  last_activity_at: string;
  avatar?: string;
}

export interface UsageTotals {
  chat_count: number;
  analysis_count: number;
  meal_count: number;
}

export interface UsageDay extends UsageTotals {
  date: string;
}

export interface UserUsage {
  today: UsageTotals;
  totals: UsageTotals;
  perDay: UsageDay[];
}

export interface TimelineItem {
  id: string;
  title: string;
  timestamp: string;
  meta?: string;
  tags?: string[];
  type?: "analysis" | "meal" | "chat" | "routine";
}

export interface AdminUserDetail extends AdminUserListItem {
  usage: UserUsage;
  last_analyses: TimelineItem[];
  last_routines: TimelineItem[];
  last_meals: TimelineItem[];
  last_chat_messages: TimelineItem[];
  notes?: string;
  stripe_customer_id?: string;
}

export type AdminUser = AdminUserDetail;

export interface AdminFilters {
  search: string;
  plan: PlanTier | "all";
  status: "all" | "active" | "blocked";
  activity: "all" | "online" | "offline";
}

export interface BroadcastMessage {
  id: string;
  title: string;
  body: string;
  target_plan: PlanTier | null;
  created_at: string;
  sent_by: string;
  audience_count: number;
}

export interface DirectMessage {
  id: string;
  user_id: number;
  user_name: string;
  title: string;
  body: string;
  created_at: string;
  status: "sent" | "scheduled";
}

export interface SubscriptionSummary {
  user_id: number;
  user_email: string;
  plan: PlanTier;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  status: "active" | "canceled" | "past_due";
  current_period_end: string;
  period: "monthly" | "yearly";
  mrr: number;
}

export interface PlanLimits {
  max_analyses: number;
  max_chat_per_day: number;
  max_meals_per_day: number;
}

export interface AdminLimitsConfig {
  free: PlanLimits;
  pro: PlanLimits;
}

export interface PlanAudienceCount {
  FREE: number;
  PRO: number;
}

export interface BroadcastFormState {
  title: string;
  body: string;
  target_plan: PlanTier | "all";
}

export interface DirectMessageFormState {
  user_id: number;
  title: string;
  body: string;
}

import { createClient } from "@/lib/supabase/server";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { RecentExpenses } from "@/components/dashboard/recent-expenses";
import { QuickAddExpense } from "@/components/dashboard/quick-add-expense";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch expenses for the current month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { data: expenses } = await supabase
    .from("expenses")
    .select("*, categories(*)")
    .gte("date", startOfMonth.toISOString().split("T")[0])
    .order("date", { ascending: false });

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s your spending overview.
        </p>
      </div>

      <DashboardStats expenses={expenses || []} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ExpenseChart expenses={expenses || []} />
        <QuickAddExpense categories={categories || []} userId={user!.id} />
      </div>

      <RecentExpenses expenses={expenses || []} />
    </div>
  );
}

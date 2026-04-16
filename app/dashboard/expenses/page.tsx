import { createClient } from "@/lib/supabase/server";
import { ExpensesList } from "@/components/dashboard/expenses-list";
import { AddExpenseDialog } from "@/components/dashboard/add-expense-dialog";

export default async function ExpensesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: expenses } = await supabase
    .from("expenses")
    .select("*, categories(*)")
    .order("date", { ascending: false });

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">
            Manage and track all your expenses
          </p>
        </div>
        <AddExpenseDialog categories={categories || []} userId={user!.id} />
      </div>

      <ExpensesList expenses={expenses || []} />
    </div>
  );
}

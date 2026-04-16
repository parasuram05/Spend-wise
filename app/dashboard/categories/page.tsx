import { createClient } from "@/lib/supabase/server";
import { CategoriesList } from "@/components/dashboard/categories-list";
import { AddCategoryDialog } from "@/components/dashboard/add-category-dialog";

export default async function CategoriesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Organize your expenses with custom categories
          </p>
        </div>
        <AddCategoryDialog userId={user!.id} />
      </div>

      <CategoriesList categories={categories || []} />
    </div>
  );
}

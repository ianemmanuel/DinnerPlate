import { CategoryCard } from "@user-webapp/components/Categories/CategoryCard";
import { Category } from "@user-webapp/types/category";

interface SimilarCategoriesProps {
  similarCategories: Category[];
}

export function SimilarCategories({ similarCategories }: SimilarCategoriesProps) {
  return (
    <section className="mb-16 animate-fadeInUp delay-500">
      <h2 className="text-2xl font-semibold mb-6">You Might Also Like</h2>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarCategories.map(cat => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}
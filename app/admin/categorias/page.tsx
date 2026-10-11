import { GetCategories } from "@/handle/Category";
import CategoryMenu from "@/components/CategoryMenu";
import AddCategoryButton from "@/components/AddCategoryButton";
import Link from "next/link";

export default async function Categorias() {
  const categorias = await GetCategories();
  
  return (
    <main>
      <ul className="flex flex-col gap-5 p-4">
        {categorias.map((categoria) => (
          <li
            key={categoria.id}
            className="relative flex items-center justify-between bg-transparent shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] hover:bg-gold-light"
          >
            <Link
              href={`/categoria/${encodeURIComponent(categoria.name)}`}
              className="flex flex-1 p-4"
            >
              <strong>{categoria.name}</strong>
            </Link>
            <div className="pr-2">
              <CategoryMenu category={categoria} />
            </div>
          </li>
        ))}
      </ul>
      <AddCategoryButton />
    </main>
  );
}

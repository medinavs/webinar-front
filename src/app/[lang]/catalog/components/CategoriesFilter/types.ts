export interface Category {
    id: string;
    name: string;
}

export interface CategoriesFilterProps {
    categories: Category[]
    dictionary: Record<string, string>;
}
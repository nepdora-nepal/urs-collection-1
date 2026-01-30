"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCategories } from "@/hooks/use-category";
import ProductGrid from "@/components/product/ProductGrid";
import { cn } from "@/lib/utils";
import { ChevronRight, Filter, X } from "lucide-react";

export default function CollectionFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentCategory = searchParams.get("category") || "";

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useCategories({ page_size: 100 });
  const categories = categoriesData?.results || [];

  const handleCategoryClick = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categorySlug === currentCategory) {
      params.delete("category");
    } else {
      params.set("category", categorySlug);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl  flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Categories
                </h2>
                {currentCategory && (
                  <button
                    onClick={clearFilters}
                    className="text-[10px]  tracking-widest text-neutral-400 hover:text-black transition-colors flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    CLEAR
                  </button>
                )}
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => handleCategoryClick("")}
                  className={cn(
                    "w-full text-left py-2 px-3 text-sm transition-all duration-300 flex items-center justify-between group",
                    currentCategory === ""
                      ? "bg-neutral-900 text-white font-medium"
                      : "hover:bg-neutral-100 text-neutral-600 hover:text-black",
                  )}
                >
                  All Collections
                  <ChevronRight
                    className={cn(
                      "w-3 h-3 transition-transform duration-300",
                      currentCategory === ""
                        ? "translate-x-0"
                        : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                    )}
                  />
                </button>

                {isCategoriesLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-10 w-full bg-neutral-100 animate-pulse rounded"
                      />
                    ))
                  : categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.slug)}
                        className={cn(
                          "w-full text-left py-2 px-3 text-sm transition-all duration-300 flex items-center justify-between group",
                          currentCategory === cat.slug
                            ? "bg-neutral-900 text-white font-medium"
                            : "hover:bg-neutral-100 text-neutral-600 hover:text-black",
                        )}
                      >
                        {cat.name}
                        <ChevronRight
                          className={cn(
                            "w-3 h-3 transition-transform duration-300",
                            currentCategory === cat.slug
                              ? "translate-x-0"
                              : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                          )}
                        />
                      </button>
                    ))}
              </div>
            </div>

            {/* Mobile Filter Toggle could go here if needed, but for now we keep it simple */}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ProductGrid
                category={currentCategory}
                title={
                  currentCategory
                    ? categories.find((c) => c.slug === currentCategory)?.name
                    : "All Collections"
                }
                subtitle={
                  currentCategory
                    ? `Explore our ${categories.find((c) => c.slug === currentCategory)?.name?.toLowerCase()} collection.`
                    : "Browse our complete range of refined essentials."
                }
                limit={20}
              />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

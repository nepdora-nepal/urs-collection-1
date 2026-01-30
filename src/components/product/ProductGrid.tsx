"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '@/hooks/use-product';
import { getImageUrl } from '@/config/site';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge'; // Assuming you have a Badge component
import { TrendingUp, Zap, ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/use-cart';
import { toast } from 'sonner';

interface ProductGridProps {
    title?: string;
    subtitle?: string;
    category?: string;
    limit?: number;
    isFeatured?: boolean;
    isPopular?: boolean;
}

export  default function ProductGrid({
    title = "Featured Products",
    subtitle,
    category,
    limit = 4,
    isFeatured,
    isPopular
}: ProductGridProps) {
    const { data: productsData, isLoading, error } = useProducts({
        category: category,
        page_size: limit,
        is_featured: isFeatured,
        is_popular: isPopular
    });

    const { addToCart, setIsCartOpen } = useCart();

    const products: Product[] = productsData?.results || [];

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();

        if (!product || !product.id) return;

        if (product.stock === 0) {
            toast.error("Product is out of stock");
            return;
        }
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        addToCart(product as any, 1);
        setIsCartOpen(true);
        toast.success(`${product.name} added to cart`);
    };

    const calculateDiscount = (price: string, marketPrice: string): number => {
        const priceNum = parseFloat(price);
        const marketPriceNum = parseFloat(marketPrice);
        if (marketPriceNum <= priceNum) return 0;
        return Math.round(((marketPriceNum - priceNum) / marketPriceNum) * 100);
    };

    const formatPrice = (price: string): string => {
        return `Rs. ${parseFloat(price).toLocaleString('en-IN')}`;
    };

    const LoadingSkeleton = () => (
        <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 space-y-4">
                    <Skeleton className="h-10 w-64 mx-auto" />
                    <Skeleton className="h-4 w-96 mx-auto" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {Array.from({ length: limit || 5 }).map((_, i) => (
                        <div key={i} className="group">
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg mb-4">
                                <Skeleton className="w-full h-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    const ProductCard = ({ product, index }: { product: Product; index: number }) => {
        const discount = calculateDiscount(product.price, product.market_price || product.price);
        const hasDiscount = discount > 0;
        const isLowStock = product.stock < 50;
        const isOutOfStock = product.stock === 0;

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
            >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-4 cursor-pointer">
                    <Link href={`/product/${product.slug}`} className="block h-full w-full">
                        <Image
                            src={getImageUrl(product.thumbnail_image ?? '/placeholder-product.jpg')}
                            alt={product.name}
                            fill
                            className="object-cover transition-all duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />

                        {/* Product badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.is_popular && (
                                <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    Popular
                                </Badge>
                            )}
                            {product.is_featured && (
                                <Badge variant="default" className="bg-purple-500 hover:bg-purple-600">
                                    <Zap className="w-3 h-3 mr-1" />
                                    Featured
                                </Badge>
                            )}
                        </div>

                        {/* Discount badge */}
                        {hasDiscount && (
                            <Badge variant="destructive" className="absolute top-3 right-3">
                                {discount}% OFF
                            </Badge>
                        )}

                        {/* Stock status */}
                        {isOutOfStock && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="text-white font-semibold text-lg">Out of Stock</span>
                            </div>
                        )}

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                    </Link>

                    {/* Add to Cart Overlay - Outside of Link but absolute to the same container */}
                    {!isOutOfStock && (
                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                            <button
                                type="button"
                                onClick={(e) => handleAddToCart(e, product)}
                                className="w-full bg-white text-black py-3 text-[10px]  tracking-[0.2em] font-bold flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors shadow-lg pointer-events-auto"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                Add to Cart
                            </button>
                        </div>
                    )}
                </div>

                <Link href={`/product/${product.slug}`} className="block space-y-2">
                    {/* Category */}
                    {product.category && (
                        <p className="text-xs text-gray-500  tracking-wider">
                            {product.category.name}
                        </p>
                    )}

                    {/* Product name */}
                    <h3 className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 h-10">
                        {product.name}
                    </h3>

                    {/* Price section */}
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900">
                            {formatPrice(product.price)}
                        </span>
                        {hasDiscount && (
                            <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.market_price || product.price)}
                            </span>
                        )}
                    </div>

                    {/* Rating and reviews */}


                    {/* Stock indicator */}
                    {isLowStock && !isOutOfStock && (
                        <p className="text-xs text-amber-600 font-medium">
                            Only {product.stock} left in stock
                        </p>
                    )}

                    {/* Fast shipping badge */}
                    {product.fast_shipping && (
                        <div className="flex items-center gap-1 text-xs text-blue-600">
                            <Zap className="w-3 h-3" />
                            Fast shipping available
                        </div>
                    )}
                </Link>
            </motion.div>
        );
    };

    if (isLoading) return <LoadingSkeleton />;

    if (error || !products.length) {
        return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Products Found</h2>
                    <p className="text-gray-600 mb-6">
                        {error ? "Failed to load products. Please try again." : "No products available in this category."}
                    </p>
                    <Link
                        href="/collections"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
                    >
                        Browse All Collections
                        <span>→</span>
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {(title || subtitle) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        {title && (
                            <h2 className="text-3xl  md:text-4xl  text-gray-900 mb-4">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                                {subtitle}
                            </p>
                        )}
                    </motion.div>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                        />
                    ))}
                </div>

                {/* View All Link */}
                {products.length >= (limit || 10) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12 pt-8 border-t border-gray-200"
                    >
                        <Link
                            href={category ? `/collections/${category}` : '/collections'}
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors group"
                        >
                            View All Products
                            <span className="group-hover:translate-x-1 transition-transform">
                                →
                            </span>
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
};
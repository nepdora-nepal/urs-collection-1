"use client";

import React from 'react';
import ProductGrid from '@/components/product/ProductGrid';

export default function FeaturedProducts() {
    return (
        <ProductGrid
            title="Designers Choice"
            subtitle="Curated pieces that define our seasonal narrative — where craftsmanship meets contemporary vision."
            limit={4}   
        // In a real scenario, this would filter by is_featured in the hook
        // For now we rely on the ProductGrid to handle its own fetching
        />
    );
};

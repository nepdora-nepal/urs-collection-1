"use client";

import React from 'react';
import ProductGrid from '@/components/product/ProductGrid';

export default function PopularProducts() {
    return (
        <ProductGrid
            title="The Essentials"  
            subtitle="Our most coveted signatures. Timeless pieces that have become the foundation of every wardrobe."
            limit={4}
        />
    );
};

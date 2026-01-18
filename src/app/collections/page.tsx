
"use client";

import React from 'react';
import { ProductGrid } from '@/components/product/ProductGrid';

const CollectionsPage: React.FC = () => {
    return (
        <div className="pt-32">
            <React.Suspense fallback={<div className="h-96 flex items-center justify-center">Loading collections...</div>}>
                <ProductGrid
                    title="All Collections"
                    subtitle="Browse our complete range of refined essentials and accessories."
                    limit={20}
                />
            </React.Suspense>
        </div>
    );
};

export default CollectionsPage;

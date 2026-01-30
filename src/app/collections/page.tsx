import { Suspense } from 'react';
import CollectionFilter from '@/components/collections/CollectionFilter';

export default function CollectionsPage() {
    return (
        <div className="pt-32">
            <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading collections...</div>}>
                <CollectionFilter />
            </Suspense>
        </div >
    );
};

"use client";

import React from 'react';
import { useBlog } from '@/hooks/use-blogs';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import BlogDetailContent from '@/components/news/news-details-content';
import RecentBlogsSection from '@/components/news/recent-news-section';

interface NewsDetailProps {
    slug: string;
}

export default function NewsDetail({ slug }: NewsDetailProps) {
    const { data: blog, isLoading, isError } = useBlog(slug);

    if (isLoading) {
        return (
            <div className="pt-48 pb-32 flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-neutral-300 mb-4" />
                <p className="text-neutral-500 font-light tracking-widest  text-[10px]">
                    Loading Story...
                </p>
            </div>
        );
    }

    if (isError || !blog) {
        return (
            <div className="pt-48 pb-32 flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-2xl  mb-4">Story not found.</h1>
                <Link
                    href="/news"
                    className="text-neutral-500 font-light tracking-widest  text-[10px] border-b border-black/10 pb-1 hover:border-black transition-colors"
                >
                    Back to News
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-48 pb-32">
            <BlogDetailContent blog={blog} />

            <RecentBlogsSection
            />
        </div>
    );
};


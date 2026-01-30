
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/home/Hero';
import CategoryGrid from '@/components/home/CategoryGrid';
import Link from 'next/link';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { images } from '@/services/image-loader';
import NewsletterModal from '@/components/home/NewsletterModal';
import TestimonialSection from '@/components/home/TestimonialSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PopularProducts from '@/components/home/PopularProducts';
import FAQSection from '@/components/faq/FAQSection';
import ContactSection from '@/components/contact/ContactSection';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <Hero />
      <CategoryGrid />

      <FeaturedProducts />

      {/* Featured Collection Highlight */}
      <section className="h-screen relative overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            id="featured_about"
            src={images.about}
            fallbackSrc={images.about}
            className="w-full h-full object-cover grayscale-[0.5]"
            alt="Featured Section"
            fill
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h2 className="text-6xl md:text-8xl  mb-10 leading-[1.1]">
            Dressed in Time, <br /> <span className=" font-normal">Not Trends</span>
          </h2>
          <div className="flex justify-center space-x-6">
            <Link href="/collections">
              <button className="bg-white text-black px-12 py-4 text-[10px]  tracking-[0.3em] font-bold hover:bg-neutral-200 transition-colors">
                Explore Collection
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-white text-white px-12 py-4 text-[10px]  tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-colors">
                Contact Us
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      <PopularProducts />

      <FAQSection />

      <section className="bg-white">
        <ContactSection />
      </section>

      <TestimonialSection />

      <NewsletterModal />
    </motion.div>
  );
};


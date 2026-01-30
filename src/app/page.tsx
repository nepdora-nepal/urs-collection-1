"use client";

import React from "react";
import { motion } from "framer-motion";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import NewsletterModal from "@/components/home/NewsletterModal";
import TestimonialSection from "@/components/home/TestimonialSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedHighlight from "@/components/home/FeaturedHighlight";
import PopularProducts from "@/components/home/PopularProducts";
import FAQSection from "@/components/faq/FAQSection";
import ContactSection from "@/components/contact/ContactSection";

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

      <FeaturedHighlight />

      <PopularProducts />

      <FAQSection />

      <section className="bg-white">
        <ContactSection />
      </section>

      <TestimonialSection />

      <NewsletterModal />
    </motion.div>
  );
}

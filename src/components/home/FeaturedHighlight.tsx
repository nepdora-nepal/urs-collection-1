import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { images } from "@/services/image-loader";
import { Button } from "@/components/ui/button";

export default function FeaturedHighlight() {
  return (
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
          Dressed in Time, <br />{" "}
          <span className=" font-normal">Not Trends</span>
        </h2>
        <div className="flex justify-center space-x-6">
          <Link href="/collections">
            <Button
              asChild
              className="px-12 py-4 h-16  font-bold"
              variant="default"
            >
              <a>Explore Collection</a>
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              asChild
              className="px-12 py-4 h-16  font-bold"
              variant="outline"
            >
              <a>Contact Us</a>
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

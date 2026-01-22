"use client";

import Image from "next/image";

const galleryImages = [
  {
    src: "/hotariballoons.jpg",
    alt: "Hot Air Balloons, Cappadocia",
    span: "col-span-2 row-span-2",
  },
  { src: "/tokyo.jpeg", alt: "Tokyo, Japan", span: "col-span-1 row-span-1" },
  {
    src: "/big_ben.jpg",
    alt: "Big Ben, London",
    span: "col-span-1 row-span-1",
  },
  { src: "/alps.jpg", alt: "Swiss Alps", span: "col-span-1 row-span-2" },
  { src: "/egypt.jpg", alt: "Egypt Pyramids", span: "col-span-1 row-span-1" },
  {
    src: "/sky_gliding.jpg",
    alt: "Sky Gliding Adventure",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/amsterdam.jpg",
    alt: "Amsterdam, Netherlands",
    span: "col-span-2 row-span-1",
  },
];

export default function ImageGallery() {
  return (
    <section className="py-20 bg-[#222831] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Wanderlust Gallery
          </h2>
          <p className="text-lg text-[#EEEEEE]/70 max-w-2xl mx-auto">
            Get inspired by breathtaking destinations from around the world
          </p>
        </div>

        <div className="grid grid-cols-4 grid-rows-3 gap-4 h-[600px]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`${image.span} relative overflow-hidden rounded-2xl group cursor-pointer`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-semibold text-lg">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

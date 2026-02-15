"use client";

import ServiceItem from "./serviceItem";

export default function Services() {
  return (
    <section id="services" className="py-24 px-8 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        My <span className="text-purple-500">Quality Services</span>
      </h2>

      <div className="space-y-4">
        <ServiceItem
          title="Branding Design"
          description="Creating strong brand identity with modern and consistent visuals."
        />
        <ServiceItem
          title="UI/UX Design"
          description="Designing user-friendly and engaging digital experiences."
        />
        <ServiceItem
          title="Web Development"
          description="Building scalable, fast and modern web applications."
        />
        <ServiceItem
          title="App Development"
          description="Developing responsive and performant mobile applications."
        />
      </div>
    </section>
  );
}

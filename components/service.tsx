"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ServiceItem from "./serviceItem";

type Service = {
  id: string;
  title: string;
  description: string;
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  const fetchServices = async () => {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    setServices(data || []);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-24 px-8 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        My <span className="text-purple-500">Quality Services</span>
      </h2>

      <div className="space-y-6">
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
}

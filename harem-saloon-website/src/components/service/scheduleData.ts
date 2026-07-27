import { Brain, User, Lightbulb, Package } from "lucide-react";

export const categories = ["Featured", "Haircuts & Styling", "Color Services", "Hair Treatments", "Barber Services", "Nails"];

export const services = [
  {
    id: 1,
    name: "Promo of the month",
    duration: "2h - 3h",
    description: "Includes Haircut, Dogwash, Flags, Shampoo",
    price: 199,
    discount: "Save up to 10%",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=200&auto=format&fit=crop",
    category: "Featured"
  },
  {
    id: 2,
    name: "Full Hair Color",
    duration: "2h",
    description: "",
    price: 349,
    discount: "Save up to 15%",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=200&auto=format&fit=crop",
    category: "Color Services"
  },
  {
    id: 3,
    name: "Keratin Treatment",
    duration: "1h",
    description: "",
    price: 99,
    discount: "Save up to 10%",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=200&auto=format&fit=crop",
    category: "Hair Treatments"
  },
  {
    id: 4,
    name: "Makeup",
    duration: "45 min",
    description: "",
    price: 50,
    discount: "Save up to 10%",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop",
    category: "Featured"
  }
];

export const team = [
  { name: "Maria Fernandez", role: "Hair Stylist", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { name: "Virgie Sutton", role: "Hair Stylist", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
  { name: "Fernanda Suarez", role: "Hair Stylist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { name: "Lois Gregory", role: "Hair Stylist", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
  { name: "Maria Fernandez", role: "Hair Stylist", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { name: "Virgie Sutton", role: "Hair Stylist", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
  { name: "Fernanda Suarez", role: "Hair Stylist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { name: "Lois Gregory", role: "Hair Stylist", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" }
];

export const highlights = [
  { icon: Brain, title: "Expertise", desc: "Our team is constantly evolving through advanced training and creative development, delivering modern techniques with precision." },
  { icon: User, title: "Personal Care", desc: "We listen, understand, and recommend — every service is tailored to your style, needs, and lifestyle." },
  { icon: Lightbulb, title: "Creativity", desc: "Inspired by beauty, fashion, and individuality, we transform ideas into looks that feel authentic and current." },
  { icon: Package, title: "Quality Products", desc: "We work with high-performance products and professional-grade tools to ensure lasting results and hair health." }
];

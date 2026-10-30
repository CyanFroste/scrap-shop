export interface SiteConfig {
  siteName: string;
  tagline: string;
  subtagline: string;
  phone: string;
  phoneClean: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    googleMapsUrl: string;
  };
  serviceHours: string;
}

export const siteConfig: SiteConfig = {
  siteName: "ClearScrap",
  tagline: "We pick up your scrap right from your doorstep",
  subtagline: "Hassle-free scrap collection at your convenience. Accurate digital weighing, best market rates, and instant payment at your doorstep.",
  phone: "+91 98765 43210",
  phoneClean: "+919876543210",
  whatsappNumber: "919876543210",
  whatsappMessage: "Hi, I would like to schedule a scrap pickup!",
  email: "contact@clearscrap.in",
  address: {
    line1: "Plot No. 42, Industrial Area",
    line2: "Phase 2, Near City Center",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
    googleMapsUrl: "https://maps.google.com/?q=Bengaluru+Karnataka",
  },
  serviceHours: "8:00 AM – 7:30 PM (Mon – Sun)",
};


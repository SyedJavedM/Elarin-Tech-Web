export const brand = {
  name: process.env.COMPANY_NAME?.trim() || "ELARIN TECH",
  tagline: process.env.COMPANY_TAGLINE?.trim() || "Evolve, Learn, Innovate.",
  description: process.env.COMPANY_DESCRIPTION?.trim() || "Technology education, practical learning programs, and digital solutions for organizations.",
  email: process.env.CONTACT_EMAIL?.trim() || "",
  phone: process.env.CONTACT_PHONE?.trim() || "6366598880",
  address: process.env.REGISTERED_ADDRESS?.trim() || "Bengaluru, Karnataka",
  siteUrl: process.env.SITE_URL?.trim().replace(/\/$/, "") || "",
};

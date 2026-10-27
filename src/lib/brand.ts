export const brand = {
  name: process.env.COMPANY_NAME?.trim() || "[COMPANY NAME]",
  description: process.env.COMPANY_DESCRIPTION?.trim() || "Technology education, practical learning programs, and digital solutions for organizations.",
  email: process.env.CONTACT_EMAIL?.trim() || "[COMPANY EMAIL]",
  phone: process.env.CONTACT_PHONE?.trim() || "[PHONE NUMBER]",
  address: process.env.REGISTERED_ADDRESS?.trim() || "[REGISTERED ADDRESS]",
  siteUrl: process.env.SITE_URL?.trim().replace(/\/$/, "") || "",
};

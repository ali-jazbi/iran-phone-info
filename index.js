import { phoneDatabase } from "./data.js";

export function detectPhoneNumberInfo(phone) {
  if (typeof phone !== "string" || !phone.match(/^[0-9+\s()-]+$/)) {
    return null;
  }
  // Remove all spaces and dashes
  let clean = phone.replace(/[\s-()]/g, "");

  // Normalize to remove +98 / 0098 / 0
  if (clean.startsWith("+98")) clean = clean.slice(3);
  else if (clean.startsWith("0098")) clean = clean.slice(4);
  else if (clean.startsWith("0")) clean = clean.slice(1);

  // Mobile detection (first 3 digits)
  const mobileCode = clean.slice(0, 3);
  if (phoneDatabase.mobile[mobileCode]) {
    return {
      type: "mobile",
      code: mobileCode,
      operator: phoneDatabase.mobile[mobileCode],
    };
  }

  // Landline detection (first 2 digits)
  const landlineCode = clean.slice(0, 2);
  if (phoneDatabase.landline[landlineCode]) {
    return {
      type: "landline",
      code: landlineCode,
      city: phoneDatabase.landline[landlineCode],
    };
  }

  return {
    type: "unknown",
    code: null,
  };
}

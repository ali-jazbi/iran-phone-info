import { phoneDatabase } from "./data.js";

function normalizeDigits(str) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  const englishDigits = "0123456789";
  return str.replace(/[۰-۹٠-٩]/g, (digit) => {
    const persianIndex = persianDigits.indexOf(digit);
    if (persianIndex !== -1) return englishDigits[persianIndex];
    const arabicIndex = arabicDigits.indexOf(digit);
    if (arabicIndex !== -1) return englishDigits[arabicIndex];
    return digit;
  });
}

export function detectPhoneNumberInfo(phone) {
  if (typeof phone !== "string") {
    return null;
  }

  phone = normalizeDigits(phone);

  if (!phone.match(/^[0-9+\s()-]+$/)) {
    return null;
  }

  let clean = phone.replace(/[\s-()]/g, "");

  if (clean.startsWith("+98")) clean = clean.slice(3);
  else if (clean.startsWith("0098")) clean = clean.slice(4);
  else if (clean.startsWith("0")) clean = clean.slice(1);

  const mobileCode5 = clean.slice(0, 5);
  if (phoneDatabase.mobile[mobileCode5]) {
    return {
      type: "mobile",
      code: mobileCode5,
      operator: phoneDatabase.mobile[mobileCode5],
    };
  }

  const mobileCode4 = clean.slice(0, 4);
  if (phoneDatabase.mobile[mobileCode4]) {
    return {
      type: "mobile",
      code: mobileCode4,
      operator: phoneDatabase.mobile[mobileCode4],
    };
  }

  const mobileCode3 = clean.slice(0, 3);
  if (phoneDatabase.mobile[mobileCode3]) {
    return {
      type: "mobile",
      code: mobileCode3,
      operator: phoneDatabase.mobile[mobileCode3],
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

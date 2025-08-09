
# 🕵️‍♂️ Detect Phone Number Info (Iran)

<p align="center">
  <a href="https://ali-jazbi.github.io/iran-phone-info/" target="_blank">
    <img src="https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=github" alt="Live Demo">
  </a>
  <a href="https://www.npmjs.com/package/iran-phone-info" target="_blank">
    <img src="https://img.shields.io/npm/v/iran-phone-info.svg?style=for-the-badge&logo=npm" alt="npm version">
  </a>
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License: MIT">
  </a>
</p>

یک پکیج ساده و سبک برای تشخیص اطلاعات شماره تلفن‌های ایران (موبایل و ثابت).

A simple and lightweight package for detecting information of Iranian phone numbers (mobile and landline).

---

[**English Document**](#-english-version)

## 🇮🇷 نسخه فارسی

این کتابخانه به شما کمک می‌کند تا با دریافت یک شماره تلفن به صورت رشته، اطلاعاتی مثل **نوع شماره (موبایل یا ثابت)**، **اپراتور**، **کد شهر/پیش‌شماره** و **نام شهر** را استخراج کنید.

➡️ **[مشاهده دموی زنده (Live Demo)](https://ali-jazbi.github.io/iran-phone-info/)** ⬅️

### 🚀 نصب (Installation)

```bash
# npm
npm install iran-phone-info
```


### ✨ استفاده (Usage)

کار با این پکیج خیلی ساده‌ست. فقط کافیه تابع `detectPhoneNumberInfo` رو وارد کرده و شماره تلفن رو بهش بدید.

```javascript
import { detectPhoneNumberInfo } from "iran-phone-info";

// --- مثال برای شماره موبایل ---
const mobileNumber = "+989121234567";
const mobileInfo = detectPhoneNumberInfo(mobileNumber);
console.log(mobileInfo);
// خروجی:
// {
//   type: "mobile",
//   code: "912",
//   operator: "MCI (Hamrah Aval)"
// }

// --- مثال برای شماره ثابت ---
const landlineNumber = "021-12345678";
const landlineInfo = detectPhoneNumberInfo(landlineNumber);
console.log(landlineInfo);
// خروجی:
// {
//   type: "landline",
//   code: "21",
//   city: "Tehran"
// }
```

### 📦 ورودی و خروجی (API)

#### ورودی (Input)

تابع یک ورودی از نوع `string` (رشته) قبول می‌کند.
این رشته می‌تونه شامل فاصله، خط تیره (`-`)، پرانتز `()` و پیش‌شماره‌های ایران (`+98`, `0098`, `0`) باشه. پکیج به طور خودکار اون‌ها رو پاکسازی می‌کنه.

#### خروجی (Output)

خروجی یک `object` (شیء) یا `null` است که شامل فیلدهای زیر است:

- **`type`**: یک رشته (`string`) که نوع شماره را مشخص می‌کند (`"mobile"`, `"landline"` یا `"unknown"`).
- **`code`**: یک رشته (`string`) یا `null` که پیش‌شماره موبایل یا کد شهر است.
- **`operator`**: یک رشته (`string`) که نام اپراتور موبایل را نشان می‌دهد (فقط برای موبایل).
- **`city`**: یک رشته (`string`) که نام شهر را نشان می‌دهد (فقط برای خط ثابت).

### 📝 نکات مهم (Notes)

- اگر ورودی نامعتبر، خالی یا خیلی کوتاه باشه، خروجی `null` خواهد بود.
- اگر نوع شماره قابل تشخیص نباشه، `type` برابر با `"unknown"` برگردانده می‌شه.

### 🤝 مشارکت و گزارش خطا (Contributing)

خوشحال میشم اگه پیشنهاد یا انتقادی دارید یا با خطایی مواجه شدید، اون رو از طریق بخش [**Issues در گیت‌هاب**](https://github.com/ali-jazbi/iran-phone-info/issues) مطرح کنید.

### 📜 لایسنس (License)

این پروژه تحت لایسنس **MIT** منتشر شده است.

### 📝 توسعه دهنده

####  [👨‍💻 Ali Jazbi](https://github.com/ali-jazbi)

---

## 🇬🇧 English Version

A simple and lightweight package to detect information for Iranian phone numbers (mobile and landline).

➡️ **[View Live Demo](https://ali-jazbi.github.io/iran-phone-info/)** ⬅️

### 🚀 Installation

```bash
# npm
npm install iran-phone-info
```

### ✨ Usage

Using the package is straightforward. Just import the `detectPhoneNumberInfo` function and pass the phone number string to it.

```javascript
import { detectPhoneNumberInfo } from "iran-phone-info";

// --- Mobile Number Example ---
const mobileNumber = "+989121234567";
const mobileInfo = detectPhoneNumberInfo(mobileNumber);
console.log(mobileInfo);
// Output:
// {
//   type: "mobile",
//   code: "912",
//   operator: "MCI (Hamrahe Aval)"
// }

// --- Landline Number Example ---
const landlineNumber = "021-12345678";
const landlineInfo = detectPhoneNumberInfo(landlineNumber);
console.log(landlineInfo);
// Output:
// {
//   type: "landline",
//   code: "21",
//   city: "Tehran"
// }
```

### 📦 API

#### Input

The function accepts one argument of type `string`.
The input string can contain spaces, hyphens (`-`), parentheses `()`, and Iranian prefixes (`+98`, `0098`, `0`). The package automatically cleans these up.

#### Output

The function returns an `object` or `null`, containing the following fields:

- **`type`**: A `string` indicating the number type (`"mobile"`, `"landline"`, or `"unknown"`).
- **`code`**: A `string` or `null` representing the mobile prefix or the city's area code.
- **`operator`**: An optional `string` with the name of the mobile operator.
- **`city`**: An optional `string` with the name of the city for landlines.

### 📝 Notes

- If the input is invalid, empty, or too short, the function will return `null`.
- If the number type cannot be determined, the `type` will be `"unknown"`.

### 🤝 Contributing

Feel free to open an issue in the [**GitHub Issues**](https://github.com/ali-jazbi/iran-phone-info/issues) section if you have suggestions or encounter a bug.

### 📜 License

This project is licensed under the **MIT** License.

### 📝 Author

####  [👨‍💻 Ali Jazbi](https://github.com/ali-jazbi)

```

```

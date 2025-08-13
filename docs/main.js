// Import the core function
import { detectPhoneNumberInfo } from "./index.js";
// Import the database to populate the tooltip
import { phoneDatabase } from "./data.js";

// DOM Elements
const phoneInput = document.getElementById("phoneInput");
const resultDiv = document.getElementById("result");
const tooltipToggle = document.getElementById("tooltip-toggle");
const tooltipContent = document.getElementById("tooltip-content");
const operatorListContainer = document.getElementById(
  "operator-list-container"
);

const keyMap = {
  type: "نوع",
  operator: "اپراتور",
  code: "پیش شماره",
  province: "استان",
  city: "شهر",
};

/**
 * Groups mobile prefixes by operator name for the tooltip.
 */
function groupOperators() {
  const grouped = {};
  for (const code in phoneDatabase.mobile) {
    let operator = phoneDatabase.mobile[code];
    // Clean up operator name for consistency
    operator = operator.split(" - ")[0].replace("(Hamrah Aval)", "").trim();
    if (!grouped[operator]) {
      grouped[operator] = [];
    }
    grouped[operator].push(code);
  }
  return grouped;
}

/**
 * Populates the tooltip with operator data.
 */
function populateTooltip() {
  const operators = groupOperators();
  let html = `<h4 class="font-bold text-center mb-3 text-lg">اپراتورها</h4>`;
  html += '<div class="space-y-2 text-sm">';
  for (const operator in operators) {
    html += `
      <div>
        <p class="font-semibold text-indigo-300">${operator}</p>
        <p class="text-slate-300 text-xs mt-1" dir="ltr">${operators[
          operator
        ].join(", ")}</p>
      </div>
    `;
  }
  html += "</div>";
  operatorListContainer.innerHTML = html;
}

/**
 * Renders the result of the phone number detection.
 */
const renderResult = (info) => {
  if (!info) {
    resultDiv.innerHTML = `
      <div class="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-center result-item visible">
          <p class="font-semibold">شماره نامعتبر است</p>
          <p class="text-sm mt-1">لطفاً شماره را با فرمت صحیح وارد کنید.</p>
      </div>`;
    return;
  }

  const entries = Object.entries(info)
    .map(([key, value], index) => {
      if (!value) return ""; // Don't show empty values
      return `
        <div class="result-item flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700" style="transition-delay: ${
          index * 50
        }ms">
            <span class="text-slate-500 dark:text-slate-400 font-medium">${
              keyMap[key] || key
            }</span>
            <span class="font-bold text-slate-700 dark:text-slate-200 text-left" dir="ltr">${value}</span>
        </div>`;
    })
    .join("");

  resultDiv.innerHTML = `
      <div class="bg-slate-50/50 dark:bg-slate-700/30 rounded-lg p-4">
          ${entries}
          <div class="result-item flex justify-center mt-4" style="transition-delay: ${
            Object.keys(info).length * 50
          }ms">
               <button id="copyBtn" class="w-full text-sm bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800">کپی اطلاعات</button>
          </div>
      </div>`;

  setTimeout(() => {
    document
      .querySelectorAll(".result-item")
      .forEach((el) => el.classList.add("visible"));
    document.getElementById("copyBtn").addEventListener("click", () => {
      const textToCopy = JSON.stringify(info, null, 2);
      navigator.clipboard.writeText(textToCopy).then(() => {
        const btn = document.getElementById("copyBtn");
        btn.innerText = "کپی شد!";
        btn.classList.replace("bg-indigo-500", "bg-green-500");
        setTimeout(() => {
          btn.innerText = "کپی اطلاعات";
          btn.classList.replace("bg-green-500", "bg-indigo-500");
        }, 2000);
      });
    });
  }, 10);
};

// --- Event Listeners and Initializations ---

// Initial placeholder message
resultDiv.innerHTML = `<div class="text-center text-slate-400 dark:text-slate-500 pt-10"><p>نتیجه اینجا نمایش داده می‌شود</p></div>`;

// Listen for input on the phone field
phoneInput.addEventListener("input", (event) => {
  const phoneNumber = event.target.value;
  if (phoneNumber.length >= 3) {
    const info = detectPhoneNumberInfo(phoneNumber);
    renderResult(info);
  } else {
    resultDiv.innerHTML = `<div class="text-center text-slate-400 dark:text-slate-500 pt-10"><p>نتیجه اینجا نمایش داده می‌شود</p></div>`;
  }
});

// For mobile: close tooltip when tapping outside
document.addEventListener("click", (event) => {
  if (
    !tooltipContent.contains(event.target) &&
    !tooltipToggle.contains(event.target)
  ) {
    tooltipToggle.blur(); // This will hide the tooltip
  }
});

// Populate the tooltip on page load
populateTooltip();

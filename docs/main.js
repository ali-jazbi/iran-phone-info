// Import the package from a CDN
import { detectPhoneNumberInfo } from "../index.js";

const phoneInput = document.getElementById("phoneInput");
const resultDiv = document.getElementById("result");

const keyMap = {
  type: "نوع",
  operator: "اپراتور",
  province: "استان",
  city: "شهر",
};

const renderResult = (info) => {
  if (!info) {
    resultDiv.innerHTML = `
                    <div class="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-center result-item visible">
                        <p class="font-semibold">شماره نامعتبر است</p>
                        <p class="text-sm mt-1">لطفاً شماره را با فرمت صحیح وارد کنید.</p>
                    </div>
                `;
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
                </div>
            `;

  // Make results visible with animation
  setTimeout(() => {
    document
      .querySelectorAll(".result-item")
      .forEach((el) => el.classList.add("visible"));

    // Add event listener to the new copy button
    document.getElementById("copyBtn").addEventListener("click", () => {
      const textToCopy = JSON.stringify(info, null, 2);
      navigator.clipboard.writeText(textToCopy).then(() => {
        const btn = document.getElementById("copyBtn");
        btn.innerText = "کپی شد!";
        btn.classList.replace("bg-indigo-500", "bg-green-500");
        btn.classList.replace("hover:bg-indigo-600", "hover:bg-green-600");
        setTimeout(() => {
          btn.innerText = "کپی اطلاعات";
          btn.classList.replace("bg-green-500", "bg-indigo-500");
          btn.classList.replace("hover:bg-green-600", "hover:bg-indigo-600");
        }, 2000);
      });
    });
  }, 10);
};

// Initial placeholder
resultDiv.innerHTML = `
            <div class="text-center text-slate-400 dark:text-slate-500 pt-10">
                <p>نتیجه اینجا نمایش داده می‌شود</p>
            </div>
        `;

phoneInput.addEventListener("input", (event) => {
  const phoneNumber = event.target.value;
  if (phoneNumber.length >= 4) {
    // Start checking after a few digits
    const info = detectPhoneNumberInfo(phoneNumber, {
      checkLandline: true, // Check for landlines as well
    });
    renderResult(info);
  } else {
    resultDiv.innerHTML = `
                    <div class="text-center text-slate-400 dark:text-slate-500 pt-10">
                        <p>نتیجه اینجا نمایش داده می‌شود</p>
                    </div>
                `;
  }
});

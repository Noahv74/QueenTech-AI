// قاعدة بيانات تجريبية (هنكبرها مع الوقت أو نربطها بـ AI)
const mobileSolutions = {
    "a54": {
        title: "تخطي حماية FRP لجهاز Samsung A54 (U5)",
        warning: "يحتاج هذا الموديل إلى Test Point ودقة في التعامل مع نقط الـ EDL.",
        steps: [
            "فك ظهر الجهاز للوصول لنقاط الـ Test Point.",
            "استخدم كابل EDL أصلي لضمان استقرار التفليش.",
            "افتح أداة UnlockTool واختار خانة Samsung ثم Eraser FRP.",
            "وصل النقاط بملقاط (Tweezers) ثم وصل الكابل بالكمبيوتر."
        ],
        files: ["صورة نقاط الـ Test Point", "ملف الـ Loader الخاص بـ A54"]
    },
    "a10": {
        title: "حل مشكلة الـ Bootloop لجهاز Samsung A10",
        warning: "تأكد من شحن البطارية فوق 50% قبل البدء.",
        steps: [
            "حمل روم أربع ملفات (Repair Firmware) لنفس الحماية.",
            "استخدم برنامج Odin (إصدار 3.14 أو أحدث).",
            "ادخل الجهاز في وضع الـ Download Mode.",
            "ضع الملفات في خاناتها (BL, AP, CP, CSC) واضغط Start."
        ],
        files: ["رابط تحميل روم A10 الرسمي", "برنامج Odin 3.14.4"]
    }
};

function simulateSearch() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const solutionSheet = document.getElementById('solution-sheet');
    const btn = document.querySelector('.search-btn');

    if (input.trim() === "") {
        alert("اكتب الموديل يا بطل!");
        return;
    }

    // حركة التحميل
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري البحث...';

    setTimeout(() => {
        btn.innerHTML = 'ابحث عن الحل';
        
        // البحث في قاعدة البيانات
        let found = false;
        for (let key in mobileSolutions) {
            if (input.includes(key)) {
                displaySolution(mobileSolutions[key]);
                found = true;
                break;
            }
        }

        if (!found) {
            alert("الحل ده لسه مضافش في الداتابيز، بس جرب تبحث بـ 'A54' أو 'A10' عشان تشوف التجربة.");
        }
    }, 1000);
}

function displaySolution(data) {
    const solutionSheet = document.getElementById('solution-sheet');
    
    // تحديث البيانات في الصفحة
    solutionSheet.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="solution-card">
                    <h3 class="fw-bold mb-3" style="color: var(--royal-blue);"><i class="fas fa-check-circle text-success"></i> تقرير الحل: ${data.title}</h3>
                    <div class="warning-box">
                        <i class="fas fa-exclamation-triangle"></i> <strong>تحذير للفني:</strong> ${data.warning}
                    </div>
                    <h5 class="fw-bold mt-4 mb-3">خطوات العمل (لغة الصنايعية):</h5>
                    ${data.steps.map((step, index) => `
                        <div class="step-item"><span class="step-number">${index + 1}</span> ${step}</div>
                    `).join('')}
                    <hr class="my-4">
                    <h5 class="fw-bold mb-3">الملفات والأدوات المطلوبة:</h5>
                    ${data.files.map(file => `
                        <a href="#" class="btn btn-outline-primary me-2 mb-2"><i class="fas fa-download"></i> ${file}</a>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    solutionSheet.style.display = 'block';
    solutionSheet.scrollIntoView({ behavior: 'smooth' });
}
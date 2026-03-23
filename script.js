// قاعدة بيانات تجريبية للمشاكل والحلول
const techDatabase = [
    { keyword: "تخطي حماية Samsung A54", solution: "لتخطي حماية FRP لجهاز Samsung A54: قم بتوصيل الهاتف بوضع Test Mode عبر الكود *#0*# واستخدم أداة مثل SamFw لإزالة الحماية بنقرة واحدة." },
    { keyword: "فك حساب شاومي Note 10", solution: "لفك حساب Mi Account لجهاز Note 10: يفضل استخدام سيرفر رسمي لتجنب قفل الهاتف مجدداً عند الاتصال بالإنترنت، أو استخدام أداة UnlockTool بوضع EDL." },
    { keyword: "تخطي أيكلاود iPhone 11", solution: "عملية تخطي iCloud لأجهزة iPhone 11 مدعومة الآن عبر أدوات مثل iRemoval Pro مع شبكة شغالة، تتطلب تسجيل السيريال ودفع الرسوم الخاصة بالخدمة." },
    { keyword: "اصلاح بوت Poco X3", solution: "مشكلة الموت المفاجئ في Poco X3 غالباً هاردوير (معالج وذاكرة)، لكن يمكن تجربة تفليش روم رسمي عبر وضع EDL كخطوة أولى." }
];

const searchInput = document.getElementById("searchInput");
const autocompleteList = document.getElementById("autocomplete-list");
const solutionSheet = document.getElementById("solution-sheet");

// وظيفة الفلاتر السريعة
function setSearch(text) {
    searchInput.value = text;
    autocompleteList.style.display = 'none'; // اخفاء القائمة
    simulateSearch(); // تشغيل البحث فوراً
}

// عرض الاقتراحات أثناء الكتابة
searchInput.addEventListener("input", function() {
    const value = this.value.toLowerCase();
    autocompleteList.innerHTML = "";
    
    if (!value) {
        autocompleteList.style.display = 'none';
        return;
    }

    const filtered = techDatabase.filter(item => item.keyword.toLowerCase().includes(value));
    
    if (filtered.length > 0) {
        autocompleteList.style.display = 'block';
        filtered.forEach(item => {
            const div = document.createElement("div");
            div.innerHTML = `<i class="fas fa-search me-2 text-muted"></i> ` + item.keyword;
            div.onclick = function() {
                setSearch(item.keyword);
            };
            autocompleteList.appendChild(div);
        });
    } else {
        autocompleteList.style.display = 'none';
    }
});

// إخفاء القائمة عند الضغط في أي مكان خارجها
document.addEventListener("click", function (e) {
    if (e.target !== searchInput && e.target !== autocompleteList) {
        autocompleteList.style.display = 'none';
    }
});

// وظيفة البحث وعرض النتيجة
function simulateSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    // إخفاء القائمة والبحث
    autocompleteList.style.display = 'none';
    
    // البحث في قاعدة البيانات
    const result = techDatabase.find(item => item.keyword.toLowerCase() === query.toLowerCase());

    const resultText = result ? result.solution : "عفواً، لم نتمكن من العثور على حل فوري لهذه المشكلة في قاعدة البيانات. يرجى التواصل مع الدعم الفني.";

    // إظهار كارت الحل
    solutionSheet.style.display = "block";
    solutionSheet.innerHTML = `
        <div class="solution-card">
            <h3 class="fw-bold mb-3" style="color: var(--royal-blue);">
                <i class="fas fa-check-circle text-success me-2"></i> نتيجة البحث: ${query}
            </h3>
            <div class="warning-box">
                <i class="fas fa-exclamation-triangle me-2"></i> تنبيه: قم بأخذ نسخة احتياطية من بيانات العميل قبل البدء بأي عملية سوفتوير.
            </div>
            <p class="fs-5 lh-lg">${resultText}</p>
            <button class="btn btn-outline-primary mt-3" onclick="document.getElementById('solution-sheet').style.display='none'; searchInput.value='';">
                <i class="fas fa-times me-2"></i> إغلاق النتيجة
            </button>
        </div>
    `;

    // عمل Scroll ناعم لحد النتيجة
    solutionSheet.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// تشغيل البحث عند الضغط على زر Enter
searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        simulateSearch();
    }
});
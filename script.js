let solutionsData = [];

// تحميل الداتا أول ما الصفحة تفتح
window.onload = async function() {
    try {
        const response = await fetch('solutions.json');
        solutionsData = await response.json();
    } catch (error) {
        console.error("مشكلة في تحميل الداتا:", error);
    }
};

const searchInput = document.getElementById('searchInput');
const autocompleteList = document.getElementById('autocomplete-list');

// مراقبة الكتابة في شريط البحث
searchInput.addEventListener('input', function() {
    const val = this.value.toLowerCase().trim();
    autocompleteList.innerHTML = ''; 
    
    if (!val) {
        document.getElementById('solution-sheet').style.display = 'none';
        return;
    }

    // فلترة النتايج
    const matches = solutionsData.filter(item => 
        item.model.toLowerCase().includes(val) || 
        item.title.toLowerCase().includes(val)
    );

    // بناء القائمة
    matches.forEach(match => {
        const div = document.createElement('div');
        div.innerHTML = `<i class="fas fa-mobile-alt me-2 text-secondary"></i> <strong>${match.model.toUpperCase()}</strong> - ${match.title}`;
        
        div.addEventListener('click', function() {
            searchInput.value = match.model; 
            autocompleteList.innerHTML = ''; 
            displaySolution(match); 
        });
        autocompleteList.appendChild(div);
    });
});

// إخفاء القائمة لو ضغط بره
document.addEventListener('click', function(e) {
    if (e.target !== searchInput) {
        autocompleteList.innerHTML = '';
    }
});

function setSearch(text) {
    searchInput.value = text;
    simulateSearch();
}

function simulateSearch() {
    const val = searchInput.value.toLowerCase().trim();
    const btn = document.querySelector('.search-btn');

    if (!val) {
        alert("اكتب اسم الموديل الأول يا هندسة!");
        return;
    }
    
    const match = solutionsData.find(item => 
        item.model.toLowerCase().includes(val) || item.title.toLowerCase().includes(val)
    );

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري البحث...';

    setTimeout(() => {
        btn.innerHTML = 'ابحث عن الحل';
        if (match) {
            autocompleteList.innerHTML = '';
            displaySolution(match);
        } else {
            alert('الموديل ده لسه مش متسجل في الصيدلية يا هندسة.');
            document.getElementById('solution-sheet').style.display = 'none';
        }
    }, 800);
}

function displaySolution(data) {
    const solutionSheet = document.getElementById('solution-sheet');
    
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
    solutionSheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
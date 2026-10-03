// 1. إعداد الرسم البياني التفاعلي مع حماية ضد الأخطاء
document.addEventListener("DOMContentLoaded", function () {
    const chartCanvas = document.getElementById('climateChart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2021', '2022', '2023', '2024', '2025', '2026 (مستهدف)'],
                datasets: [
                    {
                        label: 'نسبة الاعتماد على الطاقة المتجددة (%)',
                        data: [12, 15, 18, 22, 28, 35],
                        borderColor: '#2d6a4f',
                        backgroundColor: 'rgba(45, 106, 79, 0.15)',
                        fill: true,
                        tension: 0.3,
                        borderWidth: 3
                    },
                    {
                        label: 'معدل خفض الانبعاثات المستهدف (%)',
                        data: [5, 8, 12, 16, 21, 27],
                        borderColor: '#52b788',
                        backgroundColor: 'transparent',
                        borderDash: [5, 5],
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                family: 'Segoe UI',
                                size: 14
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 40
                    }
                }
            }
        });
    }
});

// 2. خوارزمية اختبار الوعي المناخي Quiz
let quizScore = 0;

function answerQuiz(qNumber, isCorrect) {
    if (isCorrect) quizScore++;

    const currentStep = document.getElementById('q' + qNumber);
    if (currentStep) currentStep.style.display = 'none';

    const nextStep = document.getElementById('q' + (qNumber + 1));
    if (nextStep) {
        nextStep.style.display = 'block';
    } else {
        // نهاية الاختبار
        const quizResult = document.getElementById('quizResult');
        const restartBtn = document.getElementById('btnRestartQuiz');

        if (quizResult) {
            quizResult.style.display = 'block';
            quizResult.style.backgroundColor = '#d4edda';
            quizResult.style.color = '#155724';
            quizResult.style.border = '1px solid #c3e6cb';
            quizResult.innerHTML = `
                🏆 أحسنت! إجاباتك الصحيحة هي <strong>${quizScore} من 3</strong>.<br>
                ${quizScore === 3 ? 'ممتاز! لديك وعي مناخي استثنائي ومثالي! 🌿' : 'جيد جداً! تصفح باقي المنصة لتعزيز معلوماتك المناخية 💡'}
            `;
        }
        if (restartBtn) restartBtn.style.display = 'block';
    }
}

function restartQuiz() {
    quizScore = 0;
    document.getElementById('q1').style.display = 'block';
    document.getElementById('q2').style.display = 'none';
    document.getElementById('q3').style.display = 'none';
    
    const quizResult = document.getElementById('quizResult');
    const restartBtn = document.getElementById('btnRestartQuiz');
    
    if (quizResult) quizResult.style.display = 'none';
    if (restartBtn) restartBtn.style.display = 'none';
}

// 3. التحكم في الأسئلة الشائعة FAQ
function toggleFaq(buttonElement) {
    const answerDiv = buttonElement.nextElementSibling;
    const spanIcon = buttonElement.querySelector('span');

    if (answerDiv.style.display === 'block') {
        answerDiv.style.display = 'none';
        spanIcon.innerText = '+';
    } else {
        answerDiv.style.display = 'block';
        spanIcon.innerText = '-';
    }
}

// 4. خوارزمية حساب الأثر البيئي للمدارس بالسويس
function calculateSchoolImpact() {
    const studentsInput = document.getElementById('schoolStudents');
    const resultDiv = document.getElementById('schoolResult');

    if (!studentsInput || !resultDiv) return;

    const students = parseFloat(studentsInput.value) || 0;

    if (students <= 0) {
        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#fff3cd';
        resultDiv.style.color = '#856404';
        resultDiv.style.border = '1px solid #ffeeba';
        resultDiv.innerText = 'يرجى إدخال عدد طلاب صحيح أكبر من 0.';
        return;
    }

    const treesNeeded = Math.ceil(students / 15);
    const energySaved = Math.round(students * 12);
    const carbonReduced = Math.round(energySaved * 0.5);

    resultDiv.style.display = 'block';
    resultDiv.style.backgroundColor = '#d4edda';
    resultDiv.style.color = '#155724';
    resultDiv.style.border = '1px solid #c3e6cb';
    resultDiv.innerHTML = `
        <h4 style="margin-bottom:8px; font-size:1.1rem;">🎯 خريطة الأثر الأخضر للمدرسة:</h4>
        <p style="margin:4px 0;">• الأشجار المطلوبة لحيود كربوني بالمدرسة: <strong>${treesNeeded} شجرة</strong> 🌳</p>
        <p style="margin:4px 0;">• التوفير المتوقع في الطاقة سنوياً: <strong>${energySaved} كيلوواط</strong> ⚡</p>
        <p style="margin:4px 0;">• خفض الانبعاثات التقديري: <strong>${carbonReduced} كجم كربون</strong> 🍃</p>
    `;
}

// 5. خوارزمية حساب الأثر الكربوني الشخصي
function calculateCarbon() {
    const kmInput = document.getElementById('km');
    const electricityInput = document.getElementById('electricity');
    const resultDiv = document.getElementById('result');

    if (!kmInput || !electricityInput || !resultDiv) return;

    const km = parseFloat(kmInput.value) || 0;
    const electricity = parseFloat(electricityInput.value) || 0;

    if (km === 0 && electricity === 0) {
        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#fff3cd';
        resultDiv.style.color = '#856404';
        resultDiv.style.border = '1px solid #ffeeba';
        resultDiv.innerText = 'يرجى إدخال قيم صحيحة للمسافة أو استهلاك الكهرباء.';
        return;
    }

    const carbonFromCar = km * 30 * 0.21;
    const carbonFromElectricity = electricity * 0.5;
    const totalCarbon = Math.round(carbonFromCar + carbonFromElectricity);

    resultDiv.style.display = 'block';

    if (totalCarbon < 150) {
        resultDiv.style.backgroundColor = '#d4edda';
        resultDiv.style.color = '#155724';
        resultDiv.style.border = '1px solid #c3e6cb';
        resultDiv.innerHTML = `ممتاز! بصمتك الكربونية منخفضة جداً (تقريباً <strong>${totalCarbon} كجم</strong> كربون شهرياً). استمر في الحفاظ على البيئة! 🌱`;
    } else if (totalCarbon <= 350) {
        resultDiv.style.backgroundColor = '#fff3cd';
        resultDiv.style.color = '#856404';
        resultDiv.style.border = '1px solid #ffeeba';
        resultDiv.innerHTML = `مستوى متوسط: أثرك الكربوني حوالي <strong>${totalCarbon} كجم</strong> كربون شهرياً. ينصح بتقليل استخدام السيارة والترشيد. 💡`;
    } else {
        resultDiv.style.backgroundColor = '#f8d7da';
        resultDiv.style.color = '#721c24';
        resultDiv.style.border = '1px solid #f5c6cb';
        resultDiv.innerHTML = `مستوى مرتفع: أثرك الكربوني يبلغ <strong>${totalCarbon} كجم</strong> كربون شهرياً. ابدأ اليوم بتغيير عاداتك الموفرة للطاقة! ⚠️️`;
    }
}
function calculateImpact() {
    const elec = parseFloat(document.getElementById('electricity').value) || 0;
    const trans = parseFloat(document.getElementById('transport').value) || 0;

    // معادلة تقريبية لحساب انبعاثات الكربون
    const co2Elec = elec * 0.85; // كجم من الكربون لكل كيلوواط
    const co2Trans = trans * 4 * 0.21; // كجم من الكربون شهرياً

    const total = (co2Elec + co2Trans).toFixed(1);

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `مجموع انبعاثاتك الكربونية التقديرية: <strong>${total} كجم</strong> من ثاني أكسيد الكربون شهرياً.`;
}
function toggleDetails(id) {
    const content = document.getElementById(id);
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}
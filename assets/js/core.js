// دالة لجلب الدروس
async function loadLessons(grade) {
    try {
        // بنجيب الملف من المكان الصح
        const response = await fetch('/data/units.json');
        const data = await response.json();
        
        // بنشوف هل الصف ده موجود في الملف ولا لأ
        if (data[grade]) {
            return data[grade];
        } else {
            console.log("No lessons found for this grade");
            return [];
        }
    } catch (error) {
        console.error("Error loading lessons:", error);
        return [];
    }
}

// دالة عشان نفتح الدرس
function openLesson(url) {
    if (url) {
        window.location.href = url;
    } else {
        alert("الدرس ده مش متاح حالياً");
    }
}
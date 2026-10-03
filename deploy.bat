@echo off
echo ============================================
echo   رفع أكاديمية مستر ياسر نوفل
echo ============================================
echo.

cd /d "C:\Users\Gabrouny pc\Desktop\yasser-nofal-academy1"

echo [1/4] إضافة الملفات...
git add .

echo [2/4] تسجيل التغييرات...
set /p msg="اكتب رسالة الـ Commit (أو اضغط Enter للافتراضي): "
if "%msg%"=="" set msg=update

git commit -m "%msg%"

echo [3/4] الرفع على GitHub...
git push origin main

echo [4/4] النشر على Vercel...
vercel --prod

echo.
echo ============================================
echo   ✅ تم الرفع بنجاح!
echo ============================================
pause
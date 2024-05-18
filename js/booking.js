
// nav hide 
let navBar = document.querySelectorAll(".nav-link");
let navCollapse = document.querySelector(".navbar-collapse.collapse");
navBar.forEach(function (a) {
    a.addEventListener("click", function () {
        navCollapse.classList.remove("show");
    })
})


document.getElementById('bookingForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // الحصول على البيانات من النموذج
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var checkinDate = document.getElementById('checkin-date').value;
    var checkoutDate = document.getElementById('checkout-date').value;
    var chronicDiseasesSelection = document.getElementById('chronic-diseases');
    var chronicDiseases = chronicDiseasesSelection.options[chronicDiseasesSelection.selectedIndex].text;
    var roomSelection = document.getElementById('room');
    var room = roomSelection.options[roomSelection.selectedIndex].text;
    var mealsSelection = document.getElementById('meals');
    var meals = mealsSelection.options[mealsSelection.selectedIndex].text;

    // التحقق من صحة التواريخ
    if (new Date(checkinDate) >= new Date(checkoutDate)) {
        alert('تاريخ الخروج يجب أن يكون بعد تاريخ الدخول.');
        return;
    }

    // حساب السعر الإجمالي
    var total = calculateTotal(room, meals, checkinDate, checkoutDate);

    // إنشاء رقم فاتورة عشوائي والحصول على التاريخ والوقت
    var invoiceNumber = Math.floor(Math.random() * 1000000);
    //var currentDate = new Date().toLocaleDateString('en-US');
    var currentDate = new Date().toISOString().split('T')[0];
    var currentTime = new Date().toLocaleTimeString('en-US');

    // تعبئة بيانات الفاتورة
    document.getElementById('invoiceNumber').textContent = invoiceNumber;
    document.getElementById('invoiceDate').textContent = currentDate;
    document.getElementById('bookingTime').textContent = currentTime;
    document.getElementById('invoiceName').textContent = name;
    document.getElementById('invoicePhone').textContent = phone;
    document.getElementById('invoiceIn').textContent = checkinDate;
    document.getElementById('invoiceOut').textContent = checkoutDate;
    document.getElementById('invoicePain').textContent = chronicDiseases;
    document.getElementById('invoiceRoom').textContent = room;
    document.getElementById('invoiceMeals').textContent = meals;
    document.getElementById('invoiceTotal').textContent = total + ' رس';

    // إخفاء النموذج وعرض الفاتورة
    document.getElementById('bookingForm').style.display = 'none';
    document.getElementById('invoice').style.display = 'block';
});

function getDayCount(checkin, checkout) {
    var checkinDate = new Date(checkin);
    var checkoutDate = new Date(checkout);
    var timeDiff = checkoutDate - checkinDate;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

function calculateTotal(room, meals, checkin, checkout) {
    var roomPrice = getRoomPrice(room);
    var mealsPrice = getMealsPrice(meals);
    var dayCount = getDayCount(checkin, checkout);
    return (roomPrice + mealsPrice) * dayCount;
}

function getRoomPrice(room) {
    var roomPrices = {
        'غرفة مفردة': 1000,
        'غرفة مزدوجة': 1700,
        'جناح': 2400
    };
    return roomPrices[room] || 0;
}

function getMealsPrice(meals) {
    var mealPrices = {
        'بدون وجبة': 0,
        'فطور': 50,
        'غداء': 70,
        'عشاء': 50,
        'جميع الوجبات': 140
    };
    return mealPrices[meals] || 0;
}

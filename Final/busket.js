// Функция-конструктор Accumulator
function Accumulator(startingValue) {
    this.value = startingValue;

    // Метод для добавления значения
    this.read = function(newValue) {
        this.value += newValue;
    };

    // Метод для сброса значения
    this.reset = function() {
        this.value = 0;
    };

    // Метод для уменьшения значения
    this.subtract = function(newValue) {
        this.value -= newValue;
    };
}

// Создаём объект корзины
const cart = new Accumulator(0);
let itemCount = 0;
let items = []; // Массив для хранения цен добавленных товаров

// Обновление отображения корзины
function updateCartDisplay() {
    document.getElementById('cart-count').textContent = itemCount;
    document.getElementById('cart-total').textContent = cart.value;
}

// Добавляем обработчики для кнопок "Добавить в корзину"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const price = parseInt(this.getAttribute('data-price')); // Получаем цену товара
        cart.read(price); // Увеличиваем общую стоимость
        items.push(price); // Добавляем цену в массив товаров
        itemCount++; // Увеличиваем количество товаров
        updateCartDisplay(); // Обновляем отображение корзины
    });
});

// Добавляем дополнительные функции

// Очистка корзины
document.getElementById("clear-cart").addEventListener("click", function() {
    cart.reset(); // Сбрасываем общую стоимость
    items = []; // Очищаем массив товаров
    itemCount = 0; // Сбрасываем количество товаров
    updateCartDisplay(); // Обновляем отображение корзины
});

// Удаление случайного товара
document.getElementById("remove-item").addEventListener("click", function() {
    if (items.length > 0) {
        const randomIndex = Math.floor(Math.random() * items.length); // Случайный индекс
        const price = items[randomIndex]; // Цена удаляемого товара
        items.splice(randomIndex, 1); // Удаляем товар из массива
        cart.subtract(price); // Уменьшаем общую стоимость
        itemCount--; // Уменьшаем количество товаров
        updateCartDisplay(); // Обновляем отображение корзины
    }
});

// Фильтрация товаров по диапазону цен
document.getElementById("filter-cart").addEventListener("click", function() {
    const filteredItems = items.filter(price => price >= 500 && price <= 1000);
    alert(`Отфильтрованные товары: ${filteredItems.join(", ")}`);
});

// Сортировка товаров
document.getElementById("sort-asc").addEventListener("click", function() {
    items.sort((a, b) => a - b); // Сортировка по возрастанию
    alert(`Товары в порядке возрастания: ${items.join(", ")}`);
});

document.getElementById("sort-desc").addEventListener("click", function() {
    items.sort((a, b) => b - a); // Сортировка по убыванию
    alert(`Товары в порядке убывания: ${items.join(", ")}`);
});

// Начальная инициализация отображения корзины
updateCartDisplay();

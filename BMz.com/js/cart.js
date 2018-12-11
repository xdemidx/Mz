var cart = {};
function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
            showCart();
        }
    else {
        $('.main-cart').html('Корзина пуста!');
    }
}

function showCart() {
   if (!isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста!');
   } 
   else { 
   $.post("core.php", 
      
   { 
          "action" : "loadGoods"      
   },
   function(data) {
   
            var goods = JSON.parse(data);
   console.log(goods);
            var out = '';
            for (var id in cart) {
                out += `<button data-id="${id}" class="del">x</button>`;
                out += `<img src="images\\${goods[id].img}">`;
                out += ` ${goods[id].name  }`;
                out += `  <button data-id="${id}" class="minus">-</button>  `;
                out += ` ${cart[id]}`;
                out += `  <button data-id="${id}" class="plus">+</button>  `;
                out += cart[id]*goods[id].cost;
                out += '<br>';
            }
            $('.main-cart').html(out);
            $('.del').on('click', DEL);
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);            
        });
    }
}

function DEL() {
    //удаляем товар из корзины
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}
function plusGoods() {
    //добавляет товар в корзине
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}
function minusGoods() {
    //уменьшаем товар в корзине
    var id = $(this).attr('data-id');
    if (cart[id]==1) {
        delete cart[id];
    }
    else {
        cart[id]--;
    }
    saveCart();
    showCart();
}
function isEmpty(object) {
    //проверка корзины на пустоту
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}
$(document).ready(function () {
   loadCart();
});
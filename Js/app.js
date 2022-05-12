//Variables
const productsContainer = document.getElementById('container-products')
const containercart = document.getElementById('cart-container')
const btnClear = document.getElementById('vaciar-cart')
const btnBuy = document.getElementById('comprar-cart')
const contadorcart = document.getElementById('contadorcart')
const quantity = document.getElementById('quantity')
const totalPrice = document.getElementById('totalPrice')
const quantityTotal = document.getElementById('quantityTotal')

let cart = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'))
        actCart()
    }
})
btnClear.addEventListener('click', () => {
    cart.length = 0
    actCart();
})

btnBuy.addEventListener('click', buyBtnClicked);

//Pintar productos
products.forEach((product) => {
    const div = document.createElement('div')
    div.classList.add('product')
    div.innerHTML = `
    <img src=${product.img} alt= "">
    <h3>${product.name}</h3>
    <p class="precioproduct">Precio:$ ${product.price}</p>
    <button id="agregar${product.id}" class="button-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    productsContainer.appendChild(div)

    const button = document.getElementById(`agregar${product.id}`)
    button.addEventListener('click', (e) => {
        Toastify({
            text: "Producto agregado al carrito",
            duration: 3000
            }).showToast();
        addToCart(product.id);
    })
})

//Agregar productos al carrito/aumentar cantidad
const addToCart = (prodId) => {

    const exist = cart.some (prod => prod.id === prodId)

    if (exist){
        const prod = cart.map (prod => {
            if (prod.id === prodId){
                prod.quantity++
            }
        })
    } else {
        const item = products.find((prod) => prod.id === prodId)
        cart.push(item)
    }
    actCart();
}

//Borrar productos/actualizar
const deleteProduct = (prodId) => {
    const item = cart.find((prod) => prod.id === prodId)

    const indice = cart.indexOf(item) 
    cart.splice(indice, 1) 

    actCart();

    console.log(cart)
}

const actCart = (e) => {
    containercart.innerHTML = ""
    cart.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productEncart')
        div.innerHTML = `
        <p>${prod.name}</p>
        <p>Precio:$${prod.price}</p>
        <p>Cantidad: <span id="quantity">${prod.quantity}</span></p>
        <button onclick="deleteProduct(${prod.id})" class="button-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        containercart.appendChild(div)
        
        localStorage.setItem('cart', JSON.stringify(cart))

    })
       contadorcart.innerText = cart.length
    console.log(cart)
    totalPrice.innerText = cart.reduce((acc, prod) => acc + prod.quantity * prod.price, 0)
}

//Vaciar localstorage y carrito al simular compra
function buyBtnClicked(e){

    if(localStorage.length === 0){
    Swal.fire({
    icon: 'error',
    title: 'El carrito está vacío, agrega un producto',
    timer: 2500,
    showConfirmButton: false
    });
    }

    else{
    containercart.innerHTML = "";
    totalPrice.innerHTML = "";
    localStorage.clear();
    cart.length = 0
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Su compra fue confirmada, en breve nos contactaremos con usted',
        showConfirmButton: false,
        timer: 2500
      });
    } 
      actCart();
}

const containerModal = document.getElementsByClassName('modal-container')[0]
const btnOpen = document.getElementById('button-cart')
const btnClose = document.getElementById('closeCart')
const modalCart = document.getElementsByClassName('modal-cart')[0]


btnOpen.addEventListener('click', ()=>{
    containerModal.classList.toggle('modal-active')
})
btnClose.addEventListener('click', ()=>{
    containerModal.classList.toggle('modal-active')
})

containerModal.addEventListener('click', (event) =>{
    containerModal.classList.toggle('modal-active')

})
modalCart.addEventListener('click', (event) => {
    event.stopPropagation();
})
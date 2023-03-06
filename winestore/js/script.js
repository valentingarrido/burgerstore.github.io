const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
    btn.addEventListener('click', ()=>{
    });
})


function addToCarritoItem(e){
    const button = e.target
    const item = button.closest('.card-body')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemTitle2 = item.querySelector('.card-title2').textContent;
    const itemPrice = item.querySelector('.precio').textContent;

    const NewItem = {
        title: itemTitle,
        title2: itemTitle2,
        precio: itemPrice,
        cantidad: 1
    }

    addItemCarrito(NewItem)
}

function addItemCarrito(NewItem){
    const alert = document.querySelector('.alert')

    setTimeout(function(){
        alert.classList.add('hide')
    }, 1000)

    alert.classList.remove('hide')

    const InputElemento = tbody.getElementsByClassName('input__elemento')

    for (let i = 0; i < carrito.length; i++) {
        if ((carrito[i].title.trim() === NewItem.title.trim()) && (carrito[i].title2.trim() === NewItem.title2.trim())) {
            carrito[i].cantidad++;
            
            const inputValue = InputElemento[i].value
            inputValue.value++;
            renderCarrito()
            CarritoTotal()
            return null;
        }
    }

    carrito.push(NewItem)

    renderCarrito()
}




function renderCarrito(){
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `

        <td class="table__product">
            <h6 class="title pt-2">${item.title} | ${item.title2}</h6>
        </td>
        <td class="table__cantidad p-0 align-middle" style="max-width: 80px";>
            <input type="number" min="1" value=${item.cantidad} class="input__elemento" style="max-width: 40px">
            <button class="delete btn btn-danger border-0 p-1 align-middle">X</button>
        </td>
        <td class="table__price align-middle">
            ${item.precio}
        </td>
    `

        tr.innerHTML = Content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)

    })
    CarritoTotal()
}

function CarritoTotal(){
    let Total = 0
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        Total = Total + precio*item.cantidad
    })
    
    itemCartTotal.innerHTML = `Total $${Total}`
}

function removeItemCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    const title2 = tr.querySelector('.title').textContent;
    for(let i=0; i<carrito.length ; i++){

        if(carrito[i].title.trim() === title.trim()){
        carrito.splice(i, 1)
        }
    }

    const alert = document.querySelector('.remove')

    setTimeout( function(){
        alert.classList.add('remove')
    }, 1000)
        alert.classList.remove('remove')


    tr.remove()
    CarritoTotal()
}

function sumaCantidad(e){
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    const title2 = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if(item.title.trim() && (item.title2.trim()) === title){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value
            CarritoTotal()
        }
    })
}

const button = document.querySelector('.comprar');

button.addEventListener('click', () => {
  const phoneNumber = '+543489429747';
  const rows = document.querySelectorAll('tbody tr');
  let message = 'Hola, mi pedido es el siguiente:\n\n';
  let total = 0;

  for (const row of rows) {
    const product = row.querySelector('.table__product .title').textContent;
    const quantityInput = row.querySelector('.table__cantidad .input__elemento');
    const quantity = quantityInput ? quantityInput.value : 0;
    const price = row.querySelector('.table__price').textContent;
    const priceValue = Number(price.replace(/[^0-9.-]+/g, ''));

    if (!isNaN(priceValue) && priceValue) {
      total += priceValue * Number(quantity);
      message += `${product} x${quantity}: $${Math.round(priceValue * Number(quantity))}\n`;
    }
  }

  message += `\nTotal: $${Math.round(total)}`;
  message += `\nDireccion: `
  message += `\nMuchas Gracias!`
  message = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${message}`);
});


/* Abrir en misma pestaña */
/*
  window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
*/
const API_URL = 'http://localhost:8000/basket';
function fetchBasket() {
    fetch(API_URL)
        .then(response => {
            return response.json()
        })
        .then(response => {
            products = response;
            render(products)
        })
}
fetchBasket();

function render(products) {
    const divBlock = document.getElementsByClassName("shopping_card")[0];
    divBlock.innerHTML = "";
    products.forEach((product, index) => {
        let newBlock = `<div id="basket_card" class="card_${index}>`
        newBlock += '<div class="card_item">'
        newBlock += `<img class="basket_img" src=${product.photoUrl} alt="img">`
        newBlock += '<div class="description">'
        newBlock += `<h4>${product.name}</h4>`
        newBlock += `<span class="price">${product.price}</span>`
        newBlock += '</div>'
        newBlock += `<button data-productid=${product.id} class="remove" type="submit">Remove</button>`
        newBlock += '</div></div>'
        divBlock.innerHTML += newBlock;
    })

    const allAddBtnElements = document.getElementsByClassName("remove");
    for (let element of allAddBtnElements) {
        element.addEventListener("click", removeFromBasket);
    }
}

function removeFromBasket(event) {
    const productId = event.target.getAttribute('data-productid')
    fetch(`http://localhost:8000/basket/${productId}`, {
        method: 'DELETE',
    }).then(() => fetchBasket());
}
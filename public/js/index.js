let products = [];
let productsInBasket = [];

function fetchData() {
    const API_URL = 'http://localhost:8000/products';
    fetch(API_URL)
        .then(response => {
            return response.json()
        })
        .then(response => {
            products = response;
        })

    fetch('http://localhost:8000/basket')
        .then(response => {
            return response.json()
        })
        .then(response => {
            productsInBasket = response;
            render()
        })
}

function render() {
    const divBlock = document.getElementsByClassName("women_block")[0];
    divBlock.innerHTML = "";
    products.forEach((product, index) => {
        let newBlock = `<div class="card_${index}>`
        newBlock += '<div class="product_item">'
        newBlock += `<img src=${product.photoUrl} alt="img">`
        newBlock += '<div class="product_list">'
        newBlock += `<h3>${product.name}</h3>`
        newBlock += `<span class="price">${product.price}</span>`
        if (productsInBasket.find(productInBasket => productInBasket.id === product.id)) {
            newBlock += `<button data-productid=${product.id} class="delete" type="submit">Remove</button>`
        } else {
            newBlock += `<button data-productid=${product.id} class="add" type="submit">Add to bag</button>`
        }
        newBlock += '</div></div></div>'
        divBlock.innerHTML += newBlock;
    })

    const allAddBtnElements = document.getElementsByClassName("add");
    for (let element of allAddBtnElements) {
        element.addEventListener("click", addToBusket);
    }

    const allRemoveBtnElements = document.getElementsByClassName("delete");
    for (let element of allRemoveBtnElements) {
        element.addEventListener("click", removeFromBasket);
    }
}

function addToBusket(event) {
    const productId = event.target.getAttribute('data-productid')
    fetch('http://localhost:8000/basket', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "productId": parseInt(productId) })
    });
    fetchData()
}

function removeFromBasket(event) {
    const productId = event.target.getAttribute('data-productid')
    fetch(`http://localhost:8000/basket/${productId}`, {
        method: 'DELETE',
    });
    fetchData()
}

fetchData()
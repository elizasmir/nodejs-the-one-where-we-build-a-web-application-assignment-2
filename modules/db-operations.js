const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = lowdb(adapter);

exports.initDB = () => {

    const products = [
        {
            id: 1,
            name: 'Cardigan',
            price: '100€',
            photoUrl: '/img/19367286-XozHXVBt.jpg'
        },
        {
            id: 2,
            name: 'Blouse with lace',
            price: '200€',
            photoUrl: '/img/blouse_with_lace.jpg'
        },
        {
            id: 3,
            name: 'Sleeve blouse',
            price: '250€',
            photoUrl: 'img/short_sleeve_blouse_with_tie.jpg'
        },
        {
            id: 4,
            name: 'Cap "Brooklyn"',
            price: '350€',
            photoUrl: 'img/cap_brooklyn.jpg'
        },
        {
            id: 5,
            name: 'Dress',
            price: '400€',
            photoUrl: 'img/knitted_dress.jpg'
        },
        {
            id: 6,
            name: 'Blouse',
            price: '450€',
            photoUrl: 'img/blouse.jpg'
        },
        {
            id: 7,
            name: 'Shawl',
            price: '500€',
            photoUrl: 'img/shawl.jpg'
        },
        {
            id: 8,
            name: 'Maxi skirt',
            price: '550€',
            photoUrl: 'img/patterned_maxi_skirt.jpg'
        }
    ]

    db.defaults({ products: [], basket: [] }).write();
    
    if (!db.get('products').size().value()) {
        for (const product of products) {
            db.get('products').push(product).write();
        }
    }
}

exports.getProducts = () => {
    return db.get('products').value();
}

exports.getBasket = () => {
    return db.get('basket').value();
}

exports.findProduct = productID => db.get('products').find({id: productID}).value()
exports.addProduct = product => db.get('products').push(product).write();
exports.findBasket = productID => db.get('basket').find({id: productID}).value();
exports.addToBasket = product => db.get('basket').push(product).write();
exports.removeFromBasket = productID => db.get('basket').remove({id: productID}).write();



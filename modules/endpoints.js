const db = require('./db-operations.js');

module.exports = (app) => {

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });
    
    app.get('/products', (req, res) => {
        res.send(db.getProducts());
    });

    app.post('/products', (req, res) => {
        if (db.findProduct(req.body.id)) {
            res.send('Product with this ID already exists');
            return;
        }
        db.addProduct(req.body);
        res.send(db.getProducts());
    });

    app.get('/basket', (req, res) => {
        res.send(db.getBasket());
    });

    app.post('/basket', (req, res) => {
        if (db.findBasket(req.body.productId)) {
            res.send('You cannot add the same product to the cart again');
            return;
        }
        
        const product = db.findProduct(req.body.productId);
        if (!product) {
            res.send('You are trying to add a product that does not exist');
            return;
        }
        db.addToBasket(product);
        res.send(db.getBasket());
    });

    app.delete('/basket/:id', (req, res) => {
        const id = parseInt(req.params.id)
        if (!db.findBasket(id)) {
            res.send('You are trying to remove a product that does not exist');
            return;
        }

        db.removeFromBasket(id);
        res.send(db.getBasket());
    });
}


const fs = require('fs');
var products = JSON.parse(fs.readFileSync(__dirname + '/../database/productos.json'));

const productController = 
{
    create: function(req,res,next){
        return res.render('create')
    },
    store: function(req,res,next){
        products.push(req.body);
        let productsJSON = JSON.stringify(products);
        fs.writeFileSync(__dirname + '/../database/productos.json', productsJSON);
        return res.send('Producto creado');
    },
    edit: function(req,res,next){
        let idProduct = req.params.id;
        var productFound;
       for (let i=0; i<products.length;i++){
           if(products[i].id == idProduct){
               productFound = products[i];
               break;
           }
        }

        if(productFound){
            res.render("edit",{productFound});
        }else{
        return res.send('Usuario invalido');}
    },
    update: function(req,res,next){
        let idProduct = req.params.id;
        var editProduct2 = products.map(function(products){

            if(products.id == idProduct){

                let productEditado= req.body;
                productEditado.id = idProduct;
                return productEditado;
            }
            return products;
        });
        editProductsJSON = JSON.stringify(editProduct2);
        fs.writeFileSync(__dirname + '/../database/productos.json', editProductsJSON);
        return res.send("usuario Modificado");
    }, 
    delete: function(req,res,next){  
        let idProduct = req.params.id;
        var productDelete = products.filter(function(product){
            return products.id != idProduct;
        });
        let productFound;
        for(let i = 0; i < products.length; i++){
            if(products[i].id == idProduct){
                productFound = products[i];
                break;
            }
        }
        if(!productFound){
            return res.send('este producto no existe');
        }

        productDeleteJSON = JSON.stringify(productDelete);
        fs.writeFileSync(__dirname + '/../database/productos.json', productDeleteJSON );
        return res.send("producto eliminado");


    }
}

module.exports = productController; 
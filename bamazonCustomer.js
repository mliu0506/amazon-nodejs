var mysql = require('mysql');
var inquirer = require('inquirer');

var conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

conn.connect(function(err){
    if (err){
        throw err
    };
    console.log('connected as id ' + conn.threadId + '\n');

    store();
    
})

function store(){
    conn.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log('\n####################');     
        console.log('WELCOME TO BAMAZON');
        console.log('####################');
        
        console.log('--------------------------------------------------------------------------------------------------')
        for(var i = 0;i<res.length;i++){
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
            console.log('--------------------------------------------------------------------------------------------------')
        };
        setTimeout(function(){prompt()},500);
        
    })
};

function prompt(){
    inquirer.prompt([
        {
            type: "input",
            name: "idChoice",
            message: "Enter the ID of the product you would like to buy: ",
        },
        {
            type: "input",
            name: "quantity",
            message: "Enter the quantity you would like to buy: ",
        }
    ]).then(function(data) {
    
        console.log(data.idChoice)
        conn.query("SELECT * FROM products WHERE item_id = "+data.idChoice+";", function(err, res) {
            var stockNum = res[0].stock_quantity;
            if (err) throw err;
            if(stockNum >= data.quantity){
                var diff = stockNum - data.quantity;
                var id = parseInt(data.idChoice);
                var sales = res[0].product_sales + res[0].price * data.quantity;
                
                conn.query("UPDATE products SET ? , ? WHERE ?",
                [
                  {
                    stock_quantity: diff
                  },
                  {
                    product_sales: sales
                  },
                  {
                    item_id: id
                  }
                ],
                function(err,res){});
                console.log('\n####NEW-SALE####')
                var total = res[0].price * data.quantity;
                console.log('Success! Your total is: $'+total.toString());
                console.log('Thank YOU!')
                store();
            } else{
                console.log("Sorry, there's not enough in stock!")
                store();                
            }
            
        })
    
    });
}

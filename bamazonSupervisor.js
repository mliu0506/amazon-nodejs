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

    prompt();
    
})

function prompt(){
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                'View Product Sales by Department',
                'Create New Department',
                'Exit'
            ]
        },
    ]).then(function(data) {
        console.log(data)
        if(data.choice === 'View Product Sales by Department'){
            viewSales();
        } else if(data.choice === 'Create New Department'){
            createNewDept();
        } else if(data.choice === 'Exit'){
            exit();
        };
    });
}


function viewSales(){
    conn.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        
        var departments = [];
        for(var i = 0;i<res.length;i++){
            if(!departments.includes(res[i].department_name)){
                departments.push(res[i].department_name) 
            }; 
        };
       

        function sales(item,index){
            conn.query("SELECT * FROM products WHERE department_name = '"+item+"';", function(err, res){
                if (err) throw err;
                var sales = 0;
                for(var i = 0; i<res.length;i++){
                    sales = sales +res[i].product_sales;
                }
                sales = parseFloat(sales).toFixed(2);
                conn.query("UPDATE departments SET total_sales = '"+sales+"' WHERE department_name = '"+item+"';", function(err, res){
                    if (err) throw err;
                });
                 
            });
        };
  

        console.log('\n####################');     
        console.log('SALES BY DEPARTMENT');
        console.log('####################');
        departments.forEach(sales); // call the sales function to update the total sales per each department
        
    });   
    conn.query("SELECT * FROM departments;", function(err, res){
        if (err) throw err;
        console.log('---------------------------------------------------------------------------------------------------------------------------------------')
        for(var i = 0;i<res.length;i++){
                console.log("Department ID: " + res[i].department_id + " | " + "Department Name: " + res[i].department_name + " | " + "Over Head Cost: " + parseFloat(res[i].over_head_costs).toFixed(2) + " | " + "Product Sales: " + parseFloat(res[i].total_sales).toFixed(2) + " | " + "Total Profit: " + parseFloat(res[i].total_sales - res[i].over_head_costs).toFixed(2));
                console.log('---------------------------------------------------------------------------------------------------------------------------------------')
        }
           
    });
         
    setTimeout(function(){prompt()},500);   
};

  //create a new department
  function createNewDept(){
    console.log('\n########################'); 
    console.log('Creating New Department');
    console.log('#########################');
    //prompts to add deptName and over head cost. 
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the Department Name: ",
        },
        {
            type: "input",
            name: "cost",
            message: "Enter the Over Head Cost: ",
        }
    ]).then(function(data) {

        var sql = "INSERT INTO departments (department_id, department_name, over_head_costs, total_sales) VALUES ?";

        var values = [
            [0, data.name, parseInt(data.cost), 0]
        ];

        conn.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows+'\n');
            console.log('===========================\n');
            setTimeout(function(){prompt()},500);
        });
    });
  };
  
  function exit(){
    conn.end();
    process.exit();
}
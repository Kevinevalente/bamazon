//Credentials for Connecting MYSQL
var mysql = require('mysql');

var inquirer = require("inquirer");

var productID = ""; 

var results = "";

require("console.table");

 var connection = mysql.createConnection({
 	host: 'localhost',
 	port: 3306,
 	user: 'root',
 	password: 'Valente1',
 	database: 'bamazon_DB'
 });

//Connects MYSQL to To JS
 connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id "+ connection.threadId);
		   console.log("test");
		read();
});

//Displays Product Table
function read() {

	connection.query('SELECT * FROM products', function(err,results) {
	 	if (err) throw err;
	 	console.table(results);
	 	run();
	 });
};

// Prompts user to enter in Product ID
 function run() {
	inquirer.prompt([
	{
		name: "product_ID",
		message: "Please Enter Product ID you wish to purchase"
	}

	]).then(function(answers) { 	

	 productID = answers.product_ID;
// We use == because javascript reads answers.product_ID as a string and at the same time, its reading what we set it equal to as an integer. Even though a string does not equal an integer, Javascript takes the most common form of the values and sets them equal to each other. 

//For example, 1 === "1" will read false however, 1 == "1" will read true.

		if(answers.product_ID == 1){
			purchase(productID);
		} else if (answers.product_ID == 2 ){
			purchase();
		} else if (answers.product_ID == 3){
			purchase();
		} else if (answers.product_ID == 4){
			purchase();
		} else if (answers.product_ID == 5){
			purchase();
		} else if (answers.product_ID == 6){
			purchase();
		} else if (answers.product_ID == 7){
			purchase();
		} else if (answers.product_ID == 8){
			purchase();
		} else if (answers.product_ID == 9){
			purchase();
		} else if (answers.product_ID == 10){
			purchase();
		} else {
			console.log("Plese enter correct ID");
			end();
		};
	});
};

//Prompts User how many products to
function purchase(id) {
	inquirer.prompt([
	{
		name: "purchase",
		message: "Please enter the quantity you would like to purchase"
	}

	]).then(function(answers) {
		console.log(id)
		connection.query('SELECT stock_quantity FROM products WHERE item_id = ?', [id], function(err, results) {
			if (err) throw err;
				results = results[0].stock_quantity - answers.purchase;
					console.log(results);

		}); 
				
				if(answers.purchase < 1000){
					console.log("Item(s) added to Cart")
				} else if (answers.purchase > 1000) {
					console.log("insufficient quantity!")
				} else {
					console.log("Plese enter correct quantity");
					end();
		};
	});
};




function end() {
	connection.end();
};








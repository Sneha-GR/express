const mongoose = require('mongoose');
const Product = require('./models/Product');  // ✅ Correct path


async function addProducts() {
    try {
        const products = [
            { name: "Laptop", price: 45000, description: "High performance laptop" },
            { name: "Mobile", price: 18000, description: "Latest Android smartphone" },
            { name: "Headphones", price: 2000, description: "Noise cancellation headphones" }
        ];

        await Product.insertMany(products);
        console.log("Products added successfully!");
        mongoose.connection.close();
    } catch (err) {
        console.log(err);
    }
}

addProducts();

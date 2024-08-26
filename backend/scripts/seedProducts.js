import { connectDB } from '../config/db.js'; 
import fs from 'fs';
import path from 'path';

const seedProducts = async () => {
    try {
        const db = await connectDB();
        const collection = db.collection('products');
        const filePath = path.join(process.cwd(), 'products.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContents);

        if (!data.products || !Array.isArray(data.products)) {
            throw new Error('The products key must contain an array of documents.');
        }

        const products = data.products;
        await collection.deleteMany({});
        await collection.insertMany(products);

        console.log('Products added successfully!');
    } catch (error) {
        console.error(error);
    }
};

seedProducts();

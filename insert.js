
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

fs.readFile('products.json', 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err);
    return;
  }

  try {
    // Parse the JSON data
    const products = JSON.parse(data);

    // Use the `createMany` function to insert multiple records at once
    const createdProducts = await prisma.book_show.createMany({
      data: products,
    });

    console.log('Data inserted into the database:', createdProducts);
  } catch (error) {
    console.error('Error parsing JSON or inserting data:', error);
  } finally {
    await prisma.$disconnect();
  }
});

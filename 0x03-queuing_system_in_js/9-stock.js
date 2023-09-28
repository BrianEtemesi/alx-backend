import express from 'express';
import { promisify } from 'util';
import { createClient } from 'redis';

// Sample product data
const productData = [
  {
    itemId: 1,
    itemName: 'Suitcase 250',
    price: 50,
    initialAvailableQuantity: 4
  },
  // ... (other product items)
];

// Function to find a product by its ID
const getItemById = (id) => {
  const item = productData.find(obj => obj.itemId === id);

  if (item) {
    return { ...item };
  }
};

const app = express();
const redisClient = createClient();
const PORT = 1245;

// Promisify Redis SET and GET operations for easier use
const setReservedStockAsync = promisify(redisClient.SET).bind(redisClient);
const getReservedStockAsync = promisify(redisClient.GET).bind(redisClient);

// API endpoint to list all products
app.get('/products', (_, res) => {
  res.json(productData);
});

// API endpoint to retrieve product details by ID
app.get('/products/:itemId(\\d+)', (req, res) => {
  const itemId = Number.parseInt(req.params.itemId);
  const productItem = getItemById(itemId);

  if (!productItem) {
    res.json({ status: 'Product not found' });
    return;
  }

  // Retrieve and calculate the current available quantity based on reserved stock
  getReservedStockAsync(`item.${itemId}`)
    .then((result) => Number.parseInt(result || 0))
    .then((reservedStock) => {
      productItem.currentQuantity = productItem.initialAvailableQuantity - reservedStock;
      res.json(productItem);
    });
});

// API endpoint to reserve a product by ID
app.get('/reserve/:itemId', (req, res) => {
  const itemId = Number.parseInt(req.params.itemId);
  const productItem = getItemById(itemId);

  if (!productItem) {
    res.json({ status: 'Product not found' });
    return;
  }

  // Check if there's enough stock available for reservation
  getReservedStockAsync(`item.${itemId}`)
    .then((result) => Number.parseInt(result || 0))
    .then((reservedStock) => {
      if (reservedStock >= productItem.initialAvailableQuantity) {
        res.json({ status: 'Not enough stock available', itemId });
        return;
      }

      // Reserve the product and update reserved stock
      return setReservedStockAsync(`item.${itemId}`, reservedStock + 1)
        .then(() => {
          res.json({ status: 'Reservation confirmed', itemId });
        });
    });
});

// Function to reset product stocks (used during server startup)
const resetProductStocks = () => {
  return Promise.all(
    productData.map(item =>
      setReservedStockAsync(`item.${item.itemId}`, 0)
    )
  );
};

// Start the server and reset product stocks
app.listen(PORT, () => {
  resetProductStocks()
    .then(() => {
      console.log(`API available on localhost port ${PORT}`);
    });
});


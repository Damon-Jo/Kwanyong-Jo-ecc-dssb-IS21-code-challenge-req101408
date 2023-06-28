const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const ProductService = require('./ProductService');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).send('Message from server: Server is healthy!');
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Failed to fetch products
 */
app.get('/api/products', (req, res) => {
    ProductService.getAllProducts()
        .then((products) => res.status(200).json(products))
        .catch((error) =>
            res.status(500).json({ error: 'Failed to fetch products' })
        );
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to fetch product
 */
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    ProductService.getProductById(productId)
        .then((product) => {
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        })
        .catch((error) =>
            res.status(500).json({ error: 'Failed to fetch product' })
        );
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     description: Add a new product to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Failed to add product
 */
app.post('/api/products', (req, res) => {
    const newProduct = req.body;

    ProductService.addProduct(newProduct)
        .then((addedProduct) => res.status(200).json(addedProduct))
        .catch((error) => res.status(500).json({ error: 'Failed to add product' }));
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     description: Update an existing product in the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Failed to update product
 */
app.put('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;

    ProductService.updateProduct(productId, updatedProduct)
        .then((updatedProduct) => res.status(200).json(updatedProduct))
        .catch((error) =>
            res.status(500).json({ error: 'Failed to update product' })
        );
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Failed to delete product
 */
app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    ProductService.deleteProduct(productId)
        .then((deletedProduct) => res.status(200).json(deletedProduct))
        .catch((error) =>
            res.status(500).json({ error: 'Failed to delete product' })
        );
});

app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

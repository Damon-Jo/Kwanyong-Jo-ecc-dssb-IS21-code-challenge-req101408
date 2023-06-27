const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const ProductService = require('./ProductService');

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).send('Message from server: Server is healthy!');
});

app.get('/api/products', (req, res) => {
    ProductService.getAllProducts()
        .then((projects) => res.json(projects))
        .catch((error) =>
            res.status(500).json({ error: 'Failed to fetch products' })
        );
});

app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    ProductService.getProductById(productId)
        .then((project) => {
            if (project) {
                res.json(project);
            } else {
                res.status(404).json({ error: 'Project not found' });
            }
        })
        .catch((error) =>
            res.status(500).json({ error: 'Failed to fetch project' })
        );
});

app.post('/api/products', (req, res) => {
    const newProject = req.body;

    ProductService.addProduct(newProject)
        .then((addedProject) => res.status(201).json(addedProject))
        .catch((error) => res.status(500).json({ error: 'Failed to add project' }));
});

app.put('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProject = req.body;

    ProductService.updateProduct(productId, updatedProject)
        .then((updatedProject) => res.status(200).json(updatedProject))
        .catch((error) =>
            res.status(500).json({ error: 'Failed to update project' })
        );
});

app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    ProductService.deleteProduct(productId)
        .then((deletedProject) => res.status(200).json(deletedProject))
        .catch((error) =>
            res.status(500).json({ error: 'Failed to delete project' })
        );
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
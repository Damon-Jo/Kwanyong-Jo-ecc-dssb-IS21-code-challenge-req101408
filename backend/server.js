const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 5000;
const path = require('path');
// const dataFilePath = path.join(__dirname, 'data.json');
const dataFilePath = path.resolve(__dirname, 'src', 'data.json');

// const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

app.get('/api/health', (req, res) => {
    res.status(200).send('Message from server: Server is healthy!');
});


app.get('/api/products', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            res.status(500).json({ error: 'Failed to fetch products' });
            return;
        }

        try {
            const projects = JSON.parse(data);
            res.json(projects);
        } catch (parseError) {
            console.error('Error parsing data file:', parseError);
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    });
})

app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            res.status(500).json({ error: 'Failed to fetch project' });
            return;
        }

        try {
            const projects = JSON.parse(data);
            const project = projects.find((project) => project.productId === productId);

            if (project) {
                res.json(project);
            } else {
                res.status(404).json({ error: 'project not found' });
            }
        } catch (parseError) {
            console.error('Error parsing data file:', parseError);
            res.status(500).json({ error: 'Failed to fetch project' });
        }
    });
});


app.post('/api/products', (req, res) => {
    const newProject = req.body;
    console.log(newProject);

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            res.status(500).json({ error: 'Failed to add project' });
            return;
        }

        try {
            const projects = JSON.parse(data);
            const addedProject = {
                productId: Date.now(),
                productName: req.body.productName,
                productOwnerName: req.body.productOwnerName,
                developers: req.body.developers,
                scrumMaster: req.body.scrumMaster,
                startDate: req.body.startDate,
                methodology: req.body.methodology,
                location: req.body.location,
            };
            projects.push(addedProject);

            fs.writeFile(dataFilePath, JSON.stringify(projects), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing data file:', writeErr);
                    res.status(500).json({ error: 'Failed to add project' });
                } else {
                    res.status(201).json(newProject);
                }
            });
        } catch (parseError) {
            console.error('Error parsing data file:', parseError);
            res.status(500).json({ error: 'Failed to add project' });
        }
    });
});

app.put('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            res.status(500).json({ error: 'Failed to update project' });
            return;
        }

        try {
            const projects = JSON.parse(data);

            const updatedProject = {
                productId: productId,
                productName: req.body.productName,
                productOwnerName: req.body.productOwnerName,
                developers: req.body.developers,
                scrumMaster: req.body.scrumMaster,
                startDate: req.body.startDate,
                methodology: req.body.methodology,
                location: req.body.location,
            }

            const updatedProjects = projects.map((project) =>
                project.productId === productId ? updatedProject : project
            );



            fs.writeFile(dataFilePath, JSON.stringify(updatedProjects), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing data file:', writeErr);
                    res.status(500).json({ error: 'Failed to update project' });
                } else {
                    res.status(200).json(updatedProject);
                }
            });

        } catch (parseError) {
            console.error('Error parsing data file:', parseError);
            res.status(500).json({ error: 'Failed to update project' });
        }
    });
});

app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            res.status(500).json({ error: 'Failed to delete project' });
            return;
        }

        try {
            let projects = JSON.parse(data);

            const deletedProject = projects.find((project) => project.productId === productId);
            console.log(deletedProject);
            const updatedProjects = projects.filter((project) => project.productId !== productId);

            fs.writeFile(dataFilePath, JSON.stringify(updatedProjects), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing data file:', writeErr);
                    res.status(500).json({ error: 'Failed to delete project' });
                } else {
                    res.status(200).json(deletedProject);
                }
            });
        } catch (parseError) {
            console.error('Error parsing data file:', parseError);
            res.status(500).json({ error: 'Failed to delete project' });
        }
    });
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

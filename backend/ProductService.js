const fs = require('fs');
const path = require('path');

const dataFilePath = path.resolve(__dirname, 'src', 'data.json');

const ProductService = {
  
  getAllProducts() {
    return new Promise((resolve, reject) => {
      fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading data file:', err);
          reject('Failed to fetch products');
          return;
        }

        try {
          const projects = JSON.parse(data);
          resolve(projects);
        } catch (parseError) {
          console.error('Error parsing data file:', parseError);
          reject('Failed to fetch products');
        }
      });
    });
  },

  getProductById(productId) {
    return new Promise((resolve, reject) => {
      fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading data file:', err);
          reject('Failed to fetch product');
          return;
        }

        try {
          const projects = JSON.parse(data);
          const project = projects.find(
            (project) => project.productId === productId
          );

          if (project) {
            resolve(project);
          } else {
            reject('product not found');
          }
        } catch (parseError) {
          console.error('Error parsing data file:', parseError);
          reject('Failed to fetch product');
        }
      });
    });
  },

  addProduct(newProject) {
    return new Promise((resolve, reject) => {
      fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading data file:', err);
          reject('Failed to add product');
          return;
        }

        try {
          const projects = JSON.parse(data);
          const addedProject = {
            productId: Date.now(),
            productName: newProject.productName,
            productOwnerName: newProject.productOwnerName,
            developers: newProject.developers,
            scrumMaster: newProject.scrumMaster,
            startDate: newProject.startDate,
            methodology: newProject.methodology,
            location: newProject.location,
          };
          projects.push(addedProject);

          fs.writeFile(dataFilePath, JSON.stringify(projects), (writeErr) => {
            if (writeErr) {
              console.error('Error writing data file:', writeErr);
              reject('Failed to add product');
            } else {
              resolve(addedProject);
            }
          });
        } catch (parseError) {
          console.error('Error parsing data file:', parseError);
          reject('Failed to add product');
        }
      });
    });
  },

  updateProduct(productId, updatedProject) {
    return new Promise((resolve, reject) => {
      fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading data file:', err);
          reject('Failed to update product');
          return;
        }

        try {
          const projects = JSON.parse(data);

          const updatedProjects = projects.map((project) =>
            project.productId === productId ? { ...updatedProject, productId } : project
          );

          fs.writeFile(dataFilePath, JSON.stringify(updatedProjects), (writeErr) => {
            if (writeErr) {
              console.error('Error writing data file:', writeErr);
              reject('Failed to update product');
            } else {
              resolve(updatedProject);
            }
          });
        } catch (parseError) {
          console.error('Error parsing data file:', parseError);
          reject('Failed to update product');
        }
      });
    });
  },

  deleteProduct(productId) {
    return new Promise((resolve, reject) => {
      fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading data file:', err);
          reject('Failed to delete product');
          return;
        }

        try {
          let projects = JSON.parse(data);

          const deletedProject = projects.find((project) => project.productId === productId);
          const updatedProjects = projects.filter((project) => project.productId !== productId);

          fs.writeFile(dataFilePath, JSON.stringify(updatedProjects), (writeErr) => {
            if (writeErr) {
              console.error('Error writing data file:', writeErr);
              reject('Failed to delete product');
            } else {
              resolve(deletedProject);
            }
          });
        } catch (parseError) {
          console.error('Error parsing data file:', parseError);
          reject('Failed to delete product');
        }
      });
    });
  },
};

module.exports = ProductService;

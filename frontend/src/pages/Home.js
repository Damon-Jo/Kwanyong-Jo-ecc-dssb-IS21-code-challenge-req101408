import React, { useState, useEffect } from 'react';
import { Button, Modal,Alert  } from 'react-bootstrap';
import ModalEdit from '../components/ModalEdit';
import ProductRepo from '../api/ProductRepo';

function Home() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await ProductRepo.getAllProducts();
      setProjects(response);
      setError(null);
    } catch (error) {
      // Handle the error when fetching projects fails
      console.error('Error fetching productss:', error);
      setError('An error occurred while fetching the data. Please try again or check the server');
    }
  }

  function handleEditClick(project) {
    setSelectedProject(project);
    setShowEditModal(true);
  }

  function handleUpdateProject(updatedProject) {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map(project => {
        if (project.productId === updatedProject.productId) {
          return updatedProject;
        }
        return project;
      });
      return updatedProjects;
    });
  }

  function handleCloseEditModal() {
    setShowEditModal(false);
  }

  function handleDeleteClick(project) {
    setSelectedProject(project);
    setShowDeleteModal(true);
  }


  // Handle the delete button click
  // Delete the project from projects array
  async function handleDeleteProject() {
    // axios
    //   .delete(`${API_BASE_URL}/products/${selectedProject.productId}`)
    await ProductRepo.deleteProduct(selectedProject.productId)
      .then(response => {
        // Remove the deleted project from the projects array
        setProjects(prevProjects =>
          prevProjects.filter(project => project.productId !== selectedProject.productId)
        );
        // Close the delete modal
        setShowDeleteModal(false);
        setDeleteError(null);
      })
      .catch(error => {
        // Handle the error as needed
        console.error('Error deleting product:', error);
        setDeleteError('An error occurred while deleting the product. Please try again or check the server.');
      });
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false);
    setDeleteError(null);
  }

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <h3 className="text-center text-2xl font-bold my-4">Product List</h3>
      <table className="mx-auto bg-white shadow-md rounded-lg">
        {/* Table head */}
        <thead>
          <tr>
            <th className="py-2 px-4">No.</th>
            <th className="py-2 px-4">Product Name</th>
            <th className="py-2 px-4">Scrum Master</th>
            <th className="py-2 px-4">Product Owner</th>
            <th className="py-2 px-4">Developer Names</th>
            <th className="py-2 px-4">Start Date</th>
            <th className="py-2 px-4">Methodology</th>
            <th className="py-2 px-4">Location</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {projects.map((project, index) => (
            <tr key={project.productId}>
              {/* Table cells */}
              <td className="py-2 px-4">{index + 1}</td>
              <td id="product-name-cell" className="py-2 px-4">{project.productName}</td>
              <td className="py-2 px-4">{project.scrumMaster}</td>
              <td className="py-2 px-4">{project.productOwnerName}</td>
              <td id="developer-cell" className="py-2 px-4">
                {project.developers.length > 1
                  ? project.developers.join(', ')
                  : project.developers[0]}
              </td>
              <td className="py-2 px-4">{project.startDate}</td>
              <td className="py-2 px-4">{project.methodology}</td>
              <td className="py-2 px-4">{project.location}</td>
              <td>
                {/* Edit button */}
                <Button
                  variant="success"
                  onClick={() => handleEditClick(project)}
                >
                  Edit
                </Button>
                {/* Delete button */}
                <Button variant="danger" onClick={() => handleDeleteClick(project)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        {/* Table footer */}
        <tfoot>
          <tr>
            <td colSpan="8"></td>
            <td className="text-right">Total Products: {projects.length}</td>
          </tr>
        </tfoot>
      </table>

      {/* Edit modal */}
      {showEditModal && (
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalEdit
              project={selectedProject}
              closeModal={handleCloseEditModal}
              updateProject={handleUpdateProject}
            />
          </Modal.Body>
        </Modal>
      )}

      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {deleteError && <Alert variant="danger">{deleteError}</Alert>}
          <p>Are you sure you want to delete this product?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProject}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;

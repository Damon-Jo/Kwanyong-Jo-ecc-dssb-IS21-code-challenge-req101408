import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductRepo from '../api/ProductRepo';

function ModalEdit({ project, closeModal, updateProject }) {
    const [editData, setEditData] = useState(project);
    const [developerCells, setDeveloperCells] = useState(['', '', '', '', '']);
    const [error, setError] = useState('');

    useState(() => {
        setDeveloperCells([...editData.developers]);
    }, [editData.developers]);

    function handleChange(event) {
        const { name, value } = event.target;
        setEditData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleDeveloperChange(event, index) {
        const value = event.target.value;
        setDeveloperCells((prevState) => {
            const updatedDeveloperCells = [...prevState];
            updatedDeveloperCells[index] = value;
            return updatedDeveloperCells;
        });
    }

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();

        // Create an updated project object with the modified data
        const updatedProject = {
            ...editData,
            developers: developerCells,
        };

        // Send a PUT request to the server to update the project
        ProductRepo.updateProduct(project.productId, updatedProject)
            .then(response => {
                console.log('Project updated successfully:', response);
                // Invoke the updateProject callback to update the projects state in the Home component
                updateProject(response);
                // Close the modal
                closeModal();
            })
            .catch(error => {
                // Handle the error when updating project fails
                console.error('Error updating project:', error);
                setError('An error occurred while updating the project. Please try again or check the server');
            });
    }

    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="productName">Product Name</label><br />
                        <input type="text" name="productName" onChange={handleChange} id="productName" className="form-control" value={editData.productName} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="scrumMaster">Scrum Master</label><br />
                        <input type="text" name="scrumMaster" onChange={handleChange} id="scrumMaster" className="form-control" value={editData.scrumMaster} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productOwner">Product Owner</label><br />
                        <input type="text" name="productOwnerName" onChange={handleChange} id="productOwner" className="form-control" value={editData.productOwnerName} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="developers">Developers</label>
                        {[...Array(5)].map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                className="form-control"
                                id={`developer${index}`}
                                value={developerCells[index]}
                                onChange={(event) => handleDeveloperChange(event, index)}
                                required={index === 0}
                            />
                        ))}
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label><br />
                        <input name="startDate" type="date" onChange={handleChange} className="form-control" id="startDate" value={editData.startDate} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="methodology">Methodology</label>
                        <select
                            className="form-control"
                            name="methodology"
                            id="methodology"
                            value={editData.methodology}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Methodology</option>
                            <option value="Agile">Agile</option>
                            <option value="Waterfall">Waterfall</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label><br />
                        <input type="text" name="location" id="location" onChange={handleChange} className="form-control" value={editData.location} required />
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                        <div className="mx-4"></div>
                        <Link to="/">
                            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                        </Link>

                    </div>

                </form>
            </div>



        </>
    );
}

export default ModalEdit;

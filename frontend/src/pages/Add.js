import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ProductRepo from '../api/ProductRepo';


function Add() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [scrumMaster, setScrumMaster] = useState('');
  const [productOwnerName, setProductOwnerName] = useState('');
  const [developers, setDevelopers] = useState(['', '', '', '', '']);
  const [startDate, setStartDate] = useState('');
  const [methodology, setMethodology] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);

  function handleProductNameChange(e) {
    setProductName(e.target.value);
  }

  function handleScrumMasterChange(e) {
    setScrumMaster(e.target.value);
  }

  function handleProductOwnerChange(e) {
    setProductOwnerName(e.target.value);
  }

  function handleDeveloperChange(index, event) {
    const value = event.target.value;
    const updatedDevelopers = [...developers];
    updatedDevelopers[index] = value;
    setDevelopers(updatedDevelopers);
  }

  function handleStartDateChange(e) {
    setStartDate(e.target.value);
  }

  function handleMethodologyChange(e) {
    setMethodology(e.target.value);
  }

  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // chcek if all the required fields are filled
    if (
      productName.trim() === '' ||
      scrumMaster.trim() === '' ||
      productOwnerName.trim() === '' ||
      startDate.trim() === '' ||
      methodology.trim() === '' ||
      location.trim() === ''
    ) {
      alert('Please fill in all the required fields');
      return;
    }

    // check if at least one developer is provided
    const atLeastOneDeveloper = developers.some((developer) => developer.trim() !== '');

    if (!atLeastOneDeveloper) {
      alert('Please provide at least one developer');
      return;
    }

    const filteredDevelopers = developers.filter((developer) => developer.trim() !== '');

    const data = {
      productName,
      scrumMaster,
      productOwnerName,
      developers: filteredDevelopers,
      startDate,
      methodology,
      location
    };

    // Send a POST request to the server to add a new product

    ProductRepo.addProduct(data)
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        // Handle the error when adding project fails
        console.error(error);
        setError('An error occurred while adding the data. Please try again or check the server');
      });
  }

  return (
    <div className="container">
      {error && <Alert variant="danger">{error}</Alert>}
      <h3 className="text-center text-2xl font-bold my-4">Add new Product</h3>
      <div className="form-container">
        <form className="w-50" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input onChange={handleProductNameChange} type="text" className="form-control" id="productName" placeholder="Enter Product Name" value={productName} required />
          </div>
          <div className="form-group">
            <label htmlFor="scrumMaster">Scrum Master</label>
            <input onChange={handleScrumMasterChange} type="text" className="form-control" id="scrumMaster" placeholder="Enter Scrum Master" value={scrumMaster} required />
          </div>
          <div className="form-group">
            <label htmlFor="productOwner">Product Owner</label>
            <input onChange={(e) => handleProductOwnerChange(e)} type="text" className="form-control" id="productOwner" placeholder="Enter Product Owner" value={productOwnerName} required />
          </div>
          <div className="form-group">
            <label htmlFor="developers">Developers</label>
            {developers.map((developer, index) => (
              <input
                key={index}
                type="text"
                className="form-control"
                id={`developer${index}`}
                placeholder={`Enter Developer ${index + 1}`}
                value={developer}
                onChange={(e) => handleDeveloperChange(index, e)}
                required={index === 0}
              />

            ))}
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input onChange={handleStartDateChange} type="date" className="form-control" id="startDate" value={startDate} required />
          </div>
          <div className="form-group">
            <label htmlFor="methodology">Methodology</label>
            <select
              className="form-control"
              id="methodology"
              value={methodology}
              onChange={handleMethodologyChange}
              required
            >
              <option value="">Select Methodology</option>
              <option value="Agile">Agile</option>
              <option value="Waterfall">Waterfall</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input onChange={handleLocationChange} type="text" className="form-control" id="location" placeholder="Enter Location" value={location} required />
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            <div className="mx-4"></div>
            <Link to="/">
              <Button variant="secondary">Cancel</Button>
            </Link>

          </div>

        </form>
      </div>
    </div>
  );
}

export default Add;

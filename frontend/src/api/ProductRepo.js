import axios from 'axios';
import { API_BASE_URL } from '../constants';

class ProductRepo {
  static async getAllProducts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  }

  static async getProductById(productId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch product');
    }
  }

  static async addProduct(productData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/products`, productData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add product');
    }
  }

  static async updateProduct(productId, productData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update product');
    }
  }

  static async deleteProduct(productId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/products/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  }
}

export default ProductRepo;

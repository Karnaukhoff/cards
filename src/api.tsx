import axios from 'axios';

export async function getInfo() {
    
    try {
        const response = await axios.get(`https://dummyjson.com/products`);
        return response.data.products;
    } catch (error) {
        console.error(error);
        return null;
    }
  }
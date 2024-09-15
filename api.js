import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.API_BASE_URL;

const createCard = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/cards`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating card: ", error);
    throw error;
  }
};

const getAllCards = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cards`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cards: ", error);
    throw error;
  }
};

const getCardById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/cards/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching card with ID ${id}: `, error);
    throw error;
  }
};

const updateCard = async (id, updateData) => {
  try {
    const response = await axios.put(`${BASE_URL}/cards/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating card with ID ${id}: `, error);
    throw error;
  }
};

const deleteCard = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/cards/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting card with ID ${id}: `, error);
    throw error;
  }
};

export {
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
};
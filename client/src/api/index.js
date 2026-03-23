import axios from 'axios';

const API_BASE = '/api';

const api = {
    // Get portfolio data
    getPortfolio: () => axios.get(`${API_BASE}/portfolio-data`).then(r => r.data),

    // Update portfolio data
    updatePortfolio: (data) => axios.put(`${API_BASE}/portfolio-data`, data).then(r => r.data),

    // Upload CV
    uploadCV: (file) => {
        const formData = new FormData();
        formData.append('cv', file);
        return axios.post(`${API_BASE}/upload-cv`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(r => r.data);
    },

    // Upload image
    uploadImage: (file, type, extra = {}) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('type', type);
        Object.entries(extra).forEach(([key, val]) => formData.append(key, val));
        return axios.post(`${API_BASE}/upload-image`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(r => r.data);
    },

    // Send contact message
    sendContact: (data) => axios.post(`${API_BASE}/contact`, data).then(r => r.data),

    // Get contacts (admin)
    getContacts: () => axios.get(`${API_BASE}/contacts`).then(r => r.data),
};

export default api;

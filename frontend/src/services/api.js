import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const fetchSessions = () => axios.get(`${BASE_URL}/sessions`);
export const fetchBookings = () => axios.get(`${BASE_URL}/bookings`);
export const bookSession = (id) => axios.post(`${BASE_URL}/bookings`, { session_id: id });
export const cancelBooking = (id) => axios.delete(`${BASE_URL}/bookings/${id}`);

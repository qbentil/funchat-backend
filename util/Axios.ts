import axios from "axios";

export default axios.create({
    baseURL: process.env.MAIL_API_URL,
    withCredentials: true
})
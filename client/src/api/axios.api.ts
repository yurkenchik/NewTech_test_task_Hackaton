import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

export const instance = axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        Authorization: `Bearer` + getTokenFromLocalStorage() || ''
    }
})
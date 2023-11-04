import {RestApplicationClient} from "./rest-client";
import axios from "axios";

const httpClient = axios
httpClient.defaults.baseURL = "http://localhost:3000"

export const restClient = new RestApplicationClient(httpClient)

httpClient.interceptors.response.use(
    response => response.data
)
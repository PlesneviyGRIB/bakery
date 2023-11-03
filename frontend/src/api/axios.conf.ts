import {RestApplicationClient} from "./rest-client";
import axios from "axios";

const httpClient = axios

export const restClient = new RestApplicationClient(httpClient)

httpClient.interceptors.response.use(
    response => response.data
)
import {ExceptionResultDto, RestApplicationClient} from "./rest-client";
import axios from "axios";
import {APP_EVENT} from "../types";

const httpClient = axios
httpClient.defaults.baseURL = "http://localhost:3000"

export const restClient = new RestApplicationClient(httpClient)

httpClient.interceptors.request.use(
    request => {
        document.dispatchEvent(new CustomEvent<boolean>(APP_EVENT.INTERCEPTOR_PENDING_STATUS, {detail: true}))
        return request
    }
)

httpClient.interceptors.response.use(
    response => {
        document.dispatchEvent(new CustomEvent<boolean>(APP_EVENT.INTERCEPTOR_PENDING_STATUS, {detail: false}))
        return response.data
    },
    error => {
        document.dispatchEvent(new CustomEvent<boolean>(APP_EVENT.INTERCEPTOR_PENDING_STATUS, {detail: false}))
        const data = error.response.data

        if(error.code === "ERR_BAD_REQUEST") {
            document.dispatchEvent(new CustomEvent<ExceptionResultDto>(APP_EVENT.INTERCEPTOR_ERROR, {detail: data}))
        }

        return error
    }
)
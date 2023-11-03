import {RestApplicationClient} from "./rest-client";
import axios from "axios";

export const restClient = new RestApplicationClient(axios)
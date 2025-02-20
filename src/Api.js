import React from "react";
import axios from "axios";
import { getApiUrl } from "./utils/Utils";


export const fetchMovies = async () => {

    try {
        const response = await axios.get(getApiUrl());
        console.log(response);
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
}

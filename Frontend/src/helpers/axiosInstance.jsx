import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3030",
    headers:{
        "Content-Type": "application/json",
    },
})

export default axiosInstance
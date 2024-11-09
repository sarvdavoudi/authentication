import axios from "axios";

export const customizedAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle successful responses
customizedAxios.interceptors.response.use(
  (response) => {
    switch (response.status) {
      case 200:
        console.log("this is 200 respose");
        break;
      case 201:
        console.log("this is 201 respose");
        break;
        console.log("this is successful respose");
      default:
        break;
    }
    return response;
  },
  (error) => {
    // Handle error responses
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 400:
          console.error("Bad request:", response.data);
          break;
        case 401:
          console.error("Unauthorized:", response.data);
          break;
        case 403:
          console.error("Forbidden:", response.data);
          break;
        case 404:
          console.error("Not found:", response.data);
          break;
        case 500:
          console.error("Internal server error:", response.data);
          break;
          console.error("other error", response.data);
        default:
          break;
      }
    } else {
      console.error("Network error or server is unreachable");
    }
    return Promise.reject(error);
  }
);

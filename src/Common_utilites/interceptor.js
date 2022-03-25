import React from "react";
import axios from "axios";
import { UatBaseUrl, DevelopmentBaseUrl, ProductionBaseUrl } from "./URL";
import store from "../Redux/store";
import { Alert } from "react-native";
import LoaderAction from '../../src/Redux/loader/LoaderAction'

axios.interceptors.request.use(
   (request) => {
     if(request.url.split("?")[0] == "getpincodes" || request.url.split("?")[0] == "getarea" || request.url.split("?")[0] == "getareacustomer"){
      store.dispatch(LoaderAction(false));
     }else{
      store.dispatch(LoaderAction(true));
     }
    request.url =request.url.includes("test.sequel247.com") ? request.url :`${DevelopmentBaseUrl}${request.url}`;
    console.log("request hello", request);
    return request;
  },
  function (error) {
    store.dispatch(LoaderAction(false));
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    store.dispatch(LoaderAction(false));
    console.log("response", response);
    return response;
  },
  (error) => {
    store.dispatch(LoaderAction(false));
    if (error.response.status === 401) {
      Alert.alert("FAILED", "Unauthorized", [{ text: "OK" }]);
    } else if (error.response.status === 500) {
      Alert.alert("FAILED", "Internal Server Error", [{ text: "OK" }]);
    } else if (error.response.status === 404) {
      Alert.alert("FAILED", "Page Not Found", [{ text: "OK" }]);
    } else if (error.response.status === 403) {
      Alert.alert("FAILED", "Access Forbidden", [{ text: "OK" }]);
    } else if (error.response.status === 503) {
      Alert.alert("FAILED", "Service Unavailable", [{ text: "OK" }]);
    }
    // return error;
    return Promise.reject(error);
  }
);

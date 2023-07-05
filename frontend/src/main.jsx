import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
//import redux
import { Provider } from "react-redux";
import store from "./store.js";
//importing routes
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
} from "./screens";
//private route
import { PrivateRoute } from "./components";

//creating router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      {/*Private routes*/}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </Provider>
);

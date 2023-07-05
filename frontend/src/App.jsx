import { Header } from "./components";
import { Outlet } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
function App() {
  return (
    <>
      <Header />
      <VStack pt="7vh" align="center" justify="center">
        <Outlet />
      </VStack>
    </>
  );
}

export default App;

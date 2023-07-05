import React from "react";
import { Text } from "@chakra-ui/react";

import { FormContainer } from "../components";

export default function HomeScreen() {
  return (
    <main>
      <FormContainer>
        <Text fontSize="xl">Home page</Text>
      </FormContainer>
    </main>
  );
}

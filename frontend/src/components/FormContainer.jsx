import { Box, VStack } from "@chakra-ui/react";

const FormContainer = ({ children }) => {
  return (
    <Box
      boxShadow="md"
      paddingBlock={5}
      paddingInline={10}
      borderRadius={10}
      textAlign="center"
      w="md"
      bgColor="gray.50"
    >
      <VStack align="start">{children}</VStack>
    </Box>
  );
};

export default FormContainer;

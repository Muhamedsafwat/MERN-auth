import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Heading,
  Button,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import { FormContainer } from "../components";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const toast = useToast();

  //redirect to home screen if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  //login functionality
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (error) {
      toast({
        title: error?.data?.message || error,
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    }
  };

  return (
    <FormContainer>
      <Heading mb={3} size="md">
        Login
      </Heading>
      <form style={{ width: "100%" }} onSubmit={submitHandler}>
        <VStack spacing={5}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="please enter a valid email"
              type="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="must be at least 8 characters"
              type="password"
            />
          </FormControl>
        </VStack>
        <Button
          isLoading={isLoading}
          loadingText="Submitting"
          type="submit"
          w="100%"
          mt={6}
          variant="solid"
          colorScheme="teal"
        >
          Login
        </Button>
        <Text>
          Don't have an account?{" "}
          <Button variant="link">
            <Link to="/register">Signup</Link>
          </Button>
        </Text>
      </form>
    </FormContainer>
  );
};

export default LoginScreen;

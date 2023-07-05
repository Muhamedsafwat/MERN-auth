import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  Input,
  FormLabel,
  Heading,
  Button,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

import { FormContainer } from "../components";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const toast = useToast();

  //redirect to home screen if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (error) {
        toast({
          title: error?.data?.message || erro,
          status: "error",
          isClosable: true,
          duration: 5000,
        });
      }
    }
  };

  return (
    <FormContainer>
      <Heading mb={3} size="md">
        Signup
      </Heading>
      <form style={{ width: "100%" }} onSubmit={submitHandler}>
        <VStack spacing={5}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="your full name"
              type="text"
            />
          </FormControl>
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
          <FormControl>
            <FormLabel>Confirm password</FormLabel>
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="passwords must match"
              type="password"
            />
          </FormControl>
        </VStack>
        <Button
          isLoading={isLoading}
          loadingText="Submitting"
          type="Register"
          w="100%"
          mt={6}
          variant="solid"
          colorScheme="teal"
        >
          Login
        </Button>
        <Text>
          Already have an account? {""}
          <Button variant="link">
            <Link to="/login">Login</Link>
          </Button>
        </Text>
      </form>
    </FormContainer>
  );
};

export default RegisterScreen;

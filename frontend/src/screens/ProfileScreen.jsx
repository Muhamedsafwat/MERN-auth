import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  Input,
  FormLabel,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";

import { FormContainer } from "../components";

const ProfileScreen = () => {
  //declare variables & states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toast = useToast();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  //fill the form with current data
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.setName, userInfo.setEmail]);

  //define submit handler
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
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast({
          title: "Profile updated successfully!",
          status: "success",
          isClosable: true,
          duration: 5000,
        });
      } catch (error) {
        toast({
          title: error.message,
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
        Profile
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
          Update
        </Button>
      </form>
    </FormContainer>
  );
};

export default ProfileScreen;

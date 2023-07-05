import React from "react";
import {
  HStack,
  Box,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";

export default function Header() {
  const { userInfo } = useSelector((state) => state.auth);

  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <HStack
        justify="space-between"
        bgColor="gray.100"
        boxShadow="md"
        paddingInline={[5, 10, 12]}
        paddingBlock={4}
      >
        <Box>
          <Link to="/">
            <Heading size="lg">React-Auth</Heading>
          </Link>
        </Box>
        {userInfo ? (
          <Menu>
            <MenuButton cursor="pointer" as={Box}>
              <Avatar bgColor="teal" color="white" name={userInfo.name} />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link to="/profile">Profile</Link>
              </MenuItem>
              <MenuItem onClick={logoutHandler} color="red">
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <HStack spacing={[2, 5]}>
            <Button size={["sm", "md"]} colorScheme="teal" variant="link">
              <Link to="/register">Signup</Link>
            </Button>
            <Button size={["sm", "md"]} colorScheme="teal" variant="solid">
              <Link to="/login">Login</Link>
            </Button>
          </HStack>
        )}
      </HStack>
    </header>
  );
}

import {
    Box,
    Button,
    Flex,
    Stack,
    Text,
    //useColorModeValue,
    Image
  } from "@chakra-ui/react";
  import { Outlet } from "react-router-dom";
  import { useAuth } from "../../hooks/useAuth";
  //import { ThemeToggler } from "../Theme/ThemeToggler";
  import escudo from "../../assets/escudo-udea.jpeg"

  export const NavBar = () => {
    const { logout } = useAuth();
    return (
      <Box minHeight="100vh">
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1rem"
          //bg={useColorModeValue("green.300", "green.700")}}
          bg = "white"
          color="green"
        >
          <Image src={escudo} alt="Escudo de la universidad" boxSize={12} mr={2} />  
          <Text as="h2" fontSize={24} fontWeight="bold">SignAI</Text>
          <Stack direction="row" align="center" spacing={4}>
            {/*<ThemeToggler size="lg" />*/}
            <Button onClick={logout} colorScheme="green">Logout</Button>
          </Stack>
        </Flex>
        <Outlet />
      </Box>
    );
  };
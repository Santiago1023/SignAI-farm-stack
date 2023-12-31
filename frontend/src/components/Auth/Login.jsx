import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    //useColorModeValue,
    useToast,
  } from "@chakra-ui/react";
  import { useForm } from "react-hook-form";
  import { useNavigate } from "react-router-dom";
  import { useAuth } from "../../hooks/useAuth";
  //import { ThemeToggler } from "../Theme/ThemeToggler";
  
  export const Login = () => {
    const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
    } = useForm();
    const navigate = useNavigate();
    const { login } = useAuth();
    const toast = useToast();

    const onSubmit = async (values) => {
      try {
        await login(values.email, values.password);
      } catch (error) {
        toast({
          title: "Invalid email or password",
          status: "error",
          isClosable: true,
          duration: 1500,
        });
      }
    };
    
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center" background="green.900">
        <Flex
          direction="column"
          alignItems="center"
          //background={useColorModeValue("gray.100", "gray.700")}
          background="white"
          p={12}
          rounded={6}
        >
          <Heading mb={6} color="green.900">Login</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.email}>
              <Input
                placeholder="Email"
                _placeholder={{color: "gray.400"}}
                background="gray.300"
                color="black"
                //background={useColorModeValue("gray.300", "gray.600")}
                type="email"
                size="lg"
                mt={6}
                {...register("email", {
                  required: "This is required field",
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <Input
                placeholder="Password"
                _placeholder={{color: "gray.400"}}
                //background={useColorModeValue("gray.300", "gray.600")}
                background="gray.300"
                color="black"
                type="password"
                size="lg"
                mt={6}
                {...register("password", {
                  required: "This is required field",
                })}
              />
              
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              isLoading={isSubmitting}
              loadingText="Logging in..."
              width="100%"
              colorScheme="green"
              variant="solid"
              mt={6}
              mb={6}
              type="submit"
            >
              Sign in
            </Button>
          </form>
          <Button
            onClick={() => navigate("/register", { replace: true })}
            width="100%"
            colorScheme="black"
            //variant="solid"
            _hover={{ textDecoration: "underline" }}
          >
            Sign up
          </Button>
        </Flex>
      </Flex>
    );
  };

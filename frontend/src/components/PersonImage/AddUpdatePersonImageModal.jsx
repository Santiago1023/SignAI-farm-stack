import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Switch,
    Textarea,
    useColorModeValue,
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";
  import { Controller, useForm } from "react-hook-form";
  import { useParams } from "react-router-dom";
  import axiosInstance from "../../services/axios";
  
  export const AddUpdatePersonImageModal = ({
    editable = false,
    defaultValues = {},
    onSuccess = () => {},
    ...rest
  }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { personImageId } = useParams();
    const {
      handleSubmit,
      register,
      control,
      formState: { errors, isSubmitting },
    } = useForm({
      defaultValues: { ...defaultValues },
    });
  
    const onSubmit = async (values) => {
      try {
        if (editable) {
          await axiosInstance.put(`/personImages/${personImageId}`, values);
        } else {
          await axiosInstance.post(`/personImages/create/`, values);
        }
        toast({
          title: editable ? "PersonImage Updated" : "PersonImage Added",
          status: "success",
          isClosable: true,
          diration: 1500,
        });
        onSuccess();
        onClose();
      } catch (err) {
        console.error(err);
        toast({
          title: "Something went wrong. Please try again.",
          status: "error",
          isClosable: true,
          diration: 1500,
        });
      }
    };
  
    return (
      <Box {...rest}>
        <Button w="100%" colorScheme="green" onClick={onOpen}>
          {editable ? "UPDATE PERSONIMAGE" : "ADD PERSONIMAGE"}
        </Button>
        <Modal closeOnOverlayClick={false} size="xl" onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalContent background="white" >
              <ModalHeader color="black">{editable ? "Update PersonImage" : "ADD PersonImage"}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>

                <FormControl isInvalid={errors.image_url}>
                  <Input
                    placeholder="Person Image url: http://example.com/image1"
                    _placeholder={{color:"gray.500"}}
                    background="gray.300"
                    color="black"
                    //background={useColorModeValue("gray.300", "gray.600")}
                    type="text"
                    //variant="filled"
                    size="lg"
                    mt={6}
                    {...register("image_url", {
                      required: "This is required field",
                      minLength: {
                        value: 5,
                        message: "Url must be at least 5 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.image_url && errors.image_url.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.genre}>
                  <Input
                    placeholder="Genre: Man | Woman"
                    _placeholder={{color:"gray.500"}}
                    background="gray.300"
                    color="black"
                    //background={useColorModeValue("gray.300", "gray.600")}
                    //background="green.900"
                    type="text"
                    //variant="filled"
                    size="lg"
                    mt={6}
                    {...register("genre", {
                      required: "This is required field",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.genre && errors.genre.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.age}>
                  <Input
                    placeholder="Age: Number > 0"
                    _placeholder={{color:"gray.500"}}
                    background="gray.300"
                    color="black"
                    //background={useColorModeValue("gray.300", "gray.600")}
                    //background="green.900"
                    type="text"
                    //variant="filled"
                    size="lg"
                    mt={6}
                    {...register("age", {
                      required: "This is required field",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.age && errors.age.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.sick}>
                  <Input
                    placeholder="Sick: true | false"
                    _placeholder={{color:"gray.500"}}
                    background="gray.300"
                    color="black"
                    //background={useColorModeValue("gray.300", "gray.600")}
                    //background="green.900"
                    type="text"
                    //variant="filled"
                    size="lg"
                    mt={6}
                    {...register("sick", {
                      required: "This is required field",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.sick && errors.sick.message}
                  </FormErrorMessage>
                </FormControl>
                
              </ModalBody>
              <ModalFooter>
                <Stack direction="row" spacing={4}>
                  <Button 
                  onClick={onClose}
                  disabled={isSubmitting}
                  colorScheme="green"
                  >Close</Button>
                  <Button
                    colorScheme="green"
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText={editable ? "Updating" : "Creating"}
                  >{editable ? "Update" : "Create"}</Button>
                </Stack>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </Box>
    );
  };
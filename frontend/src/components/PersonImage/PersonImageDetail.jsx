import {
    Button,
    Center,
    Container,
    Spinner,
    Text,
    useColorModeValue,
    useToast,
    Image
  } from "@chakra-ui/react";
  import { useEffect, useRef, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import axiosInstance from "../../services/axios";
  import { AddUpdatePersonImageModal } from "./AddUpdatePersonImageModal";
  
  export const PersonImageDetail = () => {
    const [personImage, setPersonImage] = useState({});
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(false);
    const { personImageId } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const background = useColorModeValue("gray.300", "gray.600");
  
    useEffect(() => {
      if (isMounted.current) return;
      fetchPersonImage();
      isMounted.current = true;
    }, [personImageId]);
  
    const fetchPersonImage = () => {
      setLoading(true);
      axiosInstance
        .get(`/personImages/${personImageId}`)
        .then((res) => {
          setPersonImage(res.data);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
        });
    };
  
    const delatePersonImage = () => {
      setLoading(true);
      axiosInstance
        .delete(`/personImages/${personImageId}`)
        .then(() => {
          toast({
            title: "PersonImage deleted successfully",
            status: "success",
            isClosable: true,
            diration: 1500,
          });
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
          toast({
            title: "Could'nt delete personImage",
            status: "error",
            isClosable: true,
            diration: 2000,
          });
        })
        .finally(() => setLoading(false));
    };
  
    if (loading) {
      return (
        <Container mt={6}>
          <Center mt={6}>
            <Spinner thickness="4px" speed="0.65s" emptyColor="green.200" color="green.500" size="xl"/>
          </Center>
        </Container>
      );
    }
  
    return (
      <>
        <Container mt={6}>
          <Button colorScheme="gray" onClick={() => navigate("/", { replace: true })}>Back</Button>
        </Container>
        <Container bg="white" minHeight="7rem" my={3} p={3} rounded="lg" alignItems="center" justifyContent="space-between">
          <Text fontSize={22} color="black">image_url: {personImage.image_url}</Text>
          <Image src={personImage.image_url} alt="Person Image" boxSize="200px" objectFit="cover" borderRadius="md" />
          <Text fontSize={22} color="black">genre: {personImage.genre}</Text>
          <Text fontSize={22} color="black">age: {personImage.age}</Text>
          <Text fontSize={22} color="black">Sick: {personImage.sick ? "Yes" : "No"}</Text>
          
          <AddUpdatePersonImageModal
            my={3}
            editable={true}
            defaultValues={{
              title: personImage.title,
              description: personImage.description,
              status: personImage.status,
            }}
            onSuccess={fetchPersonImage}
          />
          <Button isLoading={loading} colorScheme="red" width="100%" onClick={delatePersonImage}>Delete</Button>
        </Container>
      </>
    );
  };
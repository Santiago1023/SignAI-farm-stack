import { Box, Center, Container, Spinner } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../services/axios";
import { AddUpdatePersonImageModal } from "./AddUpdatePersonImageModal";
import { PersonImageCard } from "./PersonImageCard";

export const PersonImageList = () => {
  const [personImages, setPersonImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    fetchPersonImages();
    isMounted.current = true;
  }, []);

  const fetchPersonImages = () => {
    setLoading(true);
    axiosInstance.get("/personImages/").then((res) => {
        setPersonImages(res.data);
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container mt={9}>
      <AddUpdatePersonImageModal onSuccess={fetchPersonImages} />
      {loading ? (
        <Center mt={6}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="green.200" color="green.500"size="xl" />
        </Center>
      ) : (
        <Box mt={6}>
          {personImages?.map((personImage) => (
            <PersonImageCard personImage={personImage} key={personImage.id} />
          ))}
        </Box>
      )}
    </Container>
  );
};
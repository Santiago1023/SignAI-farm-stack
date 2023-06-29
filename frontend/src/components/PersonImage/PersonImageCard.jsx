import { Badge, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const PersonImageCard = ({ personImage }) => {
  const navigate = useNavigate();
  return (
    <Flex
      //bg={useColorModeValue("gray.300", "gray.600")}
      background="white"
      minHeight="3rem"
      my={3}
      p={3}
      rounded="lg"
      alignItems="center"
      justifyContent="space-between"
      _hover={{
        opacity: 0.9,
        cursor: "pointer",
        transform: "translateY(-3px)",
      }}
      onClick={() => navigate(`/${personImage.personImage_id}`, { replace: true })}
    >
      <Text color="black">{personImage.image_url}</Text>
      <Badge colorScheme={personImage.sick ? "red" : "green"}>
        {personImage.sick ? "Sick" : "No sick"}
      </Badge>
    </Flex>
  );
};
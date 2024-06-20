import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Container, Title, Text, SimpleGrid } from "@mantine/core";
import image from "../assets/image.11cd6c19.svg";

const PageNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to the home page after 3 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer); // cleanup function for the timer
  }, [navigate]);

  return (
    <Container className="min-h-screen w-screen bg-white">
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }} className="mt-24">
        <div>
          <Title className="mt-14">Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL.
            <Text c="dimmed" size="lg">
              Redirecting to homepage ...
            </Text>
          </Text>
        </div>
        <Image src={image} />
      </SimpleGrid>
    </Container>
  );
};

export default PageNotFound;

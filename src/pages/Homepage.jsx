import { Link } from "react-router-dom";
import Header from "../components/Layouts/Header";
import Poster from "../components/Layouts/Poster";
import Button from "../components/Button";
import { Box, Flex, Group } from "@mantine/core";

const Homepage = () => {
  return (
    <>
      <Header />
      <Flex className="min-h-full w-full bg-white md:mt-10 xs:-mt-28 gap-5 md:flex-row xs:flex-col">
        <Box className="sm:w-1/2 xs:w-[80%]">
          <h1 className="text-3xl md:text-5xl lg:text-7xl mt-36 text-black">
            Learn more about your favourite movies
          </h1>
          {/**/}

          <Flex className="mt-10 flex sm:gap-8 xs:gap-3">
            <Link to={"/movies"}>
              <Button variant="primary">Get started</Button>
            </Link>

            <Link to={"/movies"}>
              <Button variant="outline">I am feeling lucky</Button>
            </Link>
          </Flex>
        </Box>

        <Box className="sm:w-1/2 mt-5 xs:w-full bg-white pr-5">
          <Group className="grid grid-cols-6 gap-1">
            <Box className="col-start-1 col-span-3">
              <Poster movieId={183} />
            </Box>
            <Box className="col-start-1 col-end-3"> </Box>
            <Box className="col-end-7 col-span-3 xs:col-end-7 xs:pb-10">
              <Poster movieId={20} />
            </Box>
          </Group>
        </Box>
      </Flex>
    </>
  );
};

export default Homepage;

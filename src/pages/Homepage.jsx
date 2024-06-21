import { Link } from "react-router-dom";
import Header from "../components/Layouts/Header";
import Poster from "../components/Layouts/Poster";
import Button from "../components/Button";
import { Box, Flex, Group, Grid, RemoveScroll, Title } from "@mantine/core";
import { useMediaQuery } from "@react-hook/media-query";
import { persist } from 'zustand/middleware';

const Homepage = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const Content = (
    <Group gap="xl">
      <Box className="sm:w-1/2">
        <Title order={1} fw={600} className="text-2xl lg:text-7xl md:text-4xl">Learn more about your favourite movies</Title>

        <Flex gap="xl" mt={40}>
          <Link to={"/movies"}>
            <Button variant="primary">Get started</Button>
          </Link>

          <Link to={"/movies"}>
            <Button variant="outline">
              I am feeling lucky
            </Button>
          </Link>
        </Flex>
      </Box>
 
      
      <Grid>
        <Grid.Col span={6}>
          <Grid gutter="5">
        <Grid.Col span={9}>
          <Poster movieId={183} />
        </Grid.Col>
        <Grid.Col span={9} offset={{base: 12, sm: 9}}>
          <Poster movieId={20} />
        </Grid.Col>
        </Grid>
        </Grid.Col>
      </Grid>
    
    </Group>
  );

  return (
    <>
      <Header />
      {isDesktop ? <RemoveScroll>{Content}</RemoveScroll> : Content}
    </>
  );
};

export default Homepage;

import { Link } from "react-router-dom";
import Header from "../components/Layouts/Header";
import Poster from "../components/Layouts/Poster";
import Button from "../components/Button";
import { Box, Flex, Group, Grid, RemoveScroll, Title } from "@mantine/core";
import { useMediaQuery } from "@react-hook/media-query";

const Homepage = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const Content = (
    <Group gap="xl">
      <Box className="sm:w-1/2">
        <Title order={1} fw={600} className="xs:text-4xl lg:text-7xl">
          Learn more about your favourite movies
        </Title>

        <Flex gap="xl" mt={40}>
          <Link to={"/movies"}>
            <Button variant="primary">Get started</Button>
          </Link>

          <Link to={"/movies"}>
            <Button variant="outline">I am feeling lucky</Button>
          </Link>
        </Flex>
      </Box>

      <Grid pb={20}>
        <Grid.Col span={7}>
          <Grid gutter="5">
            <Grid.Col span={9} offset={{ base: 0, lg: 3 }}>
              <Poster movieId={183} />
            </Grid.Col>
            <Grid.Col span={9} offset={{ base: 10.5, lg: 12, md: 9 }}>
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

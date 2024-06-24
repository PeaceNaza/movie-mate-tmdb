import { Link } from "react-router-dom";
import Header from "../components/Layouts/Header";
import Poster from "../components/Layouts/Poster";
import Button from "../components/Button";
import { Flex, Grid, Title } from "@mantine/core";

const Homepage = () => {
  return (
    <>
      <Header />
      <Grid gap="xl">
        <Grid.Col span={{ base: 12, md: 6, sm: 9 }}>
          <Title
            mt={{ md: "70px", xs: "md" }}
            order={1}
            fw={600}
            className="sm:text-5xl lg:text-7xl"
          >
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
        </Grid.Col>

        <Grid.Col span={{ md: 6, sm: 12 }}>
          <Grid.Col span={{ base: 1.3, md: 7, sm: 6 }}>
            <Grid gutter="5">
              <Grid.Col span={9} offset={{ md: 2.2 }}>
                <Poster movieId={183} />
              </Grid.Col>

              <Grid.Col span={{ xs: 9 }} offset={{ base: 79, md: 11, sm: 6.5, xs: 35 }}>
                <Poster movieId={20} />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Homepage;

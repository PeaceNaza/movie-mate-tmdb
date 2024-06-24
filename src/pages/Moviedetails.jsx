import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import useStore from "../store";
import Header from "../components/Layouts/Header";
import Button from "../components/Button";
import { Image, LoadingOverlay, Box, Title, Flex, Text } from "@mantine/core";

const Moviedetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const {
    data: movieDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movieDetails", movieId],

    queryFn: () =>
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=11eec6b26256cd542c6f92ff289594c5`,
      ).then((res) => res.json()), //fetching data from tmdb api
  });

  const favoriteMovies = useStore((state) => state.favoriteMovies);

  const toggleFavoriteMovie = useStore((state) => state.toggleFavoriteMovie);

  const isFavorite = movieDetails && favoriteMovies.includes(movieDetails.id);

  const heartClass = `cursor-pointer h-8 w-7 mr-5 ${
    isFavorite ? "text-[#060606]" : "text-[#d9d9d9]"
  }`;

  if (isLoading) {
    return (
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "#a855f7", size: "xl" }}
      />
    );
  }

  if (error) {
    return (
      <Text c="red" fw="lighter" size="lg">
        Something went wrong
      </Text>
    );
  }

  return (
    <>
      <Header />

      <Title ta="center" fw={500} size="35px" mb={20}>
        {movieDetails.title}
      </Title>

      {/*-----------*/}
      <Flex
        w={{ base: "100%", md: "75%" }}
        mx="auto"
        direction={{ base: "column", sm: "row" }}
        className="border rounded-md"
      >
        <Image
          w={{ base: "100%", sm: "50%" }}
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="rounded-l-md"
        />
        <Box c="gray" w={{ base: "100%", md: "50%" }} p={{ base: "md", sm: "xl" }}>
          <Text size="xl" fw={200}>
            {movieDetails.overview}
          </Text>

          <Flex my={20} justify="space-between">
            <Flex gap={4}>
              <FontAwesomeIcon icon={faStar} className="text-yellow-500 mt-[1px] text-xs" />
              <Text fw={500} size="xs" c="red">
                {movieDetails.vote_average}
              </Text>
              <Text fw={500} size="xs">
                ({movieDetails.vote_count}+)
              </Text>
            </Flex>

            <Text fw={500} mr={20} size="xs">
              {movieDetails.release_date}
            </Text>
          </Flex>

          <Flex justify="space-between" mt={40}>
            <Text fw={500} size="sm" c="#a855f7" mt={8}>
              {movieDetails.genres.map((genre) => genre.name).join(", ")}
            </Text>

            <FontAwesomeIcon
              icon={faHeart}
              className={`${heartClass} mt-1 ml- ml-10`}
              onClick={() => toggleFavoriteMovie(movieDetails.id)}
            />
          </Flex>
        </Box>
      </Flex>
      {/*-----------*/}

      <Box py={20}>
        <Button variant="primary" onClick={() => navigate(-1)} className="mb-5">
          Go back
        </Button>
      </Box>
    </>
  );
};

export default Moviedetails;

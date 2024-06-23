import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import useStore from "../store";
import Header from "../components/Layouts/Header";
import Button from "../components/Button";
import {
  LoadingOverlay,
  Box,
  Title,
  Group,
  Flex,
  Text,
  
} from "@mantine/core";

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

  if (error) {
    return (
      <Text c="red" fw="lighter" size="lg">
        Something went wrong
      </Text>
    );
  }

  return (
    <>
    <Group pos="relative">
      <Header />
      <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{color: "#a855f7", size: "xl"}}
        />
        
      <Title className="text-center font-medium md:text-5xl xs:text-3xl my-6 text-black">
        {movieDetails.title}
      </Title>

      <Flex className="mx-auto md:flex-row md:w-3/4 border flex xs:flex-col rounded-md">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="md:w-1/2 rounded-l-md"
        />

        <Box className="md:w-1/2 md:p-10 xs:p-5 text-gray-500">
          <Text className="text-xl font-extralight">{movieDetails.overview}</Text>

          <Flex className="flex justify-between my-5 text-xs">
            <Flex className="flex gap-1">
              <FontAwesomeIcon icon={faStar} className="text-yellow-500 mt-[1px]" />
              <span className="text-red-500">{movieDetails.vote_average}</span>
              <span>({movieDetails.vote_count}+)</span>
            </Flex>

            <span className="mr-5 text-secondary-500">{movieDetails.release_date}</span>
          </Flex>

          <Box className="flex justify-between mt-10">
            <p className="text-sm text-purple-600 mt-2">
              {movieDetails.genres.map((genre) => genre.name).join(", ")}
            </p>

            <FontAwesomeIcon
              icon={faHeart}
              className={`${heartClass} mt-1 ml- ml-10`}
              onClick={() => toggleFavoriteMovie(movieDetails.id)}
            />
          </Box>
        </Box>
      </Flex>

      <Box className="py-20 xs:pb-10">
        <Button variant="primary" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </Box>
      </Group>
    </>
  );
};

export default Moviedetails;

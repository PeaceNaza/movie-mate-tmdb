/* eslint-disable react/prop-types */

import { Box, Container, Text, Image } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

const Poster = ({ movieId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["movie-poster", movieId],
    queryFn: () =>
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=11eec6b26256cd542c6f92ff289594c5`,
      )
        .then((res) => res.json())
        .then((data) => data.poster_path),
  });

  if (isLoading) {
    return (
      <Container className="text-black p-5">
        <span className="loading loading-spinner loading-xs"></span>
        <span className="loading loading-spinner loading-sm"></span>
        <span className="loading loading-spinner loading-md"></span>
        <span className="loading loading-spinner loading-lg"></span>
      </Container>
    );
  }

  if (error) {
    return <Text className="text-red-600 font-extralight text-lg">Something went wrong</Text>;
  }

  const imageUrl = "https://image.tmdb.org/t/p/w342/";
  const posterurl = `${imageUrl}${data}`;

  return (
    <Box className="min-h-full bg-white">
      <Image
        src={posterurl}
        alt="movie poster"
        className="w-full xs:min-w-[160px] xs:h-[250px] md:h-[400px] md:w-[350px]  shadow-xl transform transition-transform duration-300 hover:scale-[1.08]"
      />
    </Box>
  );
};

export default Poster;

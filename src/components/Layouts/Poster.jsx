/* eslint-disable react/prop-types */

import { Text, Image, LoadingOverlay } from "@mantine/core";
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

  const imageUrl = "https://image.tmdb.org/t/p/w342/";
  const posterurl = `${imageUrl}${data}`;

  return (
    <Image
      miw="160px"
      h={230}
      w={{ md: "250px" }}
      src={posterurl}
      alt="movie poster"
      className="transform transition-transform duration-300 hover:scale-[1.08]"
    />
  );
};

export default Poster;

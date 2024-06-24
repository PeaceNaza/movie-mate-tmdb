import { useQuery } from "@tanstack/react-query";
import useStore from "../store";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Layouts/Header";
import { useState } from "react";
import { LoadingOverlay, Button, Image, Title, Box, Flex, Grid, Group, Text } from "@mantine/core";

const MovieLists = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(44493);
  const moviePerPage = 15; //total movie per page

  const { data, isLoading, error } = useQuery({
    queryFn: () =>
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=11eec6b26256cd542c6f92ff289594c5&page=${page}`,
      ).then((res) => res.json()),
    queryKey: ["movies", page],
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 15,
    onSuccess: (data) => {
      setTotalPages(data.total_pages);
    },
  });

  const favoriteMovies = useStore((state) => state.favoriteMovies);

  const toggleFavoriteMovie = useStore((state) => state.toggleFavoriteMovie);

  const { searchTerm } = useStore((state) => ({
    searchTerm: state.searchTerm,
    setSearchTerm: state.setSearchTerm,
  }));

  const displayMovies = data?.results
    ?.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, moviePerPage);

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
      <Group pos="relative" pb={20} mih="100vh" bg="white">
        <Header />
        <Title fw={800} size="35px" mb={30} c="black">
          Lists of movies
        </Title>
        <Box justify="center">
          <Grid gutter="xl">
            {displayMovies?.map((movie) => (
              <Grid.Col
                span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4 }}
                key={movie.id}
                to={`/movie/${movie.id}`}
              >
                {" "}
                <Box bg="#ffffffd8" style={{ borderWidth: "1px", borderRadius: "8px" }}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-t-lg"
                  />

                  <Flex my="8px" justify="space-between">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="text-2xl mt-1 mx-5 text-[#6563d2] hover:underline mb-1"
                      title={movie.title}
                    >
                      {movie.title.length > 20 ? movie.title.slice(0, 19) + "..." : movie.title}
                    </Link>

                    <FontAwesomeIcon
                      icon={faHeart}
                      className={`heart  h-6 w-5 mt-2 mr-4 
         ${favoriteMovies.includes(movie.id) ? "text-[#060606]" : "text-[#d9d9d9]"}`}
                      onClick={() => toggleFavoriteMovie(movie.id)}
                    />
                  </Flex>

                  <Text c="#6a7587" size="sm" mx="lg" mb="8px" fw={500}>
                    {movie.overview.slice(0, 74)}...
                  </Text>
                  <Flex justify="space-between" m={20} c="#6a7587">
                    <Flex gap={5}>
                      <FontAwesomeIcon icon={faStar} className="text-yellow-500 mt-[1px] text-xs" />
                      <Text size="xs" fw={500} c="red">
                        {movie.vote_average}
                      </Text>{" "}
                      <Text size="xs" fw={500}>
                        ({movie.vote_count}+)
                      </Text>{" "}
                    </Flex>

                    <Text size="xs" fw={500}>
                      {movie.release_date}
                    </Text>
                  </Flex>
                </Box>
              </Grid.Col>
            ))}
          </Grid>

          {/* Pagination */}

          <Flex w={{base: "100vw", sm: "auto"}} mt={80} p={20} justify="center" align="center">
            <Button
              variant="default"
              className="disabled:cursor-not-allowed"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>

            <Text mx="8px" my="8px" size="xs" fw={500}>
              Page {page} / {totalPages}
            </Text>
            <Button
              variant="default"
              className="disabled:cursor-not-allowed"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
            >
              Next page
            </Button>
          </Flex>
        </Box>
      </Group>
    </>
  );
};

export default MovieLists;

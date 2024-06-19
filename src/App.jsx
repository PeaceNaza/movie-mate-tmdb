import Homepage from "./pages/Homepage";
import MovieLists from "./pages/MovieLists";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Moviedetails from "./pages/Moviedetails";
import PageNotFound from "./pages/PageNotFound";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Box } from "@mantine/core";

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalCSS>
    <Box className="px-5 md:px-20 min-h-screen bg-white">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movies" element={<MovieLists />} />
          <Route path="/movie/:movieId" element={<Moviedetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </Box>
    </MantineProvider>
  );
};

export default App;

import { Link } from "react-router-dom";
import Header from "../components/Layouts/Header";
import Poster from "../components/Layouts/Poster";
import Button from "../components/Button";

const Homepage = () => {
  return (
    <>
      <Header />
      <main className="md:mt-10 xs:-mt-24 gap-5 flex md:flex-row xs:flex-col h-screen bg-white min-h-screen mb-0">
        <div className="w-1/2">
          <h1 className="text-3xl md:text-4xl lg:text-7xl mt-36 text-black">
            Learn more about your favourite movies
          </h1>
          {/**/}

          <div className="mt-10 flex sm:gap-8 xs:gap-3">
            <Link to={"/movies"}>
              <Button variant="primary">Get started</Button>
            </Link>

            <Link to={"/movies"}>
              <Button variant="outline">I am feeling lucky</Button>
            </Link>
          </div>
        </div>

        <div className="w-1/2 mt-5">
          <div className="grid xs:grid-cols-6 gap-1">
            <div className="col-start-1 xs:col-span-3">
              <Poster movieId={183} />
            </div>
            <div className="col-start-1 col-end-3"> </div>
            <div className="sm:col-end-7 col-span-3 pb-10 xs:col-end-9">
              <Poster movieId={20} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Homepage;

import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Box, Image } from "@mantine/core";

const Header = () => {
  return (
    <Box className="py-5 min-h-full w-full bg-white ">
      <Link to={"/"} className="flex gap-3 w-20">
        <Image src={logo} alt="logo" className="w-10 h-10" />
        <p className="text-[#a855f7] text-2xl">MovieMate</p>
      </Link>
    </Box>
  );
};

export default Header;

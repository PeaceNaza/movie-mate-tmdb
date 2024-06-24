import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Flex, Image, Text } from "@mantine/core";

const Header = () => {
  return (
    <Flex py={15}>
      <Link to={"/"} className="flex gap-3">
        <Image w={40} h={40} src={logo} alt="logo" />
        <Text c="#a855f7" fw={600} size="xl">
          MovieMate
        </Text>
      </Link>
    </Flex>
  );
};

export default Header;

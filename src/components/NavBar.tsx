import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/mind_lab_app_icon.png";
import Button from "./Button";

const NavBar = () => {
  return (
    <HStack padding={"10px"}>
      <Image src={logo} boxSize="60px" />
      <Button
        className="btn btn-outline-primary"
        onClick={() => console.log("Pressed")}
      >
        Create
      </Button>
    </HStack>
  );
};

export default NavBar;

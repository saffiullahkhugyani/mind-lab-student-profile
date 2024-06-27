import { HStack, Image } from "@chakra-ui/react";
import logo from "../../assets/mind_lab_app_icon.png";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <HStack padding={"6px"} justifyContent={"space-between"} className="navbar">
      <div>
        <Image src={logo} boxSize="60px" />
      </div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/create-certificate">Create</Link>
      </div>
    </HStack>
  );
};

export default NavBar;

import { HStack, Image, Select } from "@chakra-ui/react";
import logo from "../../assets/mind_lab_app_icon.png";
import { Link } from "react-router-dom";
import "./NavBar.css";

interface UserProfile {
  age: string;
  email: string;
  id: string;
  mobile: string;
  name: string;
  updated_at: Date;
  photo: string;
}

interface NavBarProps {
  users: UserProfile[];
  selectedUser: string;
  onSelectUser: (userId: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  users,
  selectedUser,
  onSelectUser,
}) => {
  return (
    <HStack padding={"6px"} justifyContent={"space-between"} className="navbar">
      <div>
        <Image src={logo} boxSize="60px" />
      </div>
      <HStack spacing={4}>
        <Link to="/">Home</Link>
        <Link to="/create-certificate">Create</Link>
        <Select
          placeholder="Select user"
          value={selectedUser}
          onChange={(e) => onSelectUser(e.target.value)}
          width="200px"
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
      </HStack>
    </HStack>
  );
};

export default NavBar;

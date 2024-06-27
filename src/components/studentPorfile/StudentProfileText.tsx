import { Text } from "@chakra-ui/react";

interface Props {
  children: String;
}

const StudentProfileText = ({ children }: Props) => {
  return (
    <Text
      fontSize="sm"
      p={2}
      borderRadius={"5"}
      boxShadow="dark-lg"
      rounded="md"
    >
      {children}
    </Text>
  );
};

export default StudentProfileText;

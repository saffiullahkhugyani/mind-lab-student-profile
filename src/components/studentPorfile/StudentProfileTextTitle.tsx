import { Text } from "@chakra-ui/react";

interface Props {
  children: string;
}

const StudentProfileTextTitle = ({ children }: Props) => {
  return (
    <Text fontWeight="bold" fontSize="md">
      {children}
    </Text>
  );
};

export default StudentProfileTextTitle;

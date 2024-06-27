import noUserImage from "../../assets/no-profile-picture-icon.png";
import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import StudentProfileText from "./StudentProfileText";
import StudentProfileTextTitle from "./StudentProfileTextTitle";

interface Profile {
  age: string;
  email: string;
  id: string;
  mobile: string;
  name: string;
  updated_at: Date;
}

interface StudentProfileProps {
  student: Profile;
}

const StudentProfile = ({ student }: StudentProfileProps) => {
  return (
    <Box boxShadow="outline" p="6" rounded="sm" margin={2}>
      <Flex direction="column" align="center" mt={2}>
        <Box border="4px solid white" overflow="hidden" mb={4}>
          <Image
            src={noUserImage} // Replace with your image path
            alt="Profile Picture"
            boxSize="-moz-max-content"
            h={"200px"}
          />
        </Box>
        <VStack spacing={4} align="stretch">
          <Box>
            <StudentProfileTextTitle>User ID:</StudentProfileTextTitle>

            <StudentProfileText>{student.id}</StudentProfileText>
          </Box>
          <Box>
            <StudentProfileTextTitle>Name (English):</StudentProfileTextTitle>
            <StudentProfileText>{student.name}</StudentProfileText>
          </Box>
          {/* <Box>
            <StudentProfileTextTitle>Name (Arabic):</StudentProfileTextTitle>
            <StudentProfileText>{student.arabicFullName}</StudentProfileText>
          </Box> */}
          {/* <Box>
            <StudentProfileTextTitle>Date of Birth:</StudentProfileTextTitle>
            <StudentProfileText>{student.dob}</StudentProfileText>
          </Box> */}
          <Box>
            <StudentProfileTextTitle>Email:</StudentProfileTextTitle>
            <StudentProfileText>{student.email}</StudentProfileText>
          </Box>
          <Box>
            <StudentProfileTextTitle>Contact:</StudentProfileTextTitle>
            <StudentProfileText>{student.mobile}</StudentProfileText>
          </Box>
          {/* <Box>
            <StudentProfileTextTitle>Address:</StudentProfileTextTitle>
            <StudentProfileText>
              {`${student.address.neighborhood}, ${student.address.area}, ${student.address.city}, ${student.address.country}`}
            </StudentProfileText>
          </Box> */}
        </VStack>
      </Flex>
    </Box>
  );
};

export default StudentProfile;

import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import StudentProfile from "../components/studentPorfile/StudentProfile";
import StudentPieChart from "../components/studentPorfile/StudentPieChart";
import StudentCertificates from "../components/studentPorfile/StudentCertificates";

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

const StudentProfilePage = ({ student }: StudentProfileProps) => {
  if (!student) {
    return (
      <Box className="text-bold" justifyContent={"center"}>
        loading data...
      </Box>
    );
  }
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <Show>
        <GridItem>
          <StudentProfile student={student} />
        </GridItem>
      </Show>
      <GridItem>
        <StudentPieChart />
        <StudentCertificates student={student} />
      </GridItem>
    </Grid>
  );
};

export default StudentProfilePage;

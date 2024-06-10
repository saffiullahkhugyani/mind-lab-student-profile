// src/App.tsx

import StudentProfile from "./components/studentPorfile/StudentProfile";
import saffi from "./assets/saffi.jpg";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
// import "./App.css";

const student = {
  photo: saffi, // Update this to the actual path or URL of the student's photo
  number: "42341234",
  dob: "12-12-23",
  arabicFirstName: "صفي",
  arabicLastName: "الله",
  arabicFullName: "صفي الله",
  englishFirstName: "Saffi",
  englishLastName: "Ullah",
  englishFullName: "Saffi Ullah",
  email: "saffiullah@gmail.com",
  contact: "923365661539",
  address: {
    neighborhood: "Muhaisha 1",
    area: "Muuhasiha",
    city: "Diera",
    country: "United Arab Emirates",
  },
  certificates: [
    {
      number: "1231412",
      date: "12-12-23",
      nameArabic: "طباعة ثلاثية",
      nameEnglish: "3d printing",
      pass: "Completed",
    },
    {
      number: "44212",
      date: "11-1-23",
      nameArabic: "بايثون",
      nameEnglish: "Pyahtoo",
      pass: "In progress",
    },
  ],
};

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main" "footer"`,
        lg: `"nav nav" "aside main" "footer footer"`,
      }}
    >
      <GridItem area={"nav"} bg="coral">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area={"aside"} bg="gold">
          Aside
        </GridItem>
      </Show>
      <GridItem area={"main"} bg="dodgerblue">
        Main
      </GridItem>
      <GridItem area={"footer"} bg={"gray"}>
        footer
      </GridItem>
    </Grid>
  );
}

export default App;

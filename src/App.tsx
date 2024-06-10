// src/App.tsx
import React from "react";
import StudentProfile from "./components/studentPorfile/StudentProfile";
import saffi from "./assets/saffi.jpg";
import { Grid, GridItem } from "@chakra-ui/react";
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
    <Grid templateAreas={`"nav" "main" `}>
      <GridItem area={"nav"} bg="coral">
        Nav
      </GridItem>
      <GridItem area={"main"} bg="dodgerblue">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;

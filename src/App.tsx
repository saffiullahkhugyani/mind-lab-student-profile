import saffi from "./assets/saffi.jpg";
import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/navBar/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentProfilePage from "./pages/StudentProfilePage";
import CertificateCreationPage from "./pages/CertificateCreation/CertificateCreationPage";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  "https://hqxhavqdfifdsorruiqp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxeGhhdnFkZmlmZHNvcnJ1aXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1Mjk5MDQsImV4cCI6MjAyNzEwNTkwNH0.yv1Kgjuufvm4_AHi5vdrqE6Ssh5FPh1Yr_xIHlcsAfA"
);

interface UserProfile {
  age: string;
  email: string;
  id: string;
  mobile: string;
  name: string;
  updated_at: Date;
  photo: string;
}

const profileTemplate: UserProfile = {
  age: "",
  email: "",
  id: "",
  mobile: "",
  name: "",
  updated_at: new Date(),
  photo: saffi,
};

function App() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data, error } = await supabase.from("profiles").select();

        if (error) {
          throw error;
        }

        setUsers(data.map((user) => ({ ...profileTemplate, ...user })));
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <Router>
      <Grid
        templateAreas={{
          base: `"nav" "main" `,
          lg: `"nav" "main" `,
        }}
        templateColumns={{
          base: "1fr",
          lg: "1fr",
        }}
      >
        <GridItem area={"nav"} w={"100%"}>
          <NavBar />
        </GridItem>
        <GridItem area={"main"}>
          <Routes>
            <Route
              path="/"
              element={<StudentProfilePage student={users[0]} />}
            />
            <Route
              path="/create-certificate"
              element={<CertificateCreationPage student={users} />}
            />
          </Routes>
        </GridItem>
      </Grid>
    </Router>
  );
}

export default App;

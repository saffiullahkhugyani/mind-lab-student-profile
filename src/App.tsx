import { useEffect, useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import StudentProfilePage from "./pages/StudentProfilePage";
import CertificateCreationPage from "./pages/CertificateCreation/CertificateCreationPage";
import { createClient } from "@supabase/supabase-js";
import saffi from "./assets/saffi.jpg";

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
  const [selectedUser, setSelectedUser] = useState<string>("");

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

  const handleSelectUser = (userId: string) => {
    setSelectedUser(userId);
  };

  if (loading) {
    return (
      <Box className="flex m-5 dataCard" justifyContent={"center"}>
        <h1 className="font-bold">Loading...</h1>
      </Box>
    );
  }

  if (error) return <div>Error: {error}</div>;

  const selectedUserProfile =
    users.find((user) => user.id === selectedUser) || users[0];

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
          <NavBar
            users={users}
            selectedUser={selectedUser}
            onSelectUser={handleSelectUser}
          />
        </GridItem>
        <GridItem area={"main"}>
          <Routes>
            <Route
              path="/"
              element={<StudentProfilePage student={selectedUserProfile} />}
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

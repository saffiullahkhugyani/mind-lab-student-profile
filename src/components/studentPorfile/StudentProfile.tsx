import noUserImage from "../../assets/no-profile-picture-icon.png";
import { Box, Button, Flex, Image, Input, VStack } from "@chakra-ui/react";
import StudentProfileText from "./StudentProfileText";
import StudentProfileTextTitle from "./StudentProfileTextTitle";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/services/supabaseClient";

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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(noUserImage);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, isUploading] = useState(false);

  useEffect(() => {
    const loadUserImage = async () => {
      try {
        const { data, error } = await supabase
          .from("student_profile_image")
          .select()
          .eq("user_id", student.id);
        if (error) {
          throw error;
        }
        if (data.length > 0) setImageUrl(data[0].image_url);
        else setImageUrl(noUserImage);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    };
    loadUserImage();
  }, [student]);

  const handleImageClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    isUploading(true);
    const filePath = `public/${student.id}/${selectedImage.name}`;
    const { data, error } = await supabase.storage
      .from("profile-images")
      .upload(filePath, selectedImage);

    if (error) {
      isUploading(false);
      console.error("Error uploading image: ", error);
    } else {
      isUploading(false);
      const { publicUrl } = supabase.storage
        .from("profile-images")
        .getPublicUrl(filePath).data;
      setImageUrl(publicUrl);

      if (publicUrl) {
        const { data, error } = await supabase
          .from("student_profile_image")
          .insert({
            user_id: student.id,
            image_url: publicUrl,
          })
          .select();

        if (error) {
          throw error;
        }

        console.log(`Data inserted into user imageurl table ${data}`);
      }
      console.log("Image uploaded successfully", data);
      console.log("File oath: ", filePath);
      console.log(publicUrl);
    }
  };

  return (
    <Box boxShadow="outline" p="6" rounded="sm" margin={2}>
      <Flex direction="column" align="center" mt={2}>
        <div className="image-upload-container">
          <div className="box-decoration" onClick={handleImageClick}>
            <label className="image-upload-label">
              {selectedImage ? selectedImage.name : "Choose an image"}
            </label>
            <Image
              src={imageUrl} // Replace with your image path
              alt="Profile Picture"
              boxSize="-moz-max-content"
            />
            <Input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleImageChange}
              className="image-upload-input"
            />
          </div>
          <Button
            className="image-upload-btn"
            onClick={handleImageUpload}
            isDisabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>
        <VStack spacing={4} align="stretch" className="mt-4">
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
          <Box>
            <StudentProfileTextTitle>Age:</StudentProfileTextTitle>
            <StudentProfileText>{student.age}</StudentProfileText>
          </Box>
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

// src/StudentProfile.tsx

import Button from "../Button";
import { Image } from "@chakra-ui/react";

interface Certificate {
  number: string;
  date: string;
  nameArabic: string;
  nameEnglish: string;
  pass: string;
}

interface Address {
  neighborhood: string;
  area: string;
  city: string;
  country: string;
}

interface Student {
  photo: string;
  number: string;
  dob: string;
  arabicFirstName: string;
  arabicLastName: string;
  arabicFullName: string;
  englishFirstName: string;
  englishLastName: string;
  englishFullName: string;
  email: string;
  contact: string;
  address: Address;
  certificates: Certificate[];
}

interface StudentProfileProps {
  student: Student;
}

const StudentProfile = ({ student }: StudentProfileProps) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="d-flex justify-content-between ">
            <Button
              className="btn btn-outline-primary flex-fill me-2"
              onClick={() => console.log("button pressed")}
            >
              Create
            </Button>
            <Button
              className="btn btn-outline-secondary  flex-fill ms-"
              onClick={() => console.log("button pressed")}
            >
              Update
            </Button>
          </div>

          <div className="d-flex">
            <Button
              className="btn btn-outline-danger me-1"
              onClick={() => console.log("button pressed")}
            >
              Previous
            </Button>
            <Button
              className="btn btn-outline-success "
              onClick={() => console.log("button pressed")}
            >
              Next
            </Button>
          </div>
        </div>
      </nav>

      <div className="container text-center">
        <h1 className="text-center">Student Profile</h1>
        <div className="row mb-3">
          <div className="col-md-3 border">
            <Image
              src={student.photo}
              alt="Student Photo"
              className="img-thumbnail"
            />
          </div>
          <div className="col-md-9">
            <table className="table table-bordered">
              <thead></thead>
              <tbody>
                <tr>
                  <th>Member No</th>
                  <td>{student.number}</td>
                  <th>DoB</th>
                  <td>{student.dob}</td>
                </tr>
                <tr>
                  <th>Arabic</th>
                  <th>First Name </th>
                  <th>Last Name </th>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>{student.arabicFirstName}</td>
                  <td>{student.arabicLastName}</td>
                  <td></td>
                </tr>
                <tr>
                  <th colSpan={4}>Full Name </th>
                </tr>
                <tr>
                  <td colSpan={4}>{student.arabicFullName}</td>
                </tr>
                <tr>
                  <th>English</th>
                  <td>Last Name: </td>
                  <td>First Name: </td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>{student.englishFirstName}</td>
                  <td>{student.englishLastName}</td>
                  <td></td>
                </tr>
                <tr>
                  <th colSpan={4}>Full Name </th>
                </tr>
                <tr>
                  <td colSpan={4}>{student.englishFullName}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-3">
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${student.email}`}>{student.email}</a>
          </p>
          <p>
            <strong>Contact:</strong> {student.contact}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {`${student.address.neighborhood}, ${student.address.area}, ${student.address.city}, ${student.address.country}`}
          </p>
        </div>
        <div>
          <h2>Certificates</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Certificate No</th>
                <th>Date</th>
                <th>Name Arabic</th>
                <th>Name English</th>
                <th>Pass</th>
              </tr>
            </thead>
            <tbody>
              {student.certificates.map((cert, index) => (
                <tr key={index}>
                  <td>{cert.number}</td>
                  <td>{cert.date}</td>
                  <td>{cert.nameArabic}</td>
                  <td>{cert.nameEnglish}</td>
                  <td>{cert.pass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;

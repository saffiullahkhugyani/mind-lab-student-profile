import { supabase } from "@/services/supabaseClient";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface CertificateModel {
  certificate_number: number;
  city: string;
  country: string;
  date_added: string;
  id: number;
  issue_authority: string;
  issue_year: string;
  number_of_hours: number;
  skill_category_code: number;
  skill_code: number;
  skill_level: number;
  state: string;
  street_address: string;
  user_id: string;
  skill_name: { skill_name: string };
}

const StudentCertificates = ({ student }: StudentProfileProps) => {
  const [loadUserCertificates, setUserCertificates] =
    useState<CertificateModel[]>();

  useEffect(() => {
    const loadUserCertificates = async () => {
      try {
        const { data, error } = await supabase
          .from("certificate_master ")
          .select(
            `user_id,
            certificate_number,
            country,
            state,
            city,
            street_address,
            issue_authority,
            issue_year,
            number_of_hours,
            date_added,
            skill_category_code,
            skill_code,
            skill_level,
            id,
            skill_name: skill_code(skill_name)`
          )
          .eq("user_id", student.id);
        if (error) {
          throw error;
        }
        console.log(data);
        const formattedData = data.map((certificate: any) => ({
          ...certificate,
          skill_name: certificate.skill_name,
        }));
        if (data.length !== 0) setUserCertificates(formattedData);
      } catch (err) {
        if (err instanceof Error) console.log(err.message);
      }
    };
    loadUserCertificates();
  }, []);

  return (
    <div className="dataCard  m-2">
      {loadUserCertificates ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>Certificate No.</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Skill Name</TableHead>

              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadUserCertificates.map((certificate, index) => (
              <TableRow key={certificate.id}>
                <TableCell>{index + 1}</TableCell>{" "}
                <TableCell>{certificate.certificate_number}</TableCell>
                <TableCell>{certificate.date_added}</TableCell>
                <TableCell>{certificate.skill_name.skill_name}</TableCell>
                <TableCell>Complete</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <h1 className="font-bold">No certificate found</h1>
      )}
    </div>
  );
};

export default StudentCertificates;

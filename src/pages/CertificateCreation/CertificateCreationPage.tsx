import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@/components/ui/datepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FormLabel, Input } from "@chakra-ui/react";
import { Country, State, City, IState, ICity } from "country-state-city";
import { supabase } from "../../services/supabaseClient";

interface Profile {
  age: string;
  email: string;
  id: string;
  mobile: string;
  name: string;
  updated_at: Date;
}

interface StudentProfileProps {
  student: Profile[];
}

interface SkillCategories {
  id: string;
  skill_category_code: number;
  skill_category_name: string;
}

interface Skill {
  id: number;
  skill_category_id: number;
  skill_code: number;
  skill_name: string;
}

interface SkillLevel {
  id: number;
  skill_level_code: number;
  skill_level_name: string;
}

const schema = z.object({
  certificateNumber: z.string(),
  userId: z
    .string()
    .min(10, { message: "User ID must be at least 10 characters" }),
  country: z.string().min(2, { message: "Country is required" }),
  state: z.string().min(2, { message: "State is required" }).optional(),
  city: z.string().min(2, { message: "City is required" }).optional(),
  streetAddress: z.string().min(6, { message: "Street address is required" }),
  issueAuthority: z.string().min(6, { message: "Issue Authority is required" }),
  issueYear: z
    .number({ invalid_type_error: "Issue Year is required" })
    .min(1900, { message: "Invalid year" }),
  numberOfHours: z
    .number({ invalid_type_error: "Number of Hours required" })
    .min(0, { message: "Number of Hours required" }),
  dateAdded: z.date({ required_error: "Date is required" }),
  skillCategoryCode: z
    .number({ invalid_type_error: "Category is required" })
    .min(1, { message: "Category is required" }),
  skillCode: z
    .number({ invalid_type_error: "skill is required" })
    .min(1, { message: "Skill is required" }),
  skillLevelCode: z
    .number({ invalid_type_error: "skill level is required" })
    .min(1, { message: "skill level is required" }),
});

type FormFields = z.infer<typeof schema>;

const CertificateCreationPage: React.FC<StudentProfileProps> = ({
  student,
}) => {
  const countryData = Country.getAllCountries();
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [countryCode, setCountryCode] = useState<string>("");
  const [stateCode, setStateCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [skillCategories, setSkillCategories] = useState<SkillCategories[]>([]);
  const [skillcategoryCode, setSkillCategoryCode] = useState<number>(0);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certificateNumber, setCertificateNumber] = useState<string>("");
  const [skillLevel, setSkillLevel] = useState<SkillLevel[]>([]);

  useEffect(() => {
    const getSkillCategories = async () => {
      try {
        const { data, error } = await supabase.from("skill_category").select();

        if (error) {
          throw error;
        }

        setSkillCategories(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }

        console.log(error);
      }
    };

    getSkillCategories();
  }, []);

  useEffect(() => {
    const getSkillCategoryMaster = async () => {
      try {
        const { data, error } = await supabase
          .from("skill_master")
          .select()
          .eq("skill_category_id", Number(skillcategoryCode));
        if (error) {
          throw error;
        }
        setSkills(data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
        } else {
          console.log(err);
        }
      }
    };

    getSkillCategoryMaster();
  }, [skillcategoryCode]);

  useEffect(() => {
    const loadSKillLevels = async () => {
      try {
        const { data, error } = await supabase.from("skill_level").select();
        if (error) {
          throw error;
        }
        setSkillLevel(data);
      } catch (err) {
        if (err instanceof Error) console.log(err.message);
      }
    };
    loadSKillLevels();
  }, []);

  useEffect(() => {
    if (countryCode) {
      setStates(State.getStatesOfCountry(countryCode));
    }
  }, [countryCode]);

  useEffect(() => {
    if (countryCode && stateCode) {
      setCities(City.getCitiesOfState(countryCode, stateCode));
    }
  }, [countryCode, stateCode]);

  useEffect(() => {
    generateUniqueCertificateNumber();
  }, []);

  const generateUniqueCertificateNumber = async () => {
    let unique = false;
    let newCertificateNumber = "";

    while (!unique) {
      newCertificateNumber = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      const { data, error } = await supabase
        .from("certificate_master")
        .select("certificate_number")
        .eq("certificate_number", newCertificateNumber);

      if (error) {
        console.error("Error checking certificate number:", error);
        return;
      }

      if (data.length === 0) {
        unique = true;
      }
    }

    setCertificateNumber(newCertificateNumber);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: { certificateNumber: certificateNumber },
  });

  const onSubmit: SubmitHandler<FormFields> = async (res) => {
    res.certificateNumber = certificateNumber;
    console.log("Form data:", res);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(res);

    // check if user_id and certificate number  already exists in the table
    const { data: existingData, error: checkError } = await supabase
      .from("certificate_master")
      .select()
      .eq("user_id", res.userId)
      .eq("certificate_number", res.certificateNumber);

    if (checkError) {
      console.log("Error checking existing certificate: ", checkError);
      return;
    }

    if (existingData.length > 0) {
      console.log("Data already exists", existingData);
    } else {
      const { data, error } = await supabase
        .from("certificate_master")
        .insert({
          user_id: res.userId,
          certificate_number: res.certificateNumber,
          country: res.country,
          state: res.state ? res.state : "",
          city: res.city ? res.city : "",
          street_address: res.streetAddress,
          issue_authority: res.issueAuthority,
          issue_year: res.issueYear,
          number_of_hours: res.numberOfHours,
          date_added: res.dateAdded,
          skill_category_code: res.skillCategoryCode,
          skill_code: res.skillCode,
          skill_level: res.skillLevelCode,
        })
        .select();

      if (error) {
        console.log("Error Inserting data: ", error);
        return;
      }
      console.log(data);
    }
  };

  return (
    <div className="mx-20 my-5">
      <h1 className="text-4xl font-bold text-center">Certificate Form</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 flex gap-2">
          <p className="text-xl font-bold">Certificate no.</p>
          <p className="text-xl font-bold">{certificateNumber}</p>
        </div>
        <div>
          <FormLabel>Users</FormLabel>
          <Select
            onValueChange={(value: FormFields["userId"]) =>
              setValue("userId", value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              {student.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.userId && (
            <p className="text-red-500">{errors.userId.message}</p>
          )}
        </div>

        <div>
          <FormLabel>Address</FormLabel>
          <div className="flex gap-2">
            <div>
              <Select
                onValueChange={(value: FormFields["country"]) => {
                  const country = countryData.find(
                    (con) => con.isoCode === value
                  );
                  if (country) {
                    setValue("country", country.name);
                    setCountryCode(value);
                  }
                  setCountryCode(value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {countryData.map((con) => (
                    <SelectItem key={con.isoCode} value={con.isoCode}>
                      {con.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-red-500">{errors.country.message}</p>
              )}
            </div>

            <div>
              {countryCode && (
                <Select
                  onValueChange={(value: string) => {
                    const state = states.find(
                      (state) => state.isoCode === value
                    );
                    if (state) {
                      setValue("state", state.name);
                      setStateCode(value);
                    }
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {errors.state && (
                <p className="text-red-500">{errors.state.message}</p>
              )}
            </div>
            <div>
              {stateCode && (
                <Select
                  onValueChange={(value: string) => {
                    setValue("city", value);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {errors.city && (
                <p className="text-red-500">{errors.city.message}</p>
              )}
            </div>

            <div>
              <Input
                placeholder="Street Address"
                {...register("streetAddress")}
              />
              {errors.streetAddress && (
                <p className="text-red-500">{errors.streetAddress.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <FormLabel>Issue Authority</FormLabel>
          <Input
            {...register("issueAuthority")}
            type="text"
            placeholder="Authority"
          />
          {errors.issueAuthority && (
            <p className="text-red-500">{errors.issueAuthority.message}</p>
          )}

          <FormLabel className="mt-5">Issue Year</FormLabel>
          <Input
            {...register("issueYear", { valueAsNumber: true })}
            type="number"
            placeholder="Issue Year"
          />
          {errors.issueYear && (
            <p className="text-red-500">{errors.issueYear.message}</p>
          )}

          <FormLabel className="mt-5">Number of hours</FormLabel>
          <Input
            {...register("numberOfHours", { valueAsNumber: true })}
            type="number"
            placeholder="Number of Hours"
          />
          {errors.numberOfHours && (
            <p className="text-red-500">{errors.numberOfHours.message}</p>
          )}
        </div>

        <div>
          <FormLabel>Date Added</FormLabel>
          <DatePicker
            onChange={(date) => {
              if (date) {
                setValue("dateAdded", date);
              }
            }}
          />
          {errors.dateAdded && (
            <p className="text-red-500">{errors.dateAdded.message}</p>
          )}
        </div>
        <div>
          <FormLabel>Skill Category</FormLabel>
          <Select
            onValueChange={(value: string) => {
              setValue("skillCategoryCode", Number(value));
              setSkillCategoryCode(Number(value));
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {skillCategories.map((skill) => (
                <SelectItem
                  key={skill.id}
                  value={String(skill.skill_category_code)}
                >
                  {skill.skill_category_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.skillCategoryCode && (
            <p className="text-red-500">{errors.skillCategoryCode.message}</p>
          )}
        </div>

        <div>
          <FormLabel>Skill</FormLabel>
          <Select
            onValueChange={(value: string) => {
              setValue("skillCode", Number(value));
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a skill" />
            </SelectTrigger>
            <SelectContent>
              {skills.map((skill) => (
                <SelectItem key={skill.id} value={String(skill.skill_code)}>
                  {skill.skill_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.skillCode && (
            <p className="text-red-500">{errors.skillCode.message}</p>
          )}
        </div>
        <div>
          <FormLabel>Skill Level</FormLabel>
          <Select
            onValueChange={(value: string) => {
              setValue("skillLevelCode", Number(value));
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select skill level" />
            </SelectTrigger>
            <SelectContent>
              {skillLevel.map((level) => (
                <SelectItem
                  key={level.id}
                  value={String(level.skill_level_code)}
                >
                  {level.skill_level_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.skillLevelCode && (
            <p className="text-red-500">{errors.skillLevelCode.message}</p>
          )}
        </div>

        <Button
          variant="outline"
          disabled={isSubmitting}
          type="submit"
          className="mt-5 animate-pulse"
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default CertificateCreationPage;

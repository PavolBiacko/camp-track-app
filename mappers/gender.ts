import { Enums } from "@/supabase/types";
import { Gender } from "@/types/enums/gender";

export const mapDbGenderToGender = (dbGender: Enums<"gender">): Gender => {
  switch (dbGender) {
    case "MALE":
      return Gender.MALE;
    case "FEMALE":
      return Gender.FEMALE;
    default:
      throw new Error(`Unknown gender: ${dbGender}`);
  }
};

export const mapGenderToDbGender = (gender: Gender): Enums<"gender"> => {
  switch (gender) {
    case Gender.MALE:
      return "MALE";
    case Gender.FEMALE:
      return "FEMALE";
    default:
      throw new Error(`Unknown gender: ${gender}`);
  }
};
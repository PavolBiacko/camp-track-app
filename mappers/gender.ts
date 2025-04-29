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
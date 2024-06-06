import { MusicTypes } from "@/interfaces/types/index.interfaces";
import * as Yup from "yup";

// Custom file validation schema
export const fileSchema = Yup.mixed<File>()
  .nullable()
  .required("Required")
  .test(
    "fileSize",
    "File too large",
    (value) => !value || (value && value.size <= 10000000)
  )
  .test(
    "fileType",
    "Unsupported file format",
    (value) =>
      !value ||
      (value &&
        ["image/jpeg", "image/png", "image/gif", "audio/mpeg"].includes(
          value.type
        ))
  );
export const musicValidationSchema: Yup.ObjectSchema<MusicTypes> = Yup.object({
  name: Yup.string()
    .max(50, "Must be 50 characters or less")
    .required("Required"),
  url: fileSchema,
  image: fileSchema,
});

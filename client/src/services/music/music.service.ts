import { url } from "../index.service";

export const AddMusic = (form: FormData) => {
  console.log(form);

  return url.post("/music/addMusic", form);
};

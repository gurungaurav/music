import { url } from "../index.service";

export const AddMusic = (form: FormData) => {
  console.log(form);

  return url.post("/music/addMusic", form);
};

export const getMusic = (id: string | undefined) => {
  id = id != "" ? id : undefined;
  return url.get(`/music/getHome/${id}`);
};

import { useFormik } from "formik";
import * as Yup from "yup";
import { RxCross1 } from "react-icons/rx";
import { useToast } from "@/components/ui/use-toast";
import FormInput from "../auth/formInput";
import { AddMusicTypes } from "@/interfaces/types/index.interfaces";
import { AddMusic } from "@/services/music/music.service";

const AddMusicDialog: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      title: "",
      music: null,
      image: null,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      music: Yup.mixed().required("Required"),
      image: Yup.mixed().required("Required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);

      if (values.music !== null) {
        formData.append("music", values.music);
      }

      if (values.image !== null) {
        formData.append("image", values.image);
      }

      await Register(formData);
    },
  });

  const Register = async (values: FormData) => {
    try {
      const res = await AddMusic(values);
      console.log(res);
      toast({
        description: res.data.message,
        duration: 4000,
      });
    } catch (e: any) {
      console.log(e.response.data.message);
      toast({
        description: e.response.data.message,
        duration: 4000,
      });
    }
  };

  return (
    <div className="text-white w-[30rem]">
      <div className="w-full flex justify-end">
        <span
          className="p-2 rounded-full hover:bg-hoverColor cursor-pointer duration-300"
          onClick={handleClose}
        >
          <RxCross1 className=" " />
        </span>
      </div>
      <div className="">
        <div className="w-full">
          <p className="text-center text-xl font-semibold w-full">Add a song</p>
          <p className="text-center text-sm mt-2 text-neutral-500 font-semibold w-full">
            Upload an mp3 file
          </p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className="text-white">
        <FormInput
          id="title"
          label="Song title"
          type="text"
          placeholder="Song title"
          formik={formik}
        />
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-white"
          >
            Select a song image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={(event) => {
              formik.setFieldValue(
                "image",
                event.currentTarget.files && event.currentTarget.files[0]
              );
            }}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 block w-full rounded-md bg-hoverColor border-gray-600 text-white"
          />
          {formik.touched.image && formik.errors.image ? (
            <div className="text-red-500 text-sm">{formik.errors.image}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="music"
            className="block text-sm font-medium text-white"
          >
            Select a song file
          </label>
          <input
            id="music"
            name="music"
            type="file"
            onChange={(event) => {
              formik.setFieldValue(
                "music",
                event.currentTarget.files && event.currentTarget.files[0]
              );
            }}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 block w-full rounded-md bg-hoverColor border-gray-600 text-white"
          />
          {formik.touched.music && formik.errors.music ? (
            <div className="text-red-500 text-sm">{formik.errors.music}</div>
          ) : null}
        </div>
        <button
          className="w-full text-center bg-green-500 rounded-3xl p-2 text-black hover:scale-105 duration-300 cursor-pointer mt-4 font-semibold"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddMusicDialog;

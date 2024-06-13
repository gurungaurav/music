import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "./formInput";
import { RxCross1 } from "react-icons/rx";
import { RegisterUser } from "../../services/auth/auth.service";
import { RegisterUserTypes } from "../../interfaces/types/auth/logiRegi.interfaces";
import { useToast } from "@/components/ui/use-toast";

const RegisterForm: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      await Register(values);
    },
  });

  const Register = async (values: RegisterUserTypes) => {
    try {
      const res = await RegisterUser(values);
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
      <div className="flex justify-between items-center">
        <p className="text-center text-3xl font-semibold w-full">Register</p>
        <div
          className="p-2 rounded-full hover:bg-hoverColor cursor-pointer duration-300"
          onClick={handleClose}
        >
          <RxCross1 className="text-2xl " />
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className="text-white">
        <FormInput
          id="name"
          label="Username"
          type="text"
          placeholder="Username"
          formik={formik}
        />
        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="Email"
          formik={formik}
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          formik={formik}
        />
        <button
          className="w-full text-center bg-green-500 rounded-3xl p-2 text-black hover:scale-105 duration-300 cursor-pointer mt-4 font-semibold"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;

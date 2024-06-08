import { LoginUserTypes } from "@/interfaces/types/auth/logiRegi.interfaces";
import { useToast } from "../ui/use-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { RxCross1 } from "react-icons/rx";
import FormInput from "./formInput";
import React from "react";
import { LoginUser } from "@/services/auth/loginRegi.service";
import { useDispatch } from "react-redux";
import { setData } from "@/redux/slice/userSlice";
import { UserStateTypes } from "@/interfaces/types/index.interfaces";

const LoginForm: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      await Register(values);
    },
  });

  const Register = async (values: LoginUserTypes) => {
    try {
      const res = await LoginUser(values);
      console.log(res);
      let data: UserStateTypes = res.data.data;
      dispatch(
        setData({
          id: data.id,
          name: data.name,
          email: data.email,
          picture: data.picture,
        })
      );
      toast({
        description: res.data.message,
        duration: 4000,
      });
    } catch (e: unknown) {
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
        <p className="text-center text-3xl font-semibold w-full">Login</p>
        <div
          className="p-2 rounded-full hover:bg-hoverColor cursor-pointer duration-300"
          onClick={handleClose}
        >
          <RxCross1 className="text-2xl" />
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="text-white">
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
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

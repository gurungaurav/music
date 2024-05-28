import { FormInputProps } from "../../interfaces/types/components/component.interfaces";

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  placeholder,
  formik,
}) => {
  return (
    <div className="h-[100px] flex flex-col gap-2">
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-full p-2 rounded-md border-hoverColor border-2"
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[id]}
      />
      {formik.touched[id] && formik.errors[id] ? (
        <div className="text-red-500 text-xs">{String(formik.errors[id])}</div>
      ) : null}
    </div>
  );
};

export default FormInput;

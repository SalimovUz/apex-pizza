import { TextField } from "@mui/material";
import React, { useState } from "react";
import { auth } from "../../service";
import VerifyCodeModal from "../../components/modals/VerifyCodeModal";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email ni kiriting!"),
    full_name: Yup.string().required("Username ni kiriting!"),
    password: Yup.string()
      .min(6, "Parol kamida 6 ta harf va raqamdan tashkil topishi kerak!")
      .matches(/[A-Z]/, "Parolda katta harf ham qatnashishi kerak!")
      .matches(/\d/, "Kamida bitta raqam ham bo'lishi shart!")
      .required("Parolni kiriting"),
    phone_number: Yup.string()
      .matches(
        /^(\+998)?\d{9}$/,
        "Faqat O'zbekiston raqamlari ro'yxatdan o'ta oladi!"
      )
      .required("Telefon raqam kiriting!"),
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.sign_up(values);
      if (response.status === 200) {
        setModalOpen(true);
        toast.info("Email ga kod yuborildi!", {});
        localStorage.setItem("email", values.email);
        localStorage.setItem("username", values.full_name);
        localStorage.setItem("phone_number", values.phone_number);
        localStorage.setItem("password", values.password);
      } else if (response.status === 400) {
        const data = await response.json();
        alert(data.error);
        toast.error("Nimadir xato ketdi!", {});
        console.log(data.error);
      } else {
        console.log("Signup failed");
        toast.error("Nimadir xato ketdi!", {});
      }
    } catch (error) {
      console.log("Error during signup:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const moveRegister = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen w-full justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg">
        <VerifyCodeModal isOpen={modalOpen} toggle={toggleModal} />
        <div className="card mb-4">
          <h1 className="text-2xl border-none font-bold text-center text-gray-800">
            Sign-Up
          </h1>
        </div>
        <div className="login_body w-full">
          <Formik
            initialValues={{
              email: "",
              full_name: "",
              password: "",
              phone_number: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form className="space-y-2 md:space-y-4" id="submit">
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="text"
                  id="email"
                  className="my-2"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  label="Fullname"
                  name="full_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.full_name}
                  type="text"
                  id="full_name"
                  className="my-2"
                  error={touched.full_name && Boolean(errors.full_name)}
                  helperText={touched.full_name && errors.full_name}
                />
                <div className="my-2">
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="my-2">
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone_number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone_number}
                    type="text"
                    id="phone_number"
                    error={touched.phone_number && Boolean(errors.phone_number)}
                    helperText={touched.phone_number && errors.phone_number}
                    className="mt-2"
                  />
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <a
                    onClick={moveRegister}
                    href="#"
                    className="text-blue-500 hover:underline text-center w-1/4 mx-auto"
                  >
                    Login
                  </a>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    disabled={isSubmitting}
                  >
                    SignUp
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Index;

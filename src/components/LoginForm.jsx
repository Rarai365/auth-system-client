import { Button, Form, Spinner } from "react-bootstrap";
import InputField from "./InputField";
import useForm from "../hooks/useForm";
import { toast } from "react-toastify";
import { loginUser } from "../axios/userAxios";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { useNavigate } from "react-router";
import useLaoder from "../hooks/useLoading";
import { autoLoginAction, getUserAction } from "../../redux/user/userActions";

const initialFormData = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { formData, handleOnChange } = useForm(initialFormData);
  const { email, password } = formData;

  const { isLoading, startLoading, stopLoading } = useLaoder();

  const dispatch = useDispatch();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    startLoading();

    // call axios to hit login endpoint
    const result = await loginUser(formData);

    stopLoading();

    console.log("Login API response:", result);

    if (result.status === "error") {
      return toast.error(result.message);
    }

    // If Success
    // store accessJWT in session storage
    // store refreshJWT in local storage
    sessionStorage.setItem("accessJWT", result.data.accessJWT);
    localStorage.setItem("refreshJWT", result.data.refreshJWT);

    // after tokens are stored
    // get user
    dispatch(getUserAction());
  };

  // Check if user exists | is present
  const { user } = useSelector((state) => state.user);

  // Logic to navigate to another route once user exisit [logged in]
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      navigate("/books");
    }

    if (!user?._id) {
      dispatch(autoLoginAction());
    }
  }, [navigate, user]);

  return (
    <Form onSubmit={(e) => handleOnSubmit(e)}>
      <InputField
        label="Email"
        inputFieldAttributes={{
          type: "email",
          name: "email",
          value: email,
          placeholder: "Enter your Email",
          onChange: handleOnChange,
          required: true,
        }}
      />

      <InputField
        label="Password"
        inputFieldAttributes={{
          type: "password",
          name: "password",
          value: password,
          placeholder: "Enter a Password",
          onChange: handleOnChange,
          required: true,
        }}
      />

      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? <Spinner animation="border" /> : "Login"}
      </Button>
    </Form>
  );
};

export default LoginForm;

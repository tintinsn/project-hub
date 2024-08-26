import AuthForm from "@/components/auth/auth-form";
const initialValues = {
  name: "",
  email: "",
  password: "",
};

const SignUpPage = () => {
  return <AuthForm isSignIn={false}  initialValues={initialValues}/>;
};

export default SignUpPage;

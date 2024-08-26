import AuthForm from "@/components/auth/auth-form";

const initialValues = {
  email: "",
  password: "",
};
const SignInPage = () => {
  return <AuthForm isSignIn initialValues={initialValues} />;
};

export default SignInPage;

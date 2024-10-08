import getUser from "@/app/actions/get-user";
import CreateForm from "@/components/create-form";

const CreatePage = async () => {
  const user = await getUser();

  return <CreateForm user={user} />;
};

export default CreatePage;

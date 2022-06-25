import { Admin } from "@/templates/Admin";
import { Meta } from "@/templates/Meta";

const AdminPage = () => (
  <Admin meta={<Meta title="DAOS" description="MentorDAOs" />}>
    <h3 className="text-2xl font-bold">MentorDAOs</h3>
    <hr className="my-6 opacity-50" />
  </Admin>
);

export default AdminPage;

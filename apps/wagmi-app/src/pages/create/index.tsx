import { Admin } from "@/templates/Admin";
import { Meta } from "@/templates/Meta";

const DaoPage = () => (
  <Admin meta={<Meta title="Start DAO" description="MentorDAO" />}>
    <h3 className="text-2xl font-bold">Start a DAO</h3>
    <hr className="my-6 opacity-50" />
  </Admin>
);

export default DaoPage;

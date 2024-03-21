import { Link } from "react-router-dom";
// Imported Components
import CardEnterName from "../../features/settings/CardEnterName";
import CardEnterEmail from "../../features/settings/CardEnterEmail";
import CardUserRoles from "../../features/settings/CardUserRoles";

const UserAccount = () => {
  return (
    <div className="max-w-[1000px] mx-auto flex flex-col gap-2">
      <h1>Account Details</h1>
      <CardEnterName />
      <CardEnterEmail />
      <p>Birthday:</p>
      <CardUserRoles />
      <Link to="/changePWD" className="btn btn-red">
        Change Password
      </Link>
      <p>Account Created on "2023-01-01"</p>
      <Link to="/settings" className="btn btn-slate">
        Back to Settings
      </Link>
    </div>
  );
};

export default UserAccount;

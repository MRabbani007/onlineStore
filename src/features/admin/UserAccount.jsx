import { useEffect, useState } from "react";

const UserAccount = ({ user, handleEditRoles, handleResetPassword }) => {
  const handleSubmitRoles = (e) => {
    e.preventDefault();
    let roles = {};
    if (roleUser) {
      roles = { User: 2001 };
    } else {
      alert("Warning: User Role is required");
    }
    if (roleSupplier) {
      roles = { ...roles, Supplier: 3030 };
    }
    if (roleAdmin) {
      roles = { ...roles, Admin: 5150 };
    }
    handleEditRoles(user.id, roles);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    handleResetPassword();
  };

  const [roleUser, setRoleUser] = useState(false);
  const [roleSupplier, setRoleSupplier] = useState(false);
  const [roleAdmin, setRoleAdmin] = useState(false);

  useEffect(() => {
    if (user?.roles) {
      if (user.roles?.User) {
        setRoleUser(true);
      }
      if (user.roles?.Admin) {
        setRoleAdmin(true);
      }
      if (user.roles?.Supplier) {
        setRoleSupplier(true);
      }
    }
  }, [user]);

  return (
    <>
      {!!user && (
        <div>
          <h2>
            Username: <span>{user?.username}</span>
          </h2>
          <form onSubmit={handleSubmitPassword}>
            <h3>Reset Password</h3>
            <button className="btn btn-red">Reset</button>
          </form>
          <form onSubmit={handleSubmitRoles}>
            <h3>Roles</h3>
            <div>
              <input
                type="checkbox"
                id="role_user"
                name="role_user"
                checked={roleUser}
                onChange={(e) => {
                  setRoleUser(e.target.checked);
                }}
              />
              <label htmlFor="role_user">User</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="role_supplier"
                name="role_supplier"
                checked={roleSupplier}
                onChange={(e) => {
                  setRoleSupplier(e.target.checked);
                }}
              />
              <label htmlFor="role_supplier">Supplier</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="role_admin"
                name="role_admin"
                checked={roleAdmin}
                onChange={(e) => {
                  setRoleAdmin(e.target.checked);
                }}
              />
              <label htmlFor="role_admin">Admin</label>
            </div>
            <button className="btn btn-yellow">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default UserAccount;

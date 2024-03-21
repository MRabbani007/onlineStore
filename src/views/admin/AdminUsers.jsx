import { useEffect, useState } from "react";
// Imported Hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
// Imported Data
import { ACTIONS, SERVER } from "../../data/actions";
import UserAccount from "../../features/admin/UserAccount";

const AdminUsers = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);

  const [editUser, setEditUser] = useState(null);

  const handleEditRoles = async (id, roles) => {
    let response = await axiosPrivate.put(SERVER.ADMIN_USERS_UPDATEROLES, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.ADMIN_USERS_UPDATEROLES,
        payload: { userName: auth?.user, id, roles },
      },
    });
    if (response?.data?.status === "success") {
      alert("Update successful");
    }
  };

  const handleResetPassword = async () => {
    let response = await axiosPrivate.put(SERVER.ADMIN_USERS_RESETPASSWORD, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.ADMIN_USERS_RESETPASSWORD,
        payload: { userName: auth?.user, id: editUser.id },
      },
    });
    if (response?.data?.status === "success") {
      alert("Update successful");
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchUsers = async () => {
      return await axiosPrivate.post(SERVER.ADMIN_USERS_GETALL, {
        roles: auth?.roles,
      });
    };

    fetchUsers()
      .then((res) => {
        isMounted && setUsers(res?.data);
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="">
      <h1>AdminPage</h1>
      <br />
      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Name</th>
            <th>roles</th>
            <th>Date Created</th>
            <th>Active</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.length !== 0 &&
            users.map((user, index) => {
              return (
                <tr key={index} className="">
                  <td>{index + 1}</td>
                  <td>{user?.id}</td>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>
                    {(user?.firstname || "") + " " + (user?.lastname || "")}
                  </td>
                  <td>{JSON.stringify(Object.values(user?.roles))}</td>
                  <td>{user?.createDate.split("T")[0]}</td>
                  <td>{user?.active !== undefined && String(user.active)}</td>
                  <td>
                    <span onClick={() => setEditUser(users[index])}>Edit</span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <UserAccount
        user={editUser}
        handleEditRoles={handleEditRoles}
        handleResetPassword={handleResetPassword}
      />
    </div>
  );
};

export default AdminUsers;

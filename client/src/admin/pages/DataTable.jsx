import { useState, useEffect } from "react";
import "./DataTable.css";

const DataTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/user");
        const { users } = await response.json();
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(fetchData, 3000);
    fetchData();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="table-wrapper">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>USER</th>
              <th>ROLE</th>
              <th>CENTER</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.UserId}>
                <td>
                  <input
                    type="radio"
                    name="selected-user"
                    value={user.UserId}
                  />
                </td>
                <td>{user.UserId}</td>
                <td>{user.MemberName + user.MemberLname}</td>
                <td>{user.RoleLevel}</td>
                <td>{user.FacilityName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DataTable;

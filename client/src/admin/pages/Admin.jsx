import Header from "../../utils/components/Header";
import Options from "./Options";
import DataTable from "./DataTable";

import requireAuth from "../../utils/use-cases/requireAuth";

import "./Admin.css";

function Admin() {
  return (
    <>
      <Header />
      <div className="admin-container">
        <Options />
        <DataTable />
      </div>
    </>
  );
}
export default requireAuth(Admin);

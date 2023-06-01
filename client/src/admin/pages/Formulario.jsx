import { useState } from 'react';
import { handleSubmitAdd } from "../components/Handlers";
import './Formulario.css';


const Formulario = () => {
  
  const [userData, setUserData] = useState({  
    username:'',
    passcode: '',
    membername: '', 
    memberlname:'', 
    roleid:'',
    centerid:''
  });
  
  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };


  return (
    <div className="form-container">
      <h3>Form Add Users</h3>
      
      <form onSubmit={handleSubmitAdd}
        name='creationForm'>
        <br />
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Passcode:
          <input
            type="text"
            name="passcode"
            value={userData.passcode}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          MemberName:
          <input
            type="text"
            name="membername"
            value={userData.membername}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          MemberLname:
          <input
            type="text"
            name="memberlname"
            value={userData.memberlname}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          RoleId:
          <input
            type="text"
            name="roleid"
            value={userData.roleid}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          CenterId:
          <input
            type="text"
            name="centerid"
            value={userData.centerid}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;

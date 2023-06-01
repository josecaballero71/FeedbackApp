 

const handleSubmitAdd = (event) => {
    
    const token = localStorage.getItem('token');
    event.preventDefault();
    const userData = {
      username: document.creationForm.username.value,
      passcode: document.creationForm.passcode.value,
      membername: document.creationForm.membername.value,
      memberlname: document.creationForm.memberlname.value,
      roleid: document.creationForm.roleid.value,
      centerid: document.creationForm.centerid.value,
      token: token
    }
console.log(userData)
    fetch('http://localhost:4000/useradd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), 
      })
        .then((response) => response.json())
        .then((data) => {
          // Manejar la respuesta del servidor
          console.log(data);
        })
        .catch((error) => {
          // Manejar errores
          console.error(error);
        });
};


  
const handleSubmitUpd = (event) => {

  const userId = 53; // Aquí debes proporcionar el UserId que deseas actualizar
  const token = localStorage.getItem('token');

  event.preventDefault();
  const userData = {
      username: document.creationForm.username.value,
      passcode: document.creationForm.passcode.value,
      membername: document.creationForm.membername.value,
      memberlname: document.creationForm.memberlname.value,
      roleid: document.creationForm.roleid.value,
      centerid: document.creationForm.centerid.value,
      token: token
  }
  console.log(userData)

  fetch(`http://localhost:4000/userupd/${userId}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
     Authorization: `Bearer ${token}`, 
  },
  body: JSON.stringify(userData),
})
  .then((response) => response.json())
  .then((data) => {
    // Manejar la respuesta del servidor
    console.log(data);
  })
  .catch((error) => {
    // Manejar errores
    console.error(error);
  });

    
};  

const handleSubmitDel = () => {

  const userId = 15; // Aquí debes proporcionar el UserId del registro que deseas eliminar
  const token = localStorage.getItem('token'); // Obtén el token de autenticación de tu almacenamiento local
  
  fetch(`http://localhost:4000/userdel/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Envía el token de autenticación en el encabezado Authorization
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Manejar la respuesta del servidor
      console.log(data);
    })
    .catch((error) => {
      // Manejar errores
      console.error(error);
    });
  

};
export { handleSubmitAdd, handleSubmitUpd, handleSubmitDel } 
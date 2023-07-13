import httpService from "./http.service";

const url = "http://localhost:4000/api"

const login = async (User, Password, navigateToComponent, setErrMsg) => {
  let resp = await httpService.post(url + "/login", {
    User,
    Password,
  });

  console.log(resp)

  if (resp.data?.accessToken) {
    sessionStorage.setItem("userLogged", User);
    sessionStorage.setItem("idUser", resp.data.id)
    sessionStorage.setItem("accessToken", resp.data.accessToken);
    sessionStorage.setItem("refreshToken", resp.data.refreshToken);

    navigateToComponent();
  } else if (resp.data?.message){
    console.log(resp.data.message);
    setErrMsg(resp.data.message);
  }
  else {
    console.log("Usuario o clave incorrectos");
    setErrMsg("User or Password incorrect");
  };
}

const signup = async (User, Password, setErrMsg, setSuccess) => {
  try {  
    let resp = await httpService.post(url + "/users", {
      User,
      Password,
    });
    console.log(resp);
    setSuccess(true);
  } catch (err) {
    console.log(err)
    if (!err?.response) {
      console.log("No server response")
      setErrMsg("No server response")
    } else if (err.response?.status === 400) {
      console.log("Username taken")
      setErrMsg("Username taken")
    } else {
      console.log("Registration failed")
      setErrMsg("Registration failed")
    }
  }
}


const logout = () => {
  sessionStorage.removeItem("userLogged");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("idUser");
};

const getUserId = () => {
  return sessionStorage.getItem("idUser");
};

const getUser = () => {
  return sessionStorage.getItem("userLogged");
}

let CambioUsuarioLogueado = null;
const subscribeUsuarioLogueado = (x) => (CambioUsuarioLogueado = x);



const AuthService = {
  login,
  logout,
  getUserId,
  subscribeUsuarioLogueado,
  signup,
  getUser
};


export default AuthService;

//VI SOLO EL LOGIN, HACER TODO. NO ENTIENDO LO DE SUSCRIBEUSUARIOLOGEADO, 
//LO DEMAS ANDA JOYA. CONTEXT SE PUEDE SACAR CREO.


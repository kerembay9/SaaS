import React, {useState} from "react";
import Logo from "../data/HiveLogoTP.png"
import ScreenShot from "../data/Ekran.png"
import { useStateContext } from '../contexts/ContextProvider';

const Login = () => {
  const {isLoggedIn,setIsLoggedIn} = useStateContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
        const apiUrl = "http://127.0.0.1:8000/auth/token/login/"
        fetch(apiUrl,{
            method: "POST",
            body:   new URLSearchParams({
                "username": `${username}`,
                "password": `${password}`,
              })})
        .then(response => response.json())
        .then((response) => console.log(response))
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <section className=" flex items-center justify-center w-full h-full "
    style={{
        background: 
        "linear-gradient(135deg, #000000,#110935, #1C0F57, #27157A, #331B9D )",
      }}>
              <div className=" w-full h-screen g-0 lg:flex lg:flex-wrap ">
                <div className="px-4 md:px-0 lg:w-6/12 ">
                  <div className="md:mx-6 md:p-12 "> 
                  <h4 className="text-3xl font-bold text-white"  >
                    İşinizi 
                    </h4>
                    <h4 className="ml-1 text-3xl font-bold my-3" style={{color:"#FFCC00"}}>
                        <em>Dönüştürmek ve Büyütmek</em> 
                    </h4>
                    <h4 className="text-3xl font-bold text-white ml-8">
                    İçin Tasarlandı.
                    </h4>
                    <img
                        className="mt-20 mx-auto w-4/5 max-w-3xl rounded-lg"
                        src={ScreenShot}
                        alt="SaaS"
                      />
                    
                  </div>
                </div>

                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                >
                  <div className="pl-4 pb-6 text-white md:ml-6 md:pl-12 text-black w-ful">

                    <div className="text-center">
                      <img
                        className="mx-auto w-60 rounded-lg mb-5"
                        src={Logo}
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold"
                      style={{
                        color:'#FC0'
                      }}>
                        Hive Mind v1.0<sup>©</sup> Yönetim Paneli'ne Hoşgeldiniz!
                      </h4>
                    </div>
                    <form>     
                    <div className="flex-col ">                 
                      <input
                            type="text"
                            value={username}
                            className="mb-10 rounded-lg w-full py-1"
                            onChange={handleUsernameChange}
                            placeholder={"Kullanıcı Adı "}
                        />
                        <input
                            type="password"
                            className="mb-10 rounded-lg w-full py-1"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder={"Şifre"}
                        />
                      </div>
 
                      <div className="mb-12 pb-1 pt-1 text-center">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-md font-medium leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            style={{
                              background: 
                                 "linear-gradient(to right, #110935, #231169, #341A9E, #231169, #110935 )",
                            }}
                            onClick={()=> {
                                handleLogin();
                            }}
                          >
                            Giriş
                          </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
    </section>
  );}
  export default Login;
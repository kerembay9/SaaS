import React from "react";
import Logo from "../data/HiveLogo.jpeg"
const Login = () => {
  return (
    <section className="h-screen flex items-center justify-center">
       <div className="container h-full p-10 w-screen">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12"> 
                  <h4 className="mb-10 text-3xl font-bold">
                    İşinizi Dönüştürmek ve Büyütmek İçin Tasarlandı.
                    </h4>
                    <p className="text-l font-semibold">
                    İş dünyasında çığır açan bir deneyimle tanışın! Müşterilerinizi büyüleyin, iş süreçlerinizi akıllıca otomatikleştirin ve verilerinizle büyüleyici sonuçlar elde edin. Kontrol Sizde Olsun!"
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #FFCC00, #00d4ff)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">

                    <div className="text-center">
                      <img
                        className="mx-auto w-48 rounded-lg"
                        src={Logo}
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        Hive Mind Yönetim Paneli'ne Hoşgeldiniz!
                      </h4>
                    </div>
                    <form>
                      <p className="mb-4">Please login to your account</p>
                      <div className="flex-col ">
                          <input
                            type="text"
                            label="Username"
                            className="mb-4 rounded-lg w-full"
                          ></input>
                          <input
                            type="password"
                            label="Password"
                            className="mb-4 rounded-lg w-full"
                          ></input>
                      </div>
 
                      <div className="mb-12 pb-1 pt-1 text-center">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            style={{
                              background:
                                "linear-gradient(to right,  #FFCC00, #00d4ff)",
                            }}
                          >
                            Log in
                          </button>
                      </div>
                    </form>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </section>
  );}
  export default Login;
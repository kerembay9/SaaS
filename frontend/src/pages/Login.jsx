import React, { useState } from 'react';
import { LoginForm } from './loginForm';
import { SignupForm } from './signupForm';
import { motion } from 'framer-motion';
import { AccountContext } from './accountContext';

export default function AccountBox(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState('signin');

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
      <div className="w-280 min-h-550 flex flex-col rounded-lg bg-white shadow-md relative overflow-hidden">
        <div className="w-full h-250 flex flex-col justify-end px-1.8 pb-5em">
          <motion.div
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            className="absolute w-160% h-550 flex flex-col rounded-2xl top-290 left-70 transform rotate-60"
            style={{
              background: "linear-gradient(58deg, rgba(243,172,18,1) 20%, rgba(241,196,15,1) 100%)"
            }}
          />
          {active === "signin" && (
            <div className="w-full flex flex-col">
              <div className="text-30 font-semibold text-white">Welcome</div>
              <div className="text-30 font-semibold text-white">Back</div>
              <div className="text-11 font-medium text-white mt-7">Please sign-in to continue!</div>
            </div>
          )}
          {active === "signup" && (
            <div className="w-full flex flex-col">
              <div className="text-30 font-semibold text-white">Create</div>
              <div className="text-30 font-semibold text-white">Account</div>
              <div className="text-11 font-medium text-white mt-7">Please sign-up to continue!</div>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col px-20">
          {active === "signin" && <LoginForm />}
          {active === "signup" && <SignupForm />}
        </div>
      </div>
    </AccountContext.Provider>
  );
}

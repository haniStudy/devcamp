"use client"

import React, { useEffect, useState } from "react";
import SignUp from "../pages/signup";
import LogIn from "../pages/login";
import { motion } from "framer-motion";

const MainPage = () => {
    const [buttonName, setButtonName] = useState<string>("SignUp");


    const [isVisible, setIsVisible] = useState(true);
    const [signUpShow, setSignUpShow] = useState({
        x: "0%",
        opacity: 1,
        display: "block",
        transitionEnd: {}
    });

    useEffect(() => {
        // 버튼 이름 변경
        if(isVisible) setButtonName("LogIn");
        else setButtonName("SignUp");

        // isVisible 상태에 따라 signUpShow 객체의 x 속성을 변경합니다.
        setSignUpShow(prevState => ({
            ...prevState,
            x: isVisible ? "0%" : "100%"
        }));
    }, [isVisible]);

    return (
        <div className="w-full h-full m-10">
            <div className="flex justify-around ">
                <LogIn />
                <SignUp />
            </div>
            <div className="absolute top-0 left-0  h-full w-1/2">
                <motion.div className="flex bg-black h-full" animate={signUpShow}>
                    <div className="controls flex justify-center items-center h-full">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsVisible(!isVisible)}
                            className="text-white h-full flex items-center justify-center"
                        >
                            {buttonName}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MainPage;
"use client"

import React, { useEffect, useState } from "react";
import SignUp from "../signup";
import LogIn from "../login";
import { motion } from "framer-motion";

const MainPage = () => {
    const [buttonName, setButtonName] = useState<string>("SignUp");

    const [isVisible, setIsVisible] = useState(true);
    const [signUpShow, setSignUpShow] = useState({
        x: "0%",
        opacity: 1,
        display: "block",
    });

    useEffect(() => {
        // 버튼 이름 변경
        if(isVisible) setButtonName("LogIn");
        else setButtonName("SignUp");

        // isVisible 상태에 따라 signUpShow 객체의 x 속성을 변경
        setSignUpShow(prevState => ({
            ...prevState,
            x: isVisible ? "0%" : "100%"
        }));
    }, [isVisible]);

    return (
        <div className="w-screen h-screen m-10">
            <div className="flex justify-around">
                <LogIn isVisible={isVisible}/>
                <SignUp />
            </div>
            <div className="absolute top-0 left-0 w-1/2 h-screen">
                <motion.div className="flex bg-white h-screen" animate={signUpShow}>
                    <div className="controls flex justify-center items-center">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsVisible(!isVisible)}
                            className="text-black h-screen flex items-center justify-center"
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
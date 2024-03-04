"use client"

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

type newUserType = {
    name: string;
    email: string;
    tel: string;
    role: string;
    password: string;
    passwordConfirm: string;
}

const SignUp = () => {
    // 스키마
    const schema = z.object({
        name: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }),
        email: z.string().email({ message: "올바른 이메일을 입력해주세요." }),
        tel: z.string().refine(value => value.startsWith('010'), { message: "010으로 시작하는 11자리 숫자를 입력해주세요." })
                        .refine(value => value.length >= 11, { message: "연락처는 11자리여야 합니다." }),
        role: z.string().nonempty({ message: "역할을 선택해주세요." }),
        password: z.string().min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
                         .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, { message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다." }),
        passwordConfirm: z.string()
                        .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
                        .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, { message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다." })
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ["passwordConfirm"],
        message: "비밀번호가 일치하지 않습니다.",
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            tel: "",
            role: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const onSubmit = (data: newUserType) => {
        alert(JSON.stringify(data, null, 4));
    };

    return (
        <article>
            <section>
                <h1>계정을 생성합니다.</h1>
                <span>필수 정보를 입력해볼게요.</span>
            </section>
            <section>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-10">
                    <div>
                        <label htmlFor="name">이름</label>
                        <input type="text" id="name" placeholder="홍길동" {...register("name")}/>
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="email">이메일</label>
                        <input type="email" id="email" placeholder="hello@sparta-devcamp.com" {...register("email")}/>
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="tel">연락처</label>
                        <input type="tel" id="tel" placeholder="01000000000" {...register("tel")}/>
                        {errors.tel && <p>{errors.tel.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="role">역할</label>
                        <select id="role" {...register("role")}>
                            <option value="" disabled selected hidden>역할을 선택해주세요</option>
                            <option value="관리자">관리자</option>
                            <option value="일반 사용자">일반 사용자</option>
                        </select>
                        {errors.role && <p>{errors.role.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" id="password" {...register("password")}/>
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="passwordConfirm">바말번호 확인</label>
                        <input type="password" id="passwordConfirm" {...register("passwordConfirm")}/>
                        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
                    </div>

                    <button type="submit">다음 단계로 → </button>
                    <button>이전 단계로</button>
                </form>
            </section>
        </article>
    )
}

export default SignUp;
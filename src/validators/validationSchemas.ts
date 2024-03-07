import { z } from "zod";

export const logInSchema = z.object({
    email: z.string().email({ message: "올바른 이메일을 입력해주세요." }),
    password: z.string().min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
                     .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, { message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다." }),
});

export const signUpSchema = logInSchema.extend({
    name: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }),
    tel: z.string().refine(value => value.startsWith("010"), { message: "010으로 시작하는 11자리 숫자를 입력해주세요." })
                    .refine(value => value.length >= 11, { message: "연락처는 11자리여야 합니다." }),
    role: z.string().nonempty({ message: "역할을 선택해주세요." }),
    passwordConfirm: z.string()
                    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
                    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, { message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다." })
}).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
});
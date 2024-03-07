"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
        tel: z.string().refine(value => value.startsWith("010"), { message: "010으로 시작하는 11자리 숫자를 입력해주세요." })
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

    const form = useForm<newUserType>({
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5 h-screen w-1/3 justify-center">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="홍길동" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="hello@sparta-devcamp.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField control={form.control} name="tel" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input placeholder="01000000000" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField control={form.control} name="role" render={({ field }) => (
                    <FormItem>
                        <FormLabel>역할</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="역할을 선택해주세요" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="admin">관리자</SelectItem>
                                <SelectItem value="user">일반사용자</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField control={form.control} name="passwordConfirm" render={({ field }) => (
                    <FormItem>
                        <FormLabel>password Confirm</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">SignUp</Button>
            </form>
        </Form>
    )
}

export default SignUp;
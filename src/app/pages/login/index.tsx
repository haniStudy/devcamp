"use client"

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

type newUserType = {
    email: string;
    password: string;
}

const LogIn = () => {
    // 스키마
    const schema = z.object({
        email: z.string().email({ message: "올바른 이메일을 입력해주세요." }),
        password: z.string().min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
                         .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, { message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다." }),
    });

    const form = useForm<newUserType>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: newUserType) => {
        alert(JSON.stringify(data, null, 4));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-10 w-1/3">
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

                <Button type="submit">LogIn</Button>
            </form>

        </Form>
    )
}

export default LogIn;
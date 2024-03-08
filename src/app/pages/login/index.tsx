"use client"

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UserLoginType } from "@/types/userType";
import { logInSchema } from "@/validators/validationSchemas";

const LogIn = ({isVisible}: {isVisible: boolean}) => {
    const form = useForm<UserLoginType>({
        resolver: zodResolver(logInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: UserLoginType) => {
        alert(JSON.stringify(data, null, 4));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`flex flex-col justify-center space-y-10 w-1/3 ${isVisible ? "" : "z-10"}`}>
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
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="bg-black text-white">LogIn</Button>
            </form>
        </Form>
    )
}

export default LogIn;
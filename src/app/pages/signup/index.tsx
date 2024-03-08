"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UserSignUpType } from "@/types/userType";
import { signUpSchema } from "@/validators/validationSchemas";
import InputForm from "@/components/signup/InputForm";

const SignUp = () => {
    const form = useForm<UserSignUpType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            tel: "",
            role: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const onSubmit = (data: UserSignUpType) => {
        alert(JSON.stringify(data, null, 4));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5 h-screen w-1/3 justify-center">
                <InputForm form={form} id="name" labelName="Name" type="text" placeholder="홍길동"/>

                <InputForm form={form} id="email" labelName="Email" type="email" placeholder="hello@sparta-devcamp.com"/>

                <InputForm form={form} id="tel" labelName="Phone" type="text" placeholder="01000000000"/>

                <FormField control={form.control} name="role" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-black">역할</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl className="bg-white">
                                <SelectTrigger>
                                    <SelectValue placeholder="역할을 선택해주세요" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white">
                                <SelectItem value="admin">관리자</SelectItem>
                                <SelectItem value="user">일반사용자</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                  )}
                />

                <InputForm form={form} id="password" labelName="Password" type="password" placeholder=""/>

                <InputForm form={form} id="passwordConfirm" labelName="password Confirm" type="password" placeholder=""/>

                <Button className="bg-black text-white" type="submit">SignUp</Button>
            </form>
        </Form>
    )
}

export default SignUp;
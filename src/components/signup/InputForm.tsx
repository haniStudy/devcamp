import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserLoginType, UserSignUpType } from "@/types/userType";

type IdType = "name" | "email" | "tel" | "role" | "password" | "passwordConfirm";

const InputForm = ({form, id, labelName, type, placeholder}: {form: UseFormReturn<UserSignUpType>, id: IdType, labelName: string, type: string, placeholder: string }) => {
    return (
        <FormField control={form.control} name={id} render={({ field }) => (
            <FormItem>
                <FormLabel>{labelName}</FormLabel>
                <FormControl>
                    <Input type={type} placeholder={placeholder} {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
          )}
        />
    )
}

export default InputForm;
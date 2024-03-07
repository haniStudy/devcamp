export type UserLoginType = {
    email: string;
    password: string;
}

export type UserSignUpType = UserLoginType & {
    name: string;
    tel: string;
    role: string;
    passwordConfirm: string;
};
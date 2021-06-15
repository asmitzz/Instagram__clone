import { Dispatch,SetStateAction } from "react";

export type InputProps = {
    type:|"text" | "password" | "email";
    name:string;
    placeholder:string;
    value:number | string;
    error:boolean;
    setTogglePassword?:Dispatch<SetStateAction<boolean>>;
    togglePassword?:boolean;
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void
}
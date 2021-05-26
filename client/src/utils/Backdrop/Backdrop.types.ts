import { Dispatch,SetStateAction } from "react";

export type BackdropProps = {
    children?:React.ReactNode,
    toggle:Dispatch<SetStateAction<boolean>>;
    className?:string;
}
import { Dispatch,SetStateAction } from "react";

export type BackdropProps = {
    toggle:Dispatch<SetStateAction<boolean>>;
    className?:string;
}
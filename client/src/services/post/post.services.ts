import axios, { AxiosError } from "axios";
import { serverError } from "../../generic.types";
import { PostData, UploadPostResponse } from "./post.services.types";

export const uploadPost = async({file,caption}:PostData,token:string):Promise<UploadPostResponse|serverError> => {
    try {
        const formData = new FormData();
        formData.append("file",file);
        formData.append("caption",caption);

        const res = await axios.post<UploadPostResponse>("http://localhost:5000/posts",formData,{
            headers:{ "Authorization":`Bearer ${token}` }
        });
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            const serverError = (error as AxiosError<serverError>);
            if(serverError && serverError.response){
                return serverError.response.data
            }
        }
        return { message:"something went wrong" }
    }
}
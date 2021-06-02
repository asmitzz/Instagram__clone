import axios from "axios";

export async function uploadFile(file:File):Promise<string|null>{
    const formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset', 'r2ezeomg');
    formData.append('cloud_name', 'instagram-clone-by-asmit');
  
    try {
        const {data} = await axios.post(`${process.env.REACT_APP_CLOUDINERY_BASE_URL}`,formData);
        return data.url;
    } catch (error) {
        return null;
    }
}
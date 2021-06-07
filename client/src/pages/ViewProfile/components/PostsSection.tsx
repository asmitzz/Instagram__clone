import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

type Post = {
   _id:string;
   file:string;
}

type PostsSectionProps = {
   posts:Post[]
}

const PostsSection = ({posts}:PostsSectionProps) => {

    return (
        <div className="posts__section">
             <div className="section__1">
                 <button className="post__btn active">
                    <svg aria-label="Posts" fill="#262626" height="12" viewBox="0 0 48 48" width="12"><path clipRule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fillRule="evenodd"></path></svg>
                    {" "}POSTS
                 </button>
             </div>
             
             <div className="section__2">
                 {
                       posts.map( (post:Post) => {
                        const extension = post.file.split(".").pop();
                        const isImg = ["jpg","png","jpeg"].some(type => type === extension);
                        const isVideo = ["mp3","mp4"].some(type => type === extension);
                       return(
                        <Link to="/profile" key={post._id}>
                          { isImg && <img width="100%" alt="post" height="auto" src={post.file}/>}
                          { isVideo && <ReactPlayer url={post.file} width="100%" height="100%"/>}
                       </Link>
                       )
                    })
                 }

             </div>
             {/* <div className="private__account__template">
                  <i className="fa fa-lock"> This Account is Private</i>
                  <p className="template__content">Follow to see their photos and videos.</p>
             </div> */}
        </div>
    );
};

export default PostsSection;
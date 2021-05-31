import Input from "../../utils/form/Input/Input";
import "./AddPost.css";

const AddPost = () => {
    return (
        <div className="addpost__container">
            {/* <img className="file" alt="users" src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"/> */}
            <form>
               <div className="form__group upload__icon">
                  <i className="fa fa-plus"></i>
                  <input type="file" className="upload__file" accept="images/*,.png,.mp3,.mp4"/>
               </div>

                <Input type="text" value="never give up" error={false} onChange={() => {}} name="caption" placeholder="Caption" />
                <div className="form__group">
                  <input type="submit" className="submit__btn" value="POST"/>
                </div>
            </form>
        </div>
    )
}

export default AddPost

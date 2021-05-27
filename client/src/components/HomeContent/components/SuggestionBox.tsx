import { Link } from "react-router-dom";

const SuggestionBox = () => {
  return (
    <div className="suggestions__box">
      <h3 className="suggestion__heading">Suggestions For You</h3>
      <div className="suggested__users">
        <Link to="/" className="avatar">
          <div className="avatar__img__container">
            <img
              className="avatar__img"
              width="35px"
              height="35px"
              alt="profile"
              src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"
            />
            <div>
              <h4 className="username">smit__asmit008</h4>
              <span className="fullname">Asmit shrivastava</span>
            </div>
          </div>
        </Link>
         <button className="follow__btn">Follow</button>
      </div>
    </div>
  );
};

export default SuggestionBox;

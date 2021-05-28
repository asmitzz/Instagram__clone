const UserChats = () => {
    return (
        <div className="userchats">
            <header className="userchats__header">
               <img width="30px" className="user__pic" alt="users" height="30px" src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"/>
               <div className="username">smit__asmit008</div>
            </header>

            <form className="userchats__form">
                <div className="form__group">
                  <input type="text" className="chats__input" placeholder="Message..."/>
                </div>
            </form>
        </div>
    );
};

export default UserChats;

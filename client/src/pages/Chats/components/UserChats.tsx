const UserChats = () => {
    return (
        <div className="userchats">
            <header className="userchats__header">
               <img width="30px" className="user__pic" alt="users" height="30px" src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"/>
               <div className="username">smit__asmit008</div>
            </header>

            <div className="chats">
                 <div className="received">
                    <img width="30px" className="user__pic" alt="users" height="30px" src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"/>
                    <p className="received__message">
                     Hello how are you?
                   </p>
                 </div>

                 <div className="send">
                    <p className="send__message">
                      Hello I am fine what about you?
                    </p>
                 </div>

                 <div className="send">
                    <p className="send__message">
                      Hello I am fine what about you?
                    </p>
                 </div>

                 <div className="send">
                    <p className="send__message">
                      Hello I am fine what about you?
                    </p>
                 </div>

                 <div className="send">
                    <p className="send__message">
                      Hello I am fine what about you?
                    </p>
                 </div>

                 <div className="send">
                    <p className="send__message">
                      Hello I am fine what about you?
                    </p>
                 </div>

                 <div className="send">
                    <p className="send__message">
                      Hello I am fine what about you?
                    </p>
                 </div>

                 <div className="send">
                    <p className="send__message">
                      Hello I am fine what about you?
                    </p>
                 </div>

                 <div className="received">
                    <img width="30px" className="user__pic" alt="users" height="30px" src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"/>
                    <p className="received__message">
                     Hello how are you?
                   </p>
                 </div>

                 <div className="received">
                    <img width="30px" className="user__pic" alt="users" height="30px" src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"/>
                    <p className="received__message">
                     Hello how are you?
                   </p>
                 </div>

                 <div className="received">
                    <img width="30px" className="user__pic" alt="users" height="30px" src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"/>
                    <p className="received__message">
                     Hello how are you?
                   </p>
                 </div>

                 <div className="received">
                    <img width="30px" className="user__pic" alt="users" height="30px" src="https://media-exp1.licdn.com/dms/image/C4D03AQF8NZtG5CKsdg/profile-displayphoto-shrink_400_400/0/1619208093598?e=1627516800&v=beta&t=QfZr3d6rNxivr6T4Sda9R2TuaImCSEQ7tvHRyM6Xe5g"/>
                    <p className="received__message">
                     Hello how are you?
                   </p>
                 </div>

            </div>

            <form className="userchats__form">
                <div className="form__group">
                  <input type="text" className="chats__input" placeholder="Message..."/>
                  <input type="submit" className="send__btn" disabled={true} value="Send"/>
                </div>
            </form>
        </div>
    );
};

export default UserChats;

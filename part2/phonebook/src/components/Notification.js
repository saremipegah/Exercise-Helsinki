import './Notification.css'
const Notification = ({successMessage}) =>{
    console.log(successMessage);

    if(!successMessage){
      return null;
    }
    if(successMessage){
        return(
            <div className="notification">
                {successMessage}
            </div>
        )

    }
    

}

export default Notification;
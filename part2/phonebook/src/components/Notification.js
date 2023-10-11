import './Notification.css'
const Notification = ({successMessage , errorMessage}) =>{
    console.log(successMessage);

    if(!successMessage && ! errorMessage){
      return null;
    }
   
        return(
            <div className={` message ${successMessage ? "success" : "error" }`}>
                {!successMessage ? errorMessage : successMessage}
            </div>
        )

    

}

export default Notification;
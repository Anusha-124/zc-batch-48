import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import Swal from 'sweetalert2'





function Header(props) {
  
  let navigate = useNavigate();
  
  let getTokenDetails = ()=>{
   // read the data from the lcal stroge 
   let token = localStorage.getItem("auth-token")
   if (token === null){
    return false
   }else{
    return jwt_decode(token);
   }
  }

  const [userLogin, setUserLogin]= useState(getTokenDetails());
  

  let onSuccess = (credentialResponse)=>{
    let token = credentialResponse.credential;
     let data  = jwt_decode(token)
    console.log(data);
    //save the data
    localStorage.setItem("auth-token",token);
    Swal.fire({
      icon: 'Success',
      title: 'Login Successfully',
      text: '',
      
    }).then(()=>{
      window.location.reload()
    })
  

  }

  let onError = ()=>{
    Swal.fire({
      icon: 'error',
      title: 'Opps...!',
      text: 'Login failed',
      
    })
    
  }
  console.log(userLogin);
  let logout = ()=>{
    Swal.fire({
      title: 'Are you sure to logout',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout  me !'
    }).then((result) => {
      if (result.isConfirmed) {
           //remove data from local stroage
           //remove item
        localStorage.removeItem("auth-token");
        window.location.reload() 
      }
    })
 
   

  }
  return (
    <>
      <GoogleOAuthProvider clientId="810521520851-giavppitq27mt0fauo40h4lskeatmr45.apps.googleusercontent.com">
        <div
          className="modal fade"
          id="google-sign-in"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Google Sign-In
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <GoogleLogin
                  onSuccess={onSuccess}
                  onError={onError}
                />
                ;
              </div>
            </div>
          </div>
        </div>
        <header className={"row heading " + props.color}>
          <div className="col-12 d-flex justify-content-between">
            <div className="filter-menu-brand-logo">
              <p
                className="filter-menu-logo-name hand"
                onClick={() => navigate("/")}
              >
                e!
              </p>
              </div>
              { userLogin ? ( <div>
                 <div className=" d-lg-flex">
              <span className="fs-5 text-white fw-bold me-3">Welcome, {userLogin.given_name}</span>
              <button className="btn btn-outline-light border border-1" onClick={logout}>
               <i className="fa fa-exit" aria-hidden = "true"></i>Logout 
              </button>
      
            </div></div>  ): (
            
           
            <div className=" d-lg-flex">
              <button
                className="btn text-white"
                data-bs-toggle="modal"
                data-bs-target="#google-sign-in"
              >
                Login
              </button>
              <button className="btn btn-outline-light border border-1">
                Create an account
              </button>
      
            </div>

)} 
          </div>
          
        </header>
      </GoogleOAuthProvider>
      ;
    </>
  );
}

export default Header;

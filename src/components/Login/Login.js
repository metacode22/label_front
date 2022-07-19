import axios from "axios";
import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { setCookie } from "../../cookie/cookie";

const clientId = "432604043005-ha7dq6k3unqersiaciethfdi8tr2lcr0.apps.googleusercontent.com";

function Login() {
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    let navigate = useNavigate();
    
    const onSuccess = (response) => {
        console.log(response.accessToken);
        
        axios.post('http://localhost:3001/login', {
            tokens: response.accessToken
        })
        .then((response) => {
            setCookie('id', response.data.result);
            console.log(response);
            navigate('/library');
        })
        .catch((error) => {
            console.log(error);
        })
        
    }
    
    const onFailure = (response) => {
        console.log("LOGIN FAILED! response: ", response);
    }

    
    return (
        <div id="signInButton">
            <GoogleLogin 
                clientId={clientId}
                buttonText="Log in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login;
import axios from "axios";
import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const clientId = "790356719859-n6vusb9mi2cejjumcuick5qbqubvn6tu.apps.googleusercontent.com";

function Login() {
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    let navigate = useNavigate();
    
    const onSuccess = (response) => {
        console.log(response.accessToken);
        
        axios.post('https://inkyuoh.shop/socialLogin', {
            tokens: response.accessToken
        })
        .then((response) => {
            setCookie('sessionID_label', response.data.result);
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
        <div id="signInButton" style={{textAlign: 'center', marginTop:'50px'}}>
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
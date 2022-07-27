import { GoogleLogout } from "react-google-login";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const clientId = "175615424044-eqrukop3k2spabpknd63vtm2kqtiff91.apps.googleusercontent.com";

function Logout() {
    let navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['sessionID_label']);
    console.log("cookies :", cookies);
    const header = {
        sessionidforauth: cookies.sessionID_label
    }
    
    const onSuccess = () => {
        removeCookie('sessionID_label');
        axios.post('http://localhost:3001/logout', {header})
        //     headers: {
        //         sessionidforauth: cookies.sessionID_label
        //     }
        // })
        .then((response) => {
            console.log('logout success:', response);
        })
        .catch((error) => {
            console.log('logout fail:', error)
        })
        navigate('/');
    }
    
    return (
        <div id="signOutButton" style={{ marginLeft: '10px'}}>
            <GoogleLogout 
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;
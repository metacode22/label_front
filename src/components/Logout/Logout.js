import { GoogleLogout } from "react-google-login";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const clientId = "175615424044-eqrukop3k2spabpknd63vtm2kqtiff91.apps.googleusercontent.com";

function Logout() {
    let navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    
    const onSuccess = () => {
        removeCookie('id');
        axios.get('http://localhost:3001/logout', {
            headers: {
                sessionidforauth: cookies.id
            }
        })
        .then((response) => {
            console.log('logout success:', response);
        })
        .catch((error) => {
            console.log('logout fail:', error)
        })
        navigate('/');
    }
    
    return (
        <div id="signOutButton">
            <GoogleLogout 
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;
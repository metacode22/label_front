import { useEffect } from "react";
import "./PageRendered.css";

function PageRendered(props) {
    return (
        <div dangerouslySetInnerHTML={{ __html: props.html }}></div>
    );
}

export default PageRendered;

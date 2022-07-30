import "./PageRendered.css";

function PageRendered(props) {
    return (
        <div dangerouslySetInnerHTML={{ __html: props.html }} onTouchStart="touchState(event);" onTouchMove="touchMove(event);" onTouchEnd="touchEnd(event);" onTouchCancel="touchCancel(event);"></div>
    );
}

export default PageRendered;

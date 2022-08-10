import ReactDOM from "react-dom";

const PortalContainer = ({children}) => {
    const modalRoot = document.getElementById("modal-root");
    if(!modalRoot) return;
    return ReactDOM.createPortal(
      children, modalRoot);
}

export default PortalContainer
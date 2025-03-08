import ReactDOM from "react-dom";


type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
  };

const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps)  => {
    if (!isOpen) return null;
    return ReactDOM.createPortal(<>
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" onClick={onClose}>
    <div className="absolute top-5 rounded-lg bg-[#202124] w-[512px] p-5">
        <div className="mb-5">{title}</div>
        <div>{children}</div>
        <div className="flex items-center">{footer}</div>
    </div>
    </div>
    </>,
    document.body
  );
}

export default Modal;
import * as React from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/css/ModalView.css'


export interface IModalProps {
    handleClose: () => void;
    show: boolean;
    children: React.ReactElement[];
    handleSave: () => void;
    showSaveButton: boolean;
}

const ModalView = ({
    handleClose,
    show,
    children,
    handleSave,
    showSaveButton,
}: IModalProps) => {
    console.log("Popup:::" + show)
    if (show) {
        return (
            <div className='modal display-block'>
                <section className="modal-main">
                    {children}
                    <div className="actions">
                        {
                            showSaveButton &&
                            <Button onClick={handleSave} variant="primary" className="mr-1">
                                Save
                            </Button>
                        }
                         <Button onClick={handleSave} variant="secondary" className="mr-1">
                                Close
                        </Button>
                        {/* <button onClick={handleClose}>Close</button> */}
                    </div>
                </section>
            </div>
        );
    } else {
        return null;
    }

};

export default ModalView;

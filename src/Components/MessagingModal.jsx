import React,{useState, useEffect} from 'react';
import './App.css';
import {Button, Modal} from "react-bootstrap";

export default function MessagingModal({recipient, showModal, onClose}) {

    const [displayModal, setDisplayModal] = useState(showModal);

    console.log(displayModal);

    const handleClose = () => {
        setDisplayModal(false);
        onClose(!showModal);
    }
    const handleShow = () => setDisplayModal(true);

    return (
        <div class="justify-content-center align-items-center">
            <Modal
                show={displayModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{recipient}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Body
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
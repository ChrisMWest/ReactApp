import React,{useState, useEffect} from 'react';
import './App.css';
import {Button, Modal} from "react-bootstrap";

export default function MessagingModal({recipient, showModal, socket, onClose}) {

    const [displayModal, setDisplayModal] = useState(showModal);
    const [modalContent, setModalContent] = useState("");

    console.log(displayModal);

    const handleClose = () => {
        setDisplayModal(false);
        onClose(!showModal);
    }

    const emitMessage = () => {
        console.log("clicked")
        socket.emit("message-to-user", recipient, "message", (answer) => {
            console.log()
            setModalContent(...modalContent, "message");
        });
    }

    socket.on("private-message", (...args) => {
        console.log(...args);
        setModalContent(...modalContent, args[0]);
    })

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
                    {modalContent}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={emitMessage}>Send</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
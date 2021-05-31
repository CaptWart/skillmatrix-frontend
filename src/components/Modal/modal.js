import Modal from 'react-bootstrap/Modal'
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button  from 'react-bootstrap/Button'

const Modals = (props) => {
    const [show, setShow] = useState(true);
    console.log(props)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
      console.log('setshow: ', props.children)

    useEffect(() => {
      console.log(show)
    }, [show] )

    useEffect(() => {
      setShow(props.children)
      console.log('setshow: ', props.children)
    }, [props.children] )
    useEffect(() => {
        console.log('hit')
    }, [props])
    //console.log(props.children)
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default Modals;
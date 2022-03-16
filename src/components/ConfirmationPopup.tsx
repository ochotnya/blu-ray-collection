import React from "react";
import { Button, Modal } from "react-bootstrap";

interface IPopup {
  handleYes: () => void;
  handleNo: () => void;
  text: string;
  headerText: string;
  show: boolean;
  onHide: () => void;
  variantYes?: string;
  variantNo?: string;
}
function ConfirmationPopup(props: IPopup) {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.headerText}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={props.variantYes} onClick={props.handleYes}>
          Yes
        </Button>
        <Button variant={props.variantNo} onClick={props.handleNo}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationPopup;

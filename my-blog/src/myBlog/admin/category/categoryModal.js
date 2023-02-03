import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function CategoryModal({ title, setTitle, load }) {
  const [show, setShow] = useState(false);

  function saveBtn() {
    axios
      .post("http://localhost:8000/category", { title: title })
      .then((res) => {
        load();
      });
    setTitle("");
    setShow(false);
  }

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        new
      </Button>

      <Modal show={show} onHide={() => setShow(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ангилал Нэмэх</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveBtn}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

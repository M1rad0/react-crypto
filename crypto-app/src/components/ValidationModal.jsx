// src/components/ValidationModal.jsx
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ValidationModal = ({ show, handleClose, handleValidation, email }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleValidation(email, code);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal show={show} backdrop="static" onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Validation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Regardez dans vos mail pour avoir le code de validation
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formCode">
            <Form.Control
              type="text"
              placeholder="Enter validation code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <Button variant="primary" type="submit">
            Valider
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ValidationModal;
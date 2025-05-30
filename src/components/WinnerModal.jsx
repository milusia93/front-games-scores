import { useState } from "react";
import { Modal, ListGroup, Button } from "react-bootstrap";

const WinnerModal = ({ show, onHide, players, initialWinnerId, onSave }) => {
  const [selectedWinner, setSelectedWinner] = useState(initialWinnerId);

  const handleSave = () => {
    onSave(selectedWinner);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Wybierz zwycięzcę</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {players.map(player => (
            <ListGroup.Item
              key={player._id}
              active={selectedWinner === player._id}
              onClick={() => setSelectedWinner(player._id)}
              style={{ cursor: "pointer" }}
            >
              {player.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Anuluj</Button>
        <Button variant="primary" onClick={handleSave} disabled={!selectedWinner}>
          Zapisz
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WinnerModal;
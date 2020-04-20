import React from "react";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";

const PersonDetailsModal = (props) => {
  return (
    <Modal
      className="d-flex justify-content-center align-items-center"
      open={props.modalOpen}
      onClose={() => props.setModalOpen(false)}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          minWidth: 600,
          minHeight: 300,
          border: "none",
          outline: "none",
          borderRadius: 2,
        }}
        className="p-3 shadow"
      >
        <Typography variant="h4" gutterBottom>
          {props.selectedUser.display_name}
        </Typography>
        <Typography
          style={{ color: "#484848" }}
          variant="h5"
          className="mb-4 mt-4"
        >
          Points: {props.selectedUser.points}
        </Typography>
        <Typography
          style={{ color: "#484848" }}
          variant="h5"
          className="mb-4 mt-3"
        >
          Country: {props.selectedUser.country}
        </Typography>
        <Typography
          style={{ color: "#484848" }}
          variant="h5"
          className="mb-4 mt-3"
        >
          Rank: {props.selectedUser.rank}
        </Typography>
      </div>
    </Modal>
  );
};

export default PersonDetailsModal;

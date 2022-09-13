import React from "react";

const Modal = (props) => {
  const { onCancel, onConfirm, title, detail } = props;

  return (
    <button
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
        width: "100%",
        height: "100vh",
        cursor: "default",
      }}
      onClick={onCancel}
    >
      <div
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        <h1>{title}</h1>
        <p className="text-center">{detail}</p>
        <div className="d-flex justify-content-center">
          <button
            className="btn mx-1 btn-sm btn-outline-danger"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="btn mx-1 btn-sm btn-outline-primary"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </button>
  );
};

export default Modal;

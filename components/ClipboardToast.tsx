import React from "react";
import { Toast } from "react-bootstrap";

type ClipboardToastProps = {
  message: string;
  setMessage: (m: string) => void;
  x: number;
  y: number;
};
const ClipboardToast = ({ message, setMessage, x, y }: ClipboardToastProps) => {
  navigator.clipboard.writeText(message);
  if (x + 350 > window.innerWidth) {
    return <></>
  }
  return (
    <Toast
      onClose={() => setMessage("")}
      onClick={() => setMessage("")}
      delay={3000}
      autohide
      style={{ position: "absolute", zIndex: 999, top: y + 30, left: x}}
    >
      <Toast.Header>
        <strong className="me-auto">Clipboard</strong>
      </Toast.Header>
      <Toast.Body>&quot;{message}&quot; copied to clipboard!</Toast.Body>
    </Toast>
  );
};

export default ClipboardToast;

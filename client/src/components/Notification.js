import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function Notification() {
  return (
    <div style={{ position: "absolute" }}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        theme="dark"
        toastStyle={{
          backgroundColor: "var(--primary50)",
          color: "var(--tertiary)",
        }}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        progress
      />
    </div>
  );
}

export default Notification;

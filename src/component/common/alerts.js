import React from "react";

function ErrorAlert(errorMessage) {
  return (
    <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  );
}

export default ErrorAlert;

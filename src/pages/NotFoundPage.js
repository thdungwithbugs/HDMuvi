import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import "./notFoundPage.scss";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="face">
          <div className="band">
            <div className="red" />
            <div className="white" />
            <div className="blue" />
          </div>
          <div className="eyes" />
          <div className="dimples" />
          <div className="mouth" />
        </div>
        <h1>Oops! Not found 404!</h1>
        <Button onClick={() => navigate(`/`)} className='w-auto flex m-auto'>
          Return Home
        </Button>
      </div>
    </>
  );
};

export default NotFoundPage;

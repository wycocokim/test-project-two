import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  //   console.log(posts.results);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(false);

  let navigate = useNavigate();

  const openModal = () => {
    setModalOpen(!modalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (valid) {
      dispatch(
        login({
          email: email,
          loggedIn: true,
        })
      );
      setSuccess(true);
      navigate("/gallery");
    } else {
      alert("please put a valid email");
    }
  };

  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const checkEmail = (e) => {
    setEmail(e.target.value);

    if (regex.test(email) === false) {
      setError("please enter valid email");
      setValid(false);
      console.log(error);
    } else {
      setError("");
      setValid(true);
      return true;
    }
  };

  return (
    <div className="container">
      <h1>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis finibus
        ultricies magna quis dapibus. Aliquam erat volutpat. Praesent gravida
        odio sed nulla tincidunt placerat. Aliquam nec volutpat justo. Aliquam
        condimentum tincidunt nisl. Cras mollis a magna eget ornare. Praesent
        congue quis turpis eu vestibulum. Suspendisse id tempor eros. Ut
        fringilla, nisl sit amet dapibus imperdiet, mauris elit iaculis nisi,
        suscipit bibendum felis dui eu mauris. Aliquam vitae vestibulum erat.
        Sed ac magna felis. Sed vitae urna porta, auctor sem et, ullamcorper
        neque. Sed felis lorem, accumsan tincidunt volutpat nec, tempus ut
        ligula. Proin quis purus at ex placerat pulvinar. Duis porta velit
        ligula, feugiat mattis enim maximus eget. Sed ut lectus porttitor,
        aliquet ligula ac, hendrerit libero.
      </h1>
      <button onClick={openModal}>Login</button>
      <div className={modalOpen ? "modal active" : "modal"}>
        <div className="modal-bg" onClick={closeModal}></div>
        <div className="modal-content">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={checkEmail}
            />

            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;

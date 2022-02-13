import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import "./Home.css";

const Home = () => {
  //   console.log(posts.results);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(false);

  const user = useSelector(selectUser);

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
      console.log(success);
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
    <div className="container home">
      <h1>
        after completing the project i learned how to use state management tool
        like redux, store data on redux and reuse it, creating pagination. most
        challenging part was to create a functionality that you can save the
        pokemon and show the saved pokemon on another page.
      </h1>
      {user ? (
        <h2>{`welcome ${user.email}`}</h2>
      ) : (
        <button className="home-button" onClick={openModal}>
          Login
        </button>
      )}

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

import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const PrivateRoute = () => {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  let history = useHistory();

  function submitHandler(e) {
    if (userName === "SureFire" && password === "HarrysHedgefund") {
      localStorage.setItem("login", true);
      history.push("/home");
    } else {
      document.getElementById("error").style.display = "block";
    }
  }

  if (localStorage.getItem("login") !== "true") {
    return (
      <div Id="Login">
        <Form>
          <Form.Field>
            <label>Username</label>
            <input
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Field>
          <h3 id="error"> Please enter correct credentials </h3>
          <Button type="submit" onClick={submitHandler}>
            Submit
          </Button>
        </Form>
      </div>
    );
  } else {
    history.push("/home");
    return null;
  }
};

export default PrivateRoute;

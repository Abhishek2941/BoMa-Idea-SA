import React from "react";
import { Navbar } from "../src/component/Navbar";
import { withRouter } from "next/router";

const Create = ({ router }) => {
  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const state = formData.get("state");
    const date = new Date(formData.get("date"));

    const User = localStorage.getItem('user')

    const data = await fetch(`/api/project/${User}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, state, date }),
      });

    router.push(`/views?id=${User}`);
  };

  return (
    <div>
      <Navbar /> <br />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Please enter name" /> <br />
        <select name="state">
          <option selected>Propose</option>
          <option>Open</option>
          <option>Closed</option>
        </select> <br />
        <input type="date" name="date" />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default withRouter(Create);

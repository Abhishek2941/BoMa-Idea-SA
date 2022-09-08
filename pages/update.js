import React, { useState, useEffect } from "react";
import Head from "next/head";
import useSwr from "swr";
import toast from "react-hot-toast";
import { server } from "../config";
import { Navbar } from "../src/component/Navbar";
import { withRouter } from "next/router";

const Update = ({ router }) => {
  const fetcher = url => fetch(url).then(r => r.json());
  const { data, error } = useSwr(`/api/project/${router.query.id}`, fetcher);

  const [project, setproject] = useState({})

  useEffect(() => {
    setproject(data?.project);
  }, [data]);



  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const state = formData.get("state");
    const date = new Date(formData.get("date"));
    const User = localStorage.getItem("user");

    console.info("router?.query?.id++ ", date)

    const data = await fetch(`/api/project/${User}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, state, project_id : Number(router?.query?.id || 0), date })
    });
  };

  return (
    <div>
      <Navbar /> <br />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Please enter name" defaultValue={project?.name} /> <br />
        <select name="state">
          <option selected={project?.state === 'Propose'}>Propose</option>
          <option selected={project?.state === 'Open'}>Open</option>
          <option selected={project?.state === 'Closed'}>Closed</option>
        </select>
        <br />
        <input type="date" name="date" defaultValue={new Date(project?.date).toJSON()?.slice(0, 10)} />
        <br />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default withRouter(Update);

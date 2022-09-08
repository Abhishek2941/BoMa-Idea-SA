import React, { useState, useEffect } from "react";
import Head from "next/head";
import useSwr from "swr";
import toast from "react-hot-toast";
import { server } from "../config";
import { Navbar } from "../src/component/Navbar";
import { withRouter } from "next/router";

const viewProject = ({ router }) => {
  const fetcher = url => fetch(url).then(r => r.json());
  const { data, error } = useSwr(`/api/project/${router.query.id}`, fetcher);

  const [project, setproject] = useState(null)

  useEffect(() => {
      if(data?.permit === 'Read'){
          setproject(data?.project);
      }
  }, [data]);



  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const state = formData.get("state");
    const date = new Date(formData.get("date"));
    const User = localStorage.getItem("user");

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
 { project && <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>State</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
              <tr>
                <td>{project?.id}</td>
                <td>{project?.name}</td>
                <td>{project?.state}</td>
                <td>{new Date(project?.date)?.toJSON()?.slice(0, 10)}</td>
              </tr>
        </tbody>
      </table>}
    </div>
  );
};

export default withRouter(viewProject);

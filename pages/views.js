import React, { useState, useEffect } from "react";
import Head from "next/head";
import useSwr from "swr";
import toast from "react-hot-toast";
import { server } from "../config";
import { Navbar } from "../src/component/Navbar";
import { withRouter } from "next/router";

const Views = ({ router }) => {
  const fetcher = url => fetch(url).then(r => r.json());
  const { data, error } = useSwr(`/api/user/${router.query.id}`, fetcher);

  const [hasAccess, sethasAccess] = useState(false);
  const [projects, setprojects] = useState([]);

  useEffect(() => {
    console.info("access++ ", data);
    sethasAccess(data?.find(i => i?.permit === "Create"));
    setprojects(data);
  }, [data]);

  const deleteProject = async id => {
    if (window.confirm("Delete the item?")) {
      try {
        const data = await fetch(`/api/project/${id}`, {
          method: "DELETE"
        });
      } catch (error) {
        console.info(error);
      }
    }
  };

  const updateProject = id => {
    router.push(`/update?id=${id}`);
  };

  const viewProject = id => {
    router.push(`/viewProject?id=${id}`);
  };

  return (
    <div>
      <Navbar /> <br />
      <br />
      <br />
      {hasAccess && (
        <button onClick={() => router.push(`/create`)}>create</button>
      )}{" "}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>State</th>
            <th>Date</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects?.map(({ project, permit }) => {
            return (
              <tr>
                <td>{project?.id}</td>
                <td>{project?.name}</td>
                <td>{project?.state}</td>
                <td>{new Date(project?.date).toJSON().slice(0, 10)}</td>
                {permit === "Read" && (
                  <td>
                    <button onClick={() => viewProject(project?.id)}>
                      View
                    </button>
                  </td>
                )}
                {permit === "Delete" && (
                  <td>
                    <button onClick={() => deleteProject(project?.id)}>
                      Delete
                    </button>
                  </td>
                )}
                {permit === "Update" && (
                  <td>
                    <button onClick={() => updateProject(project?.id)}>
                      Update
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default withRouter(Views);

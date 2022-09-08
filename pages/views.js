import React, { useState, useEffect } from "react";
import useSwr from "swr";
import { Navbar } from "../src/component/Navbar";
import { withRouter } from "next/router";

const Views = ({ router }) => {
  const [hasAccess, sethasAccess] = useState(false);
  const [projects, setprojects] = useState([]);
  const [status, setstatus] = useState("All");
  const [orderByField, setOrderByField] = useState("name");
  const [orderBy, setorderBy] = useState("asc");

  const fetcher = url => fetch(url).then(r => r.json());
  const { data, error } = useSwr(
    `/api/user/${router.query.id}?state=${status}&orderByField=${orderByField}&orderBy=${orderBy}`,
    fetcher
  );

  useEffect(() => {
    sethasAccess(data?.find(i => i?.permit === "Create"));
    setprojects(data);
  }, [data]);

  useEffect(() => {
    if(router.query.id){
      fetchAllProjects()
    }
  },[status,orderByField,orderBy,router.query.id])

  const fetchAllProjects = async () => {
    try {
      const data = await fetch(`/api/user/${router.query.id}?state=${status}&orderByField=${orderByField}&orderBy=${orderBy}`, {
        method: "GET"
      }).json()
      setprojects(data);
    } catch (error) {
    }
  }

  const deleteProject = async id => {
    const User = localStorage.getItem('user')
    if (window.confirm("Delete the item?")) {
      try {
        const data = await fetch(`/api/project/${User}?project_id=${id}`, {
          method: "DELETE",
        });
      } catch (error) {
      } 
      finally {
        fetchAllProjects()
      }
    }
  };

  const updateProject = id => {
    router.push(`/update?id=${id}`);
  };

  const viewProject = id => {
    router.push(`/ViewProject?id=${id}`);
  };

  const onChangeStatus = e => {
    setstatus(e?.target?.value);
  };

  const onChangeOrderField = e => {
    setOrderByField(e?.target?.value);
  };

  const onChangeOrder = e => {
    setorderBy(e?.target?.value);
  };

  return (
    <div>
      <Navbar state={true} /> <br />
      <br />
      <br />

      {/* we have enable the create button base on the project permission from the access table where user have the permission of create any of the project */}
      {/* {hasAccess && (
        <button onClick={() => router.push(`/create`)}>create</button>
      )} */}

      {/* we make this button accessable for all the user because the permission of the create will assign to any perticular project and it's kind of infinity loop because without a create button user can't create any project and without creating a project we can't assign a permit read/delete/create/update */}
      <button onClick={() => router.push(`/create`)}>create</button>
      <br />
      <br />
      <br />
      <div style={{ display :'flex', justifyContent : 'start' }}>
        <div>
          <label>Status :- </label>
          <select name="state" onChange={onChangeStatus} value={status} >
            <option selected>All</option>
            <option>Propose</option>
            <option>Open</option>
            <option>Closed</option>
          </select>
        </div>
    
        <div>
          <label>Order by field name :- </label>
          <select name="orderByField" onChange={onChangeOrderField} value={orderByField} >
            <option value="name" selected={orderByField === 'name' ? true : false}>Name</option>
            <option value="date" selected={orderByField === 'date' ? true : false}>Date</option>
          </select>
        </div>

        <div>
        <label>Order by :- </label>
          <select name="orderBy" onChange={onChangeOrder} value={orderBy} >
            <option value="asc" selected={orderBy === 'asc' ? true : false}>Asc</option>
            <option value="desc" selected={orderBy === 'desc' ? true : false}>Desc</option>
          </select>
        </div>
      </div>
      <br />
      <br />
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
          {projects && projects?.map(({ project, permit }) => {
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

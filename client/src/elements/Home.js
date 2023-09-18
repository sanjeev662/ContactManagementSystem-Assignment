import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";
import { adddata, deldata } from "./context/ContextProvider";
import { useContext } from "react";
import { updatedata } from "./context/ContextProvider";
import { url } from "../utils/Constants";

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  const { udata, setUdata } = useContext(adddata);
  const { updata, setUpdata } = useContext(updatedata);
  const { dltdata, setDLTdata } = useContext(deldata);


  const [sort, setSort] = useState("new");
  const [search, setSearch] = useState("");

  //get all user Contact data
  const getdata = async () => {
    const res = await fetch(
      `${url}/api/contacts?search=${search}&sort=${sort}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (res.status === 422 || !data) {
      alert("error");
    } else {
      setUserdata(data);
    }
  };

  //delete user Contact by ID
  const deleteuser = async (id) => {
    const res2 = await fetch(`${url}/api/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deletedata = await res2.json();

    if (res2.status === 422 || !deletedata) {
      alert("error");
    } else {
      alert("user deleted");
      setDLTdata(deletedata);
      getdata();
    }
  };

  useEffect(() => {
    getdata();
  }, [search, sort]);

  return (
    <>
      {udata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{udata.name}</strong> added successfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {updata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong> {updata.name}</strong> updated successfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {dltdata ? (
        <>
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong> {dltdata.name} </strong> deleted successfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="mt-5">
        <div className="container">
          {/* search add btn */}
          <div className="search_add mt-4 pb-2 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search by ContactName"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success" className="search_btn">
                  Search
                </Button>
              </Form>
            </div>
            <div className="filter_newold" style={{ display: "flex" }}>
              <h4>Sort By :</h4>
              <Dropdown className="text-center">
                <Dropdown.Toggle
                  className="dropdown_btn"
                  style={{ marginLeft: "10px", maxHeight: "35px" }}
                  id="dropdown-basic"
                >
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSort("incname")}>
                    Name Increasing Order
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("decname")}>
                    Name Decreasing Order
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("new")}>
                    Contact Created New First
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>
                    Contact Created Old first
                  </Dropdown.Item> 
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="add_btn">
              <NavLink to="/register" className="btn btn-primary">
                <i class="fa-solid fa-plus"></i>&nbsp; Add Contact
              </NavLink>
            </div>
          </div>

          <table class="table">
            <thead>
              <tr className="table-dark">
                {/* <th scope="col">Id</th> */}
                <th scope="col">ContactName</th>
                <th scope="col">SPOC</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Created Date</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.map((element, id) => {
                return (
                  <>
                    <tr>
                      <td>{element.name}</td>
                      <td>{element.spoc}</td>
                      <td>{element.email}</td>
                      <td>{element.mobile}</td>
                      <td>
                        {
                          new Date(element.datecreated)
                            .toISOString()
                            .split("T")[0]
                        }
                      </td>

                      <td className="d-flex justify-content-between">
                        <NavLink to={`view/${element._id}`}>
                          <button className="btn btn-success">
                            <RemoveRedEyeIcon />
                          </button>
                        </NavLink>
                        <NavLink to={`edit/${element._id}`}>
                          <button className="btn btn-primary">
                            <CreateIcon />
                          </button>
                        </NavLink>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteuser(element._id)}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;

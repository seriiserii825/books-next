import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import Form from "../../components/admin/form/Form";
import AdminTable from "../../components/admin/form/AdminTable";
import { useRouter } from "next/router";
import Link from "next/link";
import Preloader from "../../components/animation/Preloader";
import { Transition, animated } from "react-spring";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sort_field, setSortField] = useState("id");
  const [sort_direction, setSortDirection] = useState("asc");
  const [search, setSearch] = useState("");

  const getData = (
    sort_field = "updated_at",
    sort_direction = "asc",
    search = ""
  ) => {
    axios
      .get(
        "/category?sort_field=" +
          sort_field +
          "&sort_direction=" +
          sort_direction +
          "&search=" +
          search
      )
      .then((res) => {
        setData(res.data.data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response, "err.response");
        setLoading(false);
      });
  };
  const deleteItem = (id) => {
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      axios
        .delete("/category/" + id)
        .then((res) => {
          window.location = router.pathname;
        })
        .catch((err) => {
          console.log(err.response, "err.response");
        });
    }
  };
  const sortTable = (field) => {
    setLoading(true);
    setSortDirection(sort_direction === "asc" ? "desc" : "asc");
    setSortField(field);
  };
  const formatDate = (date) => {
    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };

    return new Intl.DateTimeFormat("en", options).format(new Date(date));
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setLoading(true);
  };

  useEffect(() => {
    setLoading(true);
    getData(sort_field, sort_direction, search);
  }, [sort_field, sort_direction, search]);

  return (
    <AdminLayout>
      <Form label="List Categories">
        <AdminTable>
          <div className="search">
            <label htmlFor="search">Search:</label>
            <input type="text" value={search} onChange={searchHandler} />
          </div>
          {loading ? (
            <Preloader />
          ) : (
            <Transition
              items={!loading}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
              delay={200}
            >
              {(styles, item) =>
                item && (
                  <animated.div style={styles}>
                    <div>
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <a href="#" onClick={() => sortTable("id")}>
                                #ID
                              </a>
                              {sort_direction === "asc" ? (
                                <span>&uarr;</span>
                              ) : (
                                <span>&darr;</span>
                              )}
                            </th>
                            <th>
                              <a href="#" onClick={() => sortTable("name")}>
                                Name
                              </a>
                              {sort_direction === "asc" ? (
                                <span>&uarr;</span>
                              ) : (
                                <span>&darr;</span>
                              )}
                            </th>
                            <th>
                              <a href="#" onClick={() => sortTable("status")}>
                                Status
                              </a>
                              {sort_direction === "asc" ? (
                                <span>&uarr;</span>
                              ) : (
                                <span>&darr;</span>
                              )}
                            </th>
                            <th>
                              <a
                                href="#"
                                onClick={() => sortTable("updated_at")}
                              >
                                Updated At
                              </a>
                              {sort_direction === "asc" ? (
                                <span>&uarr;</span>
                              ) : (
                                <span>&darr;</span>
                              )}
                            </th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.length
                            ? data.map((item, index) => {
                                let updated_at = formatDate(item.updated_at);
                                return (
                                  <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                      <span
                                        className={
                                          item.status === 1
                                            ? "badge badge--success"
                                            : "badge badge--danger"
                                        }
                                      >
                                        {item.status}
                                      </span>
                                    </td>
                                    <td>{updated_at}</td>
                                    <td>
                                      <Link href={`/category/` + item.id}>
                                        <a className="btn btn--success">Edit</a>
                                      </Link>
                                      <button
                                        className="btn btn--danger"
                                        onClick={() => deleteItem(item.id)}
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            : null}
                        </tbody>
                      </table>
                    </div>
                  </animated.div>
                )
              }
            </Transition>
          )}
        </AdminTable>
      </Form>
    </AdminLayout>
  );
}

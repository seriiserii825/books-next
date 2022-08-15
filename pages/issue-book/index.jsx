import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import Form from "../../components/admin/form/Form";
import AdminTable from "../../components/admin/form/AdminTable";
import { useRouter } from "next/router";
import Link from "next/link";
import Preloader from "../../components/animation/Preloader";
import { Transition, animated } from "react-spring";
import formatDate from "../../helpers/format-date";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = () => {
    axios
      .get("/issue-book")
      .then((res) => {
        // console.log(res.data.data, "res.data.data");
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
        .delete("/issue-book/" + id)
        .then((res) => {
          window.location = router.pathname;
        })
        .catch((err) => {
          console.log(err.response, "err.response");
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  return (
    <AdminLayout>
      <Form label="List Categories">
        <AdminTable>
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
                            <th>Id</th>
                            <th>Category</th>
                            <th>Book</th>
                            <th>User info</th>
                            <th>Total days</th>
                            <th>Issue Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.length
                            ? data.map((item, index) => {
                                let created_at = formatDate(item.created_at);
                                return (
                                  <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.category}</td>
                                    <td>{item.book}</td>
                                    <td>
                                      <span>{item.client_name}</span>
                                      <span>{item.client_email}</span>
                                    </td>
                                    <td>{item.days_issued} days</td>
                                    <td>{created_at}</td>
                                    <td>
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

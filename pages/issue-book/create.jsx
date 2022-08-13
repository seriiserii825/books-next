import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "../../components/admin/form/Form";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";

export default function Create() {
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const [error_message, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [category_id, setCategoryId] = useState("");
  const [book_id, setBookId] = useState("");
  const [books, setBooks] = useState([]);
  const [clients, setClients] = useState([]);
  const [client_id, setClientId] = useState("");
  const [days_issued_options, setDaysIssuedOptions] = useState([
    { value: "7", label: "7 days" },
    { value: "14", label: "14 days" },
    { value: "30", label: "30 days" },
  ]);
  const [days_issued, setDaysIssued] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    const data = {
      category_id,
      book_id,
      client_id,
      days_issued,
      is_returned: false,
    };

    axios
      .post("/issue-book", data)
      .then((res) => {
        router.push("/issue-book");
      })
      .catch((err) => {
        console.log(err.response.data.message, "err.response.data.message");
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        }

        if (err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      });
  };

  function categoryHandler(e) {
    setCategoryId(e.target.value);
  }

  function bookHandler(e) {
    setBookId(e.target.value);
  }

  function clientHandler(e) {
    setClientId(e.target.value);
  }

  function daysIssuedHandler(e) {
    setDaysIssued(e.target.value);
  }

  function getCategory() {
    axios
      .get("/category")
      .then((res) => {
        setCategories(res.data.data);
        setCategoryId(res.data.data[0].id);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }

  function getBooks() {
    setBooks([]);
    axios
      .get("/book_by_category?category_id=" + category_id)
      .then((res) => {
        setBooks(res.data.data);
        setBookId(res.data.data[0].id);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }

  function getClients() {
    axios
      .get("/client")
      .then((res) => {
        setClients(res.data.data);
        setClientId(res.data.data[0].id);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }

  useEffect(() => {
    getCategory();
    getClients();
    setDaysIssued(days_issued_options[0].value);
  }, []);

  useEffect(() => {
    if (category_id) {
      getBooks();
    }
  }, [category_id]);

  return (
    <AdminLayout>
      <Form label="Add Issue Book" error_message={error_message}>
        <div className="form__flex">
          <div className="form__item">
            <label className="form__label" htmlFor="category_id">
              Category
            </label>
            <select
              name="category_id"
              id="category_id"
              value={category_id}
              onChange={categoryHandler}
            >
              {categories.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form__item">
            <label className="form__label" htmlFor="book_id">
              Books
            </label>
            <select
              name="book_id"
              id="book_id"
              value={book_id}
              onChange={bookHandler}
            >
              {books.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="form__flex">
          <div className="form__item">
            <label className="form__label" htmlFor="client_id">
              Clients
            </label>
            <select
              name="client_id"
              id="client_id"
              value={client_id}
              onChange={clientHandler}
            >
              {clients.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name} - ({item.email})
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form__item">
            <label className="form__label" htmlFor="days_issued">
              {" "}
              Days issued{" "}
            </label>
            <select
              name="days_issued"
              id="days_issued"
              value={days_issued}
              onChange={daysIssuedHandler}
            >
              {days_issued_options.map((item) => {
                return (
                  <option value={item.value} key={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button className="btn" onClick={onSubmit}>
          Submit
        </button>
      </Form>
    </AdminLayout>
  );
}

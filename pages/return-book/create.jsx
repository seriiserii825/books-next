import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "../../components/admin/form/Form";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";

export default function Create() {
  const router = useRouter();
  const [error_message, setErrorMessage] = useState("");
  const [client_books, setClientBooks] = useState([]);
  const [client_book_id, setClientBookId] = useState("");
  const [issues, setIssues] = useState([]);
  const [issue_id, setIssueId] = useState("");
  const [clients, setClients] = useState([]);
  const [client_id, setClientId] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(client_book_id, "client_book_id");
    // const data = {
    //   issue_id,
    //   client_id,
    //   is_returned: false,
    // };

    // axios
    //   .post("/issue-book", data)
    //   .then((res) => {
    //     router.push("/issue-book");
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data.message, "err.response.data.message");
    //     if (err.response && err.response.data && err.response.data.message) {
    //       setErrorMessage(err.response.data.message);
    //     }

    //     if (err.response.data && err.response.data.errors) {
    //       setErrors(err.response.data.errors);
    //     }
    //   });
  };

  function bookHandler(e) {
    setClientBookId(parseInt(e.target.value));
  }

  function clientHandler(e) {
    // console.log(e.target.value, "e.target.value");
    setClientId(e.target.value);
  }

  function getUniqueBy(arr, prop) {
    const set = new Set();
    return arr.filter((o) => !set.has(o[prop]) && set.add(o[prop]));
  }

  function getIssues() {
    axios
      .get("/issue-book")
      .then((res) => {
        const issues = res.data.data;
        setIssues(issues);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }

  function clientsFromIssues() {
    console.log(client_id, "cl");
    let clients = issues.map((issue) => {
      return {
        client_id: issue.client_id,
        client_name: issue.client_name,
      };
    });
    const unique_clients = getUniqueBy(clients, "client_id");
    setClients(unique_clients);
  }

  function booksFromIssues() {
    const books = issues.map((issue) => {
      return {
        book_id: issue.book_id,
        book: issue.book,
        client_id: issue.client_id,
      };
    });

    let filtered_books = books.filter((book) => {
      return book.client_id === +client_id;
    });

    // console.log(filtered_books, "filtered_books");
    setClientBooks(filtered_books);
  }

  function getIssueByClientIdAndBookId() {
    return issues.find((issue) => {
      return (
        issue.client_id === +client_id && issue.book_id === +client_book_id
      );
    });
  }

  useEffect(() => {
    getIssues();
  }, []);

  useEffect(() => {
    if (clients.length) {
      // console.log(clients, "clients");
      setClientId(clients[0].client_id);
    }
  }, [clients]);

  useEffect(() => {
    clientsFromIssues();
  }, [issues]);

  useEffect(() => {
    if (client_id) {
      booksFromIssues();
    }
  }, [client_id]);

  useEffect(() => {
    if (client_books.length) {
      setClientBookId(client_books[0].book_id);
    }
  }, [client_books]);

  useEffect(() => {
    if (client_book_id && client_id) {
      const issue = getIssueByClientIdAndBookId();
      console.log(issue, "issue");
      // setIssueId(issue.id);
    }
  }, [client_book_id, client_id]);

  return (
    <AdminLayout>
      <Form label="Add Issue Book" error_message={error_message}>
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
              {clients &&
                clients.map((item) => {
                  return (
                    <option value={item.client_id} key={item.client_id}>
                      {item.client_name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form__item">
            <label className="form__label" htmlFor="client_book_id">
              Books
            </label>
            <select
              name="client_book_id"
              id="client_book_id"
              value={client_book_id}
              onChange={bookHandler}
            >
              {client_books.map((item, index) => {
                return (
                  <option value={item.book_id} key={index}>
                    {item.book}
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

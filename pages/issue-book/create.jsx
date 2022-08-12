import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "../../components/admin/form/Form";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";

export default function Create() {
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category_id, setCategoryId] = useState("");
  const [book_id, setBookId] = useState("");
  const [user_id, setUserId] = useState("");
  const [days_issued, setDaysIssued] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { category_id, book_id, user_id, days_issued };

    axios
      .post("/issue-book", data)
      .then((res) => {
        console.log(res, "res");
        // router.push("/category");
      })
      .catch((err) => {
        if (err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      });
  };

  function categoryHandler(e) {
    setCategoryId(e.target.value);
  }

  function getCategory() {
    axios
      .get("/category")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }

  useEffect(() => {
    console.log(category_id, "category_id");
  }, [category_id]);

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <AdminLayout>
      <Form label="Add Issue Book">
        <div className="form__flex">
          <div className="form__item">
            <label className="form__label" htmlFor="status">
              Category
            </label>
            <select
              name="category_id"
              id="category_id"
              value={category_id}
              onChange={categoryHandler}
            >
              {categories.map((item) => {
                return <option value={item.id} key={item.id}>{item.name}</option>;
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

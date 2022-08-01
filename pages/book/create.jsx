import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "../../components/admin/form/Form";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";

export default function Create() {
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category_id, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState(1);

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const categoriesHandler = (e) => {
    setCategoryId(e.target.value);
  };
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  const amountHandler = (e) => {
    setAmount(e.target.value);
  };
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { name, status };
    axios
      .post("/category", data)
      .then((res) => {
        setErrors([]);
        setName("");
        router.push("/category");
      })
      .catch((err) => {
        if (err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      });
  };

  let getBooks = () => {
    axios
      .get("/book_create")
      .then((res) => {
        setCategories(res.data.categories);
        setCategoryId(res.data.categories[0]._id);
      })
      .catch((err) => {
        console.log(err, "er");
      });
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <AdminLayout>
      <Form label="Add Category">
        <div className="form__flex">
          <div
            className={
              errors.name ? "form__item form__item--error" : "form__item"
            }
          >
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              onChange={nameHandler}
              type="text"
              placeholder="Enter name..."
              value={name}
            />
            <p className="text-error">{errors.name && errors.name}</p>
          </div>
          <div
            className={
              errors.name ? "form__item form__item--error" : "form__item"
            }
          >
            <label className="form__label" htmlFor="categories">
              Categories
            </label>
            <select
              id="categories"
              value={category_id}
              onChange={categoriesHandler}
            >
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
            <p className="text-error">{errors.name && errors.name}</p>
          </div>
        </div>
        <div className="form__flex">
          <div
            className={
              errors.name ? "form__item form__item--error" : "form__item"
            }
          >
            <label className="form__label" htmlFor="description">
              Description
            </label>
            <textarea
              onChange={descriptionHandler}
              value={description}
            ></textarea>
            <p className="text-error">
              {errors.description && errors.description}
            </p>
          </div>
          <div
            className={
              errors.name ? "form__item form__item--error" : "form__item"
            }
          >
            <label className="form__label" htmlFor="amount">
              Amount
            </label>
            <input onChange={amountHandler} value={amount} />
            <p className="text-error">{errors.amount && errors.amount}</p>
          </div>
        </div>

        <div className="form__flex">
          <div className="form__item">
            <label className="form__label" htmlFor="status">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={status}
              onChange={statusHandler}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
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

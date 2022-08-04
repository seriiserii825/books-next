import { useEffect, useState } from "react";
import AdminCard from "../components/admin/ui/AdminCard";
import AdminLayout from "../layouts/AdminLayout";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [categoryCount, setCategoryCount] = useState(0);
  const [book_count, setBookCount] = useState(0);
  const getCategory = () => {
    axios
      .get("/category_count")
      .then((res) => {
        setCategoryCount(res.data.data);
      })
      .catch((err) => {
        console.log(err.response, "err.response");
      });
  };
  function getBookCount(){
    axios
      .get("/book_count")
      .then((res) => {
        setBookCount(res.data.data);
      })
      .catch((err) => {
        console.log(err.response, "err.response");
      });
  }
  useEffect(() => {
    getCategory();
  }, [categoryCount]);

  useEffect(() => {
    getBookCount();
  }, [book_count]);
  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className="admin-layout__wrap">
          <div className="admin-layout__item">
            <AdminCard
              title="Categories"
              number={categoryCount}
              bg="green"
              link="/category"
            />
          </div>
          <div className="admin-layout__item">
            <AdminCard
              title="Books"
              number={book_count}
              bg="blue"
              link="/book"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

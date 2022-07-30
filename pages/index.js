import { useEffect, useState } from "react";
import AdminCard from "../components/admin/ui/AdminCard";
import AdminLayout from "../layouts/AdminLayout";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [categoryCount, setCategoryCount] = useState(0);
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
  useEffect(() => {
    getCategory();
  }, [categoryCount]);
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
        </div>
      </div>
    </AdminLayout>
  );
}

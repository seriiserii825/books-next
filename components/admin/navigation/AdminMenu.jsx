import React from "react";
import AdminMenuItem from "./AdminMenuItem";

export default function AdminMenu() {
  return (
    <ul className="admin-menu">
      <AdminMenuItem
        label="Dashboard"
        paths={["/"]}
        icon="/svg/dashboard.svg"
        url="/"
        link={true}
      ></AdminMenuItem>
      <AdminMenuItem
        label="Category"
        paths={["/category", "/category/create"]}
        icon="/svg/file-plus.svg"
        items={[{ url: "/category/create" }, { url: "/category" }]}
      />
      <AdminMenuItem
        label="Book"
        paths={["/book/create", "/book"]}
        icon="/svg/book.svg"
        items={[{ url: "/book/create" }, { url: "/book" }]}
      />
      <AdminMenuItem
        label="Client"
        paths={["/client/create", "/client"]}
        icon="/svg/user.svg"
        items={[{ url: "/client/create" }, { url: "/client" }]}
      />
      <AdminMenuItem
        label="Issue Book"
        paths={["/issue-book", "/issue-book/create"]}
        icon="/svg/user.svg"
        items={[{ url: "/issue-book/create" }, { url: "/issue-book" }]}
      />
    </ul>
  );
}

import React from "react";

const Pagination = ({ postsPerpage, totalPosts }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerpage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;

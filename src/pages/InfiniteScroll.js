// import React from "react";

// const InfiniteScroll = () => {
//   return <div>The code needs to be written here</div>;
// };

// export default InfiniteScroll;

import React, { useState, useEffect } from "react";
import "./infiniteScroll.css";

function InfiniteScroll() {
  const [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData(page) {
    fetch(`https://randomuser.me/api/?page=${page}&results=10`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject({
            status: res.status,
            statusText: res.startText,
          });
        }
      })
      .then((res) => {
        if (page > 1) {
          let resultAr = [...data, ...res.results];
          setData(resultAr);
        } else {
          setData(res.results);
        }
        setLoader(false);
      })
      .catch((err) => console.log("Error,with message:", err.statusText));
  }
  function loadMoreHandle(e) {
    console.log(e);
    let bottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
    if (bottom) {
      let page_ = page + 1;
      fetchData(page_);
      setLoader(true);
      setPage(page_);
    }
  }
  return (
    <div onScroll={loadMoreHandle} className="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">gender</th>
            <th scope="col">profile</th>
          </tr>
        </thead>
        <tbody>
          {data.map((itm) => {
            return (
              <tr>
                <td>{itm.name["first"]}</td>
                <td>{itm.gender}</td>
                <td>
                  <img src={itm.picture["thumbnail"]} />
                </td>
              </tr>
            );
          })}
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </tbody>
      </table>
    </div>
  );
}
export default InfiniteScroll;

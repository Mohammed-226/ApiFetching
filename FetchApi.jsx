import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import ReactPaginate from "react-paginate";

const FetchApi = () => {
  let [state, setState] = useState([]);
  let [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    let fetchComments = async () => {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      console.log(data);
      try {
        setState(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, []);
  let usersPerPage = 10;
  let pagesVisited = pageNumber * usersPerPage;
  let displayUser = state
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map(x => {
      return (
        <tr className="bg-gray-200">
          <td className="border-2 border-black">{x.id}</td>
          <td className="border-2 border-black ">{x.title}</td>
          <td className="border-2 border-black">
            {x.completed === true ? "True" : "False"}
          </td>
        </tr>
      );
    });

  let pageCount = Math.ceil(state.length / usersPerPage);
  let changePage = ({ selected }) => {
    setPageNumber(selected);
  };
let initialPage = ({ selected }) => {
    if ((selected = 0.01)) {
      return setPageNumber(selected);
    }
  };

  let finalPage = ({ selected }) => {
    if ((selected = 19)) {
      return setPageNumber(selected);
    }
  };

  return (
    <Fragment>
      <table className="border border-black border-collapse ml-[390px] mt-20">
        <thead className=" bg-yellow-200">
          <th className="border-2 border-black ">Id</th>
          <th className="border-2 border-black ">Title</th>
          <th className="border-2 border-black ">Complted</th>
        </thead>
        <tbody>{displayUser}</tbody>
      </table>
      <div className="relative">
        <ReactPaginate
          previousLable={"Previous"}
          nextLable={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          className="flex ml-[600px] bg-slate-300 w-[260px] mt-7 rounded"
        />
      </div>
 <div className="absolute ml-[700px]">
        <button
          className="relative bg-slate-500 rounded w-[60px]"
          onClick={initialPage}
        >
          First
        </button>
        <button
          className="relative ml-4 bg-slate-500 rounded w-[60px]"
          onClick={finalPage}
        >
          Last
        </button>
      </div>
    </Fragment>
  );
};

export default FetchApi;

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
  // let lastPage = pageCount[pageCount.length - 1];
  let usersPerPage = 10;
  let pagesVisited = pageNumber * usersPerPage;
  let displayUser = state
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map(x => {
      return (
        <tr className="bg-gray-400 text-center">
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
      <h1 className="ml-[45%] mt-10 text-2xl relative">FETCH API</h1>
      <table className="border border-black border-collapse ml-[390px] mt-10">
        <thead className=" bg-yellow-500">
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
          className="flex ml-[560px]  w-[260px] mt-7 space-x-3"
        />
      </div>
      <div className="absolute ml-[700px]">
        <button
          className="relative bg-slate-500 rounded w-[60px] border-2"
          onClick={initialPage}
        >
          First
        </button>
        <button
          className="relative ml-4 bg-slate-500 rounded w-[60px] border-2"
          onClick={finalPage}
        >
          Last
        </button>
      </div>
    </Fragment>
  );
};

export default FetchApi;


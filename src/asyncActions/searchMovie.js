import { urlOptins } from "../utils/utils";

import { FILTERS__TYPE } from "../utils/utils";

export const searchMovie = (token, currentPage, movieName) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    return async (dispatch) => {
      const { basisURL, ru, search, movie } = urlOptins;
      const data = await fetch(
        `${basisURL}/${search}/${movie}?query=${movieName}&include_adult=true&${ru}-RU&page=${currentPage}`,
        options
      );

      const { results, total_pages } = await data.json();
      dispatch({
        type: FILTERS__TYPE.isActivefilmsList,
        filmsList: results,
      });

      dispatch({
        type: FILTERS__TYPE.updateTotalPage,
        totalPages: total_pages,
      });
    };
  } catch (err) {
    console.log(`moviesList`, err);
  }
};

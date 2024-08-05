import { apiGetFavorit } from "../fetchs/apiGetFavorit";
import { FILTERS__TYPE, urlOptins } from "../utils/utils";

export const getSortFilms = async (token, sort, currentPage, accountId) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return async (dispatch) => {
    try {
      const {
        movie,
        ru,
        top_rated,
        popular,
        basisURL,
        account,
        favorite,
        movies,
      } = urlOptins;
      let request = "";

      if (sort === 1)
        request += `${basisURL}/${movie}/${popular}?${ru}-RU&page=${currentPage}`;
      else if (sort === 2)
        request += `${basisURL}/${movie}/${top_rated}?${ru}-RU&page=${currentPage}`;
      else if (sort === 3)
        request += `${basisURL}/${account}/${accountId}/${favorite}/${movies}?${ru}-RU&page=${currentPage}`;

      const data = await fetch(request, options);

      if (data.ok) {
        const sortFilms = await data.json();

        const newResults = sortFilms.results.map((movie) => ({
          ...movie,
          checked: false,
        }));
        const getFavorits = await apiGetFavorit(token, accountId);

        newResults.filter(async (movie) => {
          getFavorits.results.some((favorit) => {
            return movie.id === favorit.id ? (movie.checked = true) : false;
          });
        });

        if (newResults) {
          dispatch({
            type: FILTERS__TYPE.updateTotalPage,
            totalPages: sortFilms.total_pages,
          });
          dispatch({
            type: FILTERS__TYPE.isActivefilmsList,
            filmsList: newResults,
          });
        }
      } else {
        console.log("Вы не авторизавоны!!! *чтобы получить фильмы");
      }
    } catch (err) {
      console.log(`errFetchFilmsSort`, err);
    }
  };
};

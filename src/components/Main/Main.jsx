import { Box } from "@mui/material";
import { useEffect } from "react";

import { FILTERS__TYPE } from "../../utils/utils";
import MultiActionAreaCard from "../FilmCard/FilmCard";
import Filters from "../Filters/Filters";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getSortFilms } from "../../asyncActions/getSortFilms";

export function Main() {
  const filtersState = useSelector((state) => state.filters.filters);
  const filmsList = useSelector((state) => state.filters.filters.filmsList);
  const token = useSelector((state) => state.user.user.token);
  const accountId = useSelector((state) => state.user.user.id);
  const dispatch = useDispatch();

  function changeChecked(checked, id) {
    const updatedFilmsList = filmsList.map((movie) => {
      return movie.id === id ? { ...movie, checked: checked } : movie;
    });
    dispatch({
      type: FILTERS__TYPE.isActivefilmsList,
      filmsList: updatedFilmsList,
    });
  }

  useEffect(() => {
    try {
      if (!filtersState.movieName) {
        (async function getFilms() {
          dispatch(
            await getSortFilms(
              token,
              filtersState.isActiveSelect,
              filtersState.isActiveCurrentPage,
              accountId
            )
          );
        })();
      }
    } catch (err) {
      console.log("errFetchFilmsSort", err);
    }
  }, [
    token,
    filtersState.isActiveSelect,
    filtersState.isActiveCurrentPage,
    dispatch,
    filtersState.movieName,
    filtersState.isActiveTotalPages,
  ]);

  return (
    <>
      <Header />
      <Box
        sx={{
          marginTop: "100px",
          display: "flex",
        }}
      >
        <Filters />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "100%",
          }}
        >
          {filmsList.map((film) => (
            <MultiActionAreaCard
              key={film.id}
              id={film.id}
              title={film.title}
              rating={film.vote_average.toFixed(1)}
              image={film}
              checked={film.checked}
              onChangeChecked={changeChecked}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}

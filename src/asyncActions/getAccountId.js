import { getedId } from "../store/userReducer";
import { urlOptins } from "../utils/utils";

export const apiAccountId = async (token) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return async (dispatch) => {
    try {
      const { basisURL, account } = urlOptins;
      const response = await fetch(`${basisURL}/${account}`, options);

      if (response.ok) {
        const { id } = await response.json();
        console.log(`Верно)!`);
        dispatch(getedId(id));
      } else {
        throw new Error("Ошибка запроса userId");
      }
    } catch (err) {
      console.log("errFetch", err);
    }
  };
};

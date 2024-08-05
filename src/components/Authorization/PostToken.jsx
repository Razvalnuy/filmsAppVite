import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { USER_TYPE, tokenVerification } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { apiAccountId } from "../../asyncActions/getAccountId";

export default function PostToken() {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  console.log(
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2M1ZDI3Y2UzMGNhYjJiYWEwYTBiN2MxMGM2NDc2YSIsInN1YiI6IjY2M2JmNjQ3MWEzZDAyYTE0MDc4MDUwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2grBVV_YHSHRbl1ouPqOvXu5w3-HV5FjJ2Y5HMbXy0s"
  );

  const handleClose = () => setOpen(false);

  async function checkToken(event) {
    const token = event.target.value;

    setValue(token);

    if (token === tokenVerification) {
      dispatch({ type: USER_TYPE.token, token: token });

      dispatch(await apiAccountId(token));
    } else setOpen(true);
  }

  return (
    <Fragment>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log("post", email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Введите токен</DialogTitle>
        <DialogContent>
          <TextField
            error={value !== tokenVerification}
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="Токен"
            type="text"
            fullWidth
            variant="standard"
            onChange={checkToken}
          />
        </DialogContent>
        <DialogActions>
          <Link to="/getToken">
            <Button onClick={handleClose}>Отмена</Button>
          </Link>
          {value !== tokenVerification ? null : (
            <Link to="/main">
              <Button type="submit">Ок</Button>
            </Link>
          )}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

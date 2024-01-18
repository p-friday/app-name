import { useCookies } from "react-cookie";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CreateNewSchedule from "../Schedule/CreateNewSchedule";

const Home = () => {
  const [cookies, ,] = useCookies(["user"]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {cookies.user && (
        <>
          <div className="homeBody">
            <TableContainer
              style={{
                justifyContent: "center",
                justifyItems: "center",
                backgroundColor: "#1D3557",
              }}
              sx={{ width: "100%", height: "20%" }}
              component={Paper}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      style={{
                        backgroundColor: "#1D3557",
                        color: "#F1FAEE",
                        fontStyle: "bold",
                        fontSize: "50px",
                      }}
                      align="center"
                    >
                      Welcome user!
                    </TableCell>
                  </TableRow>
                  <div>
                    <button onClick={handleClickOpen}>
                      Create New Schedule
                    </button>
                    <Link to="/myschedules">My Schedules</Link>
                    <Link to="/browse">Browse Public Schedules</Link>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-title"
                      maxWidth="md"
                      fullWidth
                    >
                      <DialogTitle id="form-dialog-title">
                        Create New Schedule
                      </DialogTitle>
                      <DialogContent>
                        <CreateNewSchedule />
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
      {!cookies.user && (
        <>
          <div className="NotExist">
            <b>You must be logged in</b>
          </div>
          <Link to="/">home</Link>
        </>
      )}
    </>
  );
};

export default Home;

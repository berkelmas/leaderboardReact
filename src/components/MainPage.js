import React, { useEffect, useState } from "react";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
import InfoIcon from "@material-ui/icons/Info";
import Modal from "@material-ui/core/Modal";

import { getAllLeaderboard } from "../services/leaderboard-service";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const MainPage = () => {
  const [pageSkip, setPageSkip] = useState(0);
  const [totalNumber, setTotalNumber] = useState(0);
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const classes = useStyles();
  useEffect(() => {
    getAllLeaderboard(pageSkip, pageSkip + 9).then((res) => {
      setRows(res.data.result);
      setTotalNumber(res.data.totalNumber);
    });
  }, [pageSkip]);

  return (
    <>
      <Paper style={{ padding: "25px" }} elevation={4}>
        <Typography variant="h4" gutterBottom>
          Leaderboard
        </Typography>
        <Typography
          style={{ color: "#767676" }}
          variant="subtitle1"
          className="mb-4"
        >
          Here you can view all leaderboard by page.
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Display Name</TableCell>
                <TableCell align="left">Score</TableCell>
                <TableCell align="left">Rank</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{row.display_name}</TableCell>
                  <TableCell align="left">{row.points}</TableCell>
                  <TableCell align="left">{row.rank}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<InfoIcon />}
                      onClick={() => {
                        setSelectedUser(row);
                        setModalOpen(true);
                      }}
                    >
                      Get Info
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            className="pt-2 pb-2 pl-2"
            color="primary"
            count={parseInt(totalNumber / 10, 10)}
            variant="outlined"
            onChange={(e, value) => setPageSkip(value * 10)}
          />
        </TableContainer>
      </Paper>
      <Modal
        className="d-flex justify-content-center align-items-center"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            minWidth: 600,
            minHeight: 300,
            border: "none",
            outline: "none",
            borderRadius: 2,
          }}
          className="p-3 shadow"
        >
          <Typography variant="h4" gutterBottom>
            {selectedUser.display_name}
          </Typography>
          <Typography
            style={{ color: "#484848" }}
            variant="h5"
            className="mb-4 mt-4"
          >
            Points: {selectedUser.points}
          </Typography>
          <Typography
            style={{ color: "#484848" }}
            variant="h5"
            className="mb-4 mt-3"
          >
            Country: {selectedUser.country}
          </Typography>
          <Typography
            style={{ color: "#484848" }}
            variant="h5"
            className="mb-4 mt-3"
          >
            Rank: {selectedUser.rank}
          </Typography>
        </div>
      </Modal>
    </>
  );
};

export default MainPage;

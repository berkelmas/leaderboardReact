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
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import GroupAddIcon from "@material-ui/icons/GroupAddOutlined";

import PersonDetailsModal from "./PersonDetailsModal";
import PersonAddModal from "./PersonAddModal";

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

  const [addPersonModalOpen, setAddPersonModalOpen] = useState(false);

  return (
    <>
      <Paper style={{ padding: "25px" }} elevation={4}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
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
          </div>
          <div className="d-flex">
            <Fab
              onClick={() => setAddPersonModalOpen(true)}
              color="primary"
              aria-label="add"
            >
              <AddIcon />
            </Fab>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Display Name</TableCell>
                <TableCell align="left">Score</TableCell>
                <TableCell align="left">Rank</TableCell>
                <TableCell align="left">Country</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{row.display_name}</TableCell>
                  <TableCell align="left">{row.points}</TableCell>
                  <TableCell align="left">{row.rank}</TableCell>
                  <TableCell align="left">{row.country}</TableCell>
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
            onChange={(e, value) => setPageSkip((value - 1) * 10)}
          />
        </TableContainer>
      </Paper>
      <PersonDetailsModal
        setModalOpen={setModalOpen}
        selectedUser={selectedUser}
        modalOpen={modalOpen}
      />
      <PersonAddModal
        setAddPersonModalOpen={setAddPersonModalOpen}
        addPersonModalOpen={addPersonModalOpen}
        renewData={() => {
          getAllLeaderboard(pageSkip, pageSkip + 9).then((res) => {
            setRows(res.data.result);
            setTotalNumber(res.data.totalNumber);
          });
        }}
      />
    </>
  );
};

export default MainPage;

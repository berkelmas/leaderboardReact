import React, { useState, useEffect } from "react";
// MATERIAL UI
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
import InfoIcon from "@material-ui/icons/Info";
import Modal from "@material-ui/core/Modal";

import { countryList } from "../utilities/countryList";
import { getLeaderboardByCountry } from "../services/leaderboard-service";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "50%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

const CountryLeaderboardPage = () => {
  const classes = useStyles();
  const [country, setCountry] = useState("TR");

  const [pageSkip, setPageSkip] = useState(0);
  const [totalNumber, setTotalNumber] = useState(0);
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getLeaderboardByCountry(pageSkip, pageSkip + 9, country).then((res) => {
      setRows(res.data.result);
      setTotalNumber(res.data.totalNumber);
    });
  }, [pageSkip, country]);

  const handleChange = (e) => {
    setCountry(e.target.value);
  };
  return (
    <>
      <Paper style={{ padding: "25px" }} elevation={4}>
        <Typography variant="h4" gutterBottom>
          Country Leaderboard {country}
        </Typography>
        <Typography
          style={{ color: "#767676" }}
          variant="subtitle1"
          className="mb-4"
        >
          Here you can view all leaderboard by page and filter on country basis.
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            onChange={handleChange}
          >
            {countryList.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
      </Paper>
    </>
  );
};

export default CountryLeaderboardPage;

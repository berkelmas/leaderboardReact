import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

import { countryList } from "../utilities/countryList";
import { addNewUser } from "../services/user-service";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

const PersonAddModal = (props) => {
  const [userName, setUserName] = useState("");
  const [country, setCountry] = useState("TR");
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userName !== "" || userName !== null) {
      addNewUser(userName, country).then((res) => {
        props.setAddPersonModalOpen(false);
        props.renewData();
      });
    }
  };

  const handleChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <Modal
      className="d-flex justify-content-center align-items-center"
      open={props.addPersonModalOpen}
      onClose={() => props.setAddPersonModalOpen(false)}
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
          Add New Player
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ height: "200px" }}
          className="d-flex flex-column justify-content-between align-items-end"
        >
          <FormControl className={classes.formControl}>
            <TextField
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-2"
              label="Player Name*"
            />
          </FormControl>
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
          <div className="d-flex">
            <Button
              onClick={() => props.setAddPersonModalOpen(false)}
              className="mr-2"
              variant="outlined"
            >
              Close
            </Button>
            <Button
              className="mt-auto"
              type="submit"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PersonAddModal;

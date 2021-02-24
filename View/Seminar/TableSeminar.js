import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import { Card, Grid, Typography } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import Pagination from "@material-ui/lab/Pagination";
import Colors from "../../assets/Color";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 550,
  },
  tableHeader: {
    backgroundColor: "red",
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#e6e6e6",
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

export default function TableSeminar(props) {
  const classes = useStyles();
  const {
    openModalDelete,
    onSelectItem,
    openUpdateModal,
    numberPage,
    pageCurrent,
    changePageCurrent,
    openAcceptModal,
    openRejectModal,
  } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const onEditClick = (item) => {
    onSelectItem(item);
    openUpdateModal();
  };

  const onDeleteClick = (item) => {
    onSelectItem(item);
    openModalDelete();
  };

  const onAcceptClick = (item) => {
    onSelectItem(item);
    openAcceptModal();
  };

  const onRejectClick = (item) => {
    onSelectItem(item);
    openRejectModal();
  };

  return (
    <div className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableRow>
            {props.columns.map((column) => (
              <StyledTableCell
                key={column.id}
                align={column.align}
                style={{
                  minWidth: column.minWidth,
                  backgroundColor: Colors.headerTable,
                }}
              >
                {column.label}
              </StyledTableCell>
            ))}
            <StyledTableCell
              style={{
                minWidth: 162,
                textAlign: "center",
                backgroundColor: Colors.headerTable,
              }}
            >
              Hành động
            </StyledTableCell>
          </TableRow>
          <TableBody>
            {props.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {props.columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}

                    <TableCell align={"center"}>
                      <IconButton
                        onClick={() => onEditClick(row)}
                        aria-label="delete"
                        size="large"
                        style={{ color: Colors.green }}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      {/* <IconButton
                                                onClick={() => onDeleteClick(row)}
                                                aria-label="delete"
                                                size="large"
                                                color="secondary"
                                            >
                                                <DeleteIcon fontSize="inherit" />
                                            </IconButton> */}
                      <IconButton
                        onClick={() => onAcceptClick(row)}
                        aria-label="delete"
                        size="large"
                        style={{ color: "#3C8DBC" }}
                      >
                        <DoneIcon fontSize="medium" />
                      </IconButton>
                      <IconButton
                        onClick={() => onRejectClick(row)}
                        aria-label="delete"
                        size="large"
                        color="secondary"
                      >
                        <CloseIcon fontSize="medium" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justify={"center"} style={{ padding: 10 }}>
        <Pagination
          count={numberPage}
          color="secondary"
          page={pageCurrent}
          onChange={(event, page) => changePageCurrent(page)}
        />
      </Grid>
    </div>
  );
}

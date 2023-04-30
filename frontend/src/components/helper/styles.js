import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  header: {
    backgroundColor: "inherit",
    color: "black",
    boxShadow: "0px 0px 0px 0px",
    marginTop: 100,
    height: 0,
  },
  spacing: {
    fontSize: "25px",
    marginLeft: 35,
    marginRight: 35,
    textDecoration: "none",
    color: "inherit",
  },
  company: {
    fontSize: "25px",
    marginLeft: 100,
    marginRight: "auto",
    textDecoration: "none",
    color: "inherit",
  },
  navbar: {
    marginBottom: 200,
  },
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "25vh",
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

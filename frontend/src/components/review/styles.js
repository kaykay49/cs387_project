import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  image: {
    marginTop: 15,
    marginBottom: 15,
    marginRight: 30,
    width: 130,
    height: 120,
  },
  divider: {
    marginTop: 20,
    marginBottom: 25,
  },
  product: {
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  heading: {
    marginTop: 25,
    marginBottom: 10,
    fontWeight: "bold",
  },
  button: {
    marginTop: 130,
    marginLeft: -75,
  },
  error: {
    marginTop: 50,
  },
});

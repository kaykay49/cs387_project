import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  root: {
    maxWidth: "30%",
    paddingLeft: "10%",
  },
  main: {
    maxWidth: "70%",
  },
  buttons: {
    marginTop: 130,
  },
  category: {
    fontSize: "17px",
    justifyContent: "flex-start",
  },
  mainCategory: {
    paddingBottom: 20,
  },
  rootProducts: {
    backgroundColor: "#f2eeeb",
    maxWidth: 700,
    height: 425,
    margin: 15,
    cursor: "pointer",
  },
  text: {
    paddingTop: 80,
    paddingLeft: 100,
  },
  media: {
    height: 320,
    paddingTop: 15,
    paddingBottom: 30,
    marginBottom: 5,
  },
  mediaHovered: {
    height: 320,
    paddingTop: 15,
    paddingBottom: 30,
    marginBottom: 5,
    transform: "scale3d(1.3, 1.3, 1)",
    transition:
      "all .1s cubic-bezier(.61,1,.88,1),transform .15s cubic-bezier(.61,1,.88,1)",
  },
  productName: {
    fontSize: 18,
  },
});

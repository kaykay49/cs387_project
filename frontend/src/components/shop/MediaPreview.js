import React, { useState } from "react";
import { CardMedia } from "@material-ui/core";
import useStyles from "./styles";

const MediaPreview = ({ product }) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  return (
    <CardMedia
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
      className={show ? classes.mediaHovered : classes.media}
      component="img"
      src={show ? product.imgpreview : product.imgpath}
      title={product.name}
    ></CardMedia>
  );
};

export default MediaPreview;

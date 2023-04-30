import React from "react";

import { Typography, Divider } from "@material-ui/core";
import useStyles from "./styles";

const Overview = ({ preview }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography align="left" variant="h5" className={classes.customerReview}>
        Overview
      </Typography>
      <Divider className={classes.overviewDivider} />
      <Typography className={classes.overview} variant="h5">
        {preview.overview}
      </Typography>
    </div>
  );
};

export default Overview;

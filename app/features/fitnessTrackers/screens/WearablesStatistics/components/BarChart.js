import React from "react";
import PropTypes from "prop-types";
import { BarChartColumn } from "./BarChartColumn";

const getHeight = (value, max, maxHeight) => {
  return (value * maxHeight) / max;
};

export const BarChart = ({ maxHeight, rows }) => {
  const max = Math.max.apply(
    Math,
    rows.map(function(o) {
      return o.value;
    })
  );
  return rows.map((row, index) => (
    <BarChartColumn
      key={index}
      label={row.label}
      value={row.value}
      height={getHeight(row.value, max, maxHeight)}
    />
  ));
};

BarChart.propTypes = {
  maxHeight: PropTypes.number,
  rows: PropTypes.arrayOf({
    label: PropTypes.string,
    value: PropTypes.number,
  }),
};

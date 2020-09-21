import React from "react";
import { Dimensions } from "react-native";
import PropTypes from "prop-types";
import { BarChartColumn } from "./BarChartColumn";

const { width } = Dimensions.get("window");

const getHeight = (value, max, maxHeight) => {
  if (!value) value = max / 2;
  return (value * maxHeight) / max;
};

export const BarChart = ({ maxHeight, rows }) => {
  const tempMax =
    rows && rows.length
      ? Math.max.apply(
          Math,
          rows.map(function(o) {
            return o.value;
          })
        )
      : 10;

  const max = tempMax > 10 ? tempMax : 10;

  const transformedRows = rows.map(row => {
    return { ...row, active: row.value };
  });

  for (let i = rows.length; i < 15; i++) {
    transformedRows.push({
      value: max - 10,
      active: false,
    });
  }

  const columnWidth = 15;

  return transformedRows.map((row, index) => (
    <BarChartColumn
      key={index}
      label={row.label}
      value={row.value}
      active={row.active}
      width={columnWidth}
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

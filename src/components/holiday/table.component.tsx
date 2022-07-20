import { h, JSX } from "preact";
import * as styles from "./table.module.less";
import { useState } from "preact/hooks";
import { ButtonComponent } from "../button.component";

const tableColumn = [
  { name: "Hotel Name", columnKey: "name" },
  { name: "Star Rating", columnKey: "starRating" },
  { name: "Traveller Rating", columnKey: "vRating" },
  { name: "Basis", columnKey: "boardBasis" },
  { name: "Inbound Flight", columnKey: "inboundCabinClass" },
  { name: "Return Flight", columnKey: "outboundCabinClass" },
  { name: "Price per person", columnKey: "pricePerPerson" },
  { name: "Details", columnKey: "details" },
];

// TODO add interface for simplifyData

export const TableComponent = (props) => {
  const { holidays } = props;
  const [tripData, setTripData] = useState(holidays);

  const defaultSorting = (sortBy) => {
    const sortedData = [...tripData];
    sortedData.sort((a, b) =>
      a[sortBy].toString().localeCompare(b[sortBy].toString())
    );

    setTripData(sortedData);
  };

  return (
    <table className={`${styles["holiday-table"]}`}>
      <thead>
        <tr>
          {tableColumn.map((title, index) => {
            return (
              <th
                key={`${name}-${index}`}
                onClick={() => {
                  defaultSorting(title.columnKey);
                }}
                className={`${styles["holiday-table__th"]}`}
              >
                {title.name}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tripData.map((trip, index) => {
          return (
            <tr key={index}>
              <th
                data-key={"name"}
                className={`${styles["holiday-table__td"]}`}
              >
                <a href={trip.url}>{trip.name}</a>
              </th>
              <td
                data-key={"rating"}
                className={`${styles["holiday-table__td"]}`}
              >
                {trip.starRating}
              </td>
              <td
                data-key={"vRating"}
                className={`${styles["holiday-table__td"]}`}
              >
                {trip.vRating}
              </td>
              <td
                data-key={"basis"}
                className={`${styles["holiday-table__td"]}`}
              >
                {trip.boardBasis}
              </td>
              <td
                data-key={"outbound"}
                className={`${styles["holiday-table__td"]}`}
              >
                <div>Stops: {trip.inboundSectors.length}</div>
                <div>{trip.inboundCabinClass}</div>
              </td>
              <td
                data-key={"return"}
                className={`${styles["holiday-table__td"]}`}
              >
                <div>Stops: {trip.outboundSectors.length}</div>
                <div>{trip.outboundCabinClass}</div>
              </td>
              <td
                data-key={"price"}
                className={`${styles["holiday-table__td"]}`}
              >
                {trip.pricePerPerson}
              </td>
              <td data-key={""} className={`${styles["holiday-table__td"]}`}>
                <ButtonComponent text="Details" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;

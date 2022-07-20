import { h, JSX } from "preact";
import * as styles from "./holiday.module.less";
import LoadingComponent from "./loading.component";
import ErrorComponent from "./error.component";
import TableComponent from "./table.component";
import { Holiday } from "../../types/booking";

type HolidayTableComponentProps = {
  loading: boolean;
  error: boolean;
  holidays: Array<Holiday> | undefined;
};

export const HolidayTableComponent = (props: HolidayTableComponentProps) => {
  const { loading, error, holidays } = props;

  // TODO use destructuring
  const simplifyData = holidays?.map((item) => {
    return {
      name: item?.hotel.name,
      url: item?.hotel.content.url,
      starRating: item.hotel.content.starRating || "",
      vRating: item.hotel.content.vRating || "",
      boardBasis: item?.hotel.content.boardBasis,
      inboundCabinClass: item?.inboundFlight.cabinClass,
      inboundSectors: item?.inboundFlight.sectors,
      outboundCabinClass: item?.outboundFlight.cabinClass,
      outboundSectors: item?.outboundFlight.sectors,
      pricePerPerson: item?.pricePerPerson,
    };
  });

  return (
    <section className={`${styles["result-section"]} full-bleed`}>
      <div className="wrapper">
        {loading && <LoadingComponent />}
        {error && <ErrorComponent />}
        {holidays && <TableComponent holidays={simplifyData} />}
      </div>
    </section>
  );
};

export default HolidayTableComponent;

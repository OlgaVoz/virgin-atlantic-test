import { h, JSX } from "preact";
import { useRouter } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import SearchComponent from "../components/search.component";
import HolidayTableComponent from "../components/holiday/holiday.component";

import { doRequest } from "../services/http.service";
import { BookingRequest, BookingResponse } from "../types/booking";
import { DateTime } from "luxon";

export default function ResultsRoute(): JSX.Element {
  const [searchParams] = useRouter();
  const [result, setResult] = useState(undefined);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const sendARequest = async (requestBody) => {
    setLoading(true);
    setError(false);
    setResult(undefined);
    try {
      const result: BookingResponse = await doRequest(
        "POST",
        "/cjs-search-api/search",
        requestBody
      );
      if (result?.holidays) {
        setLoading(false);
        setResult(result.holidays); // TODO check eslint warning
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    const departureDate = DateTime.fromFormat(
      searchParams?.matches?.departureDate,
      "yyyy-MM-dd"
    ).toFormat("dd-MM-yyyy");
    const requestBody: BookingRequest = {
      bookingType: "holiday",
      location: searchParams?.matches?.location,
      departureDate: departureDate,
      duration: searchParams?.matches?.duration as unknown as number,
      gateway: "LHR",
      partyCompositions: [
        {
          adults: searchParams?.matches?.adults as unknown as number,
          childAges: [],
          infants: 0,
        },
      ],
    };
    sendARequest(requestBody);
  }, [searchParams]);

  return (
    <section>
      <SearchComponent />
      <HolidayTableComponent
        loading={loading}
        holidays={result}
        error={error}
      />
    </section>
  );
}

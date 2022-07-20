import { h } from "preact";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-preact-pure";
import { TableComponent } from "./table.component";

configure({ adapter: new Adapter() });

describe("TableComponent", () => {
  it("should display the input correctly", async () => {
    const data = [
      {
        name: "B-name",
        url: "/",
        starRating: "2",
        vRating: "4",
        boardBasis: "Room Only",
        inboundCabinClass: "",
        inboundSectors: [{}, {}],
        outboundCabinClass: "",
        outboundSectors: [{}, {}],
        pricePerPerson: 20,
      },
      {
        name: "A-name",
        url: "/",
        starRating: "5",
        vRating: "3",
        boardBasis: "Room Only",
        inboundCabinClass: "",
        inboundSectors: [{}, {}],
        outboundCabinClass: "",
        outboundSectors: [{}, {}],
        pricePerPerson: 30,
      },
    ];

    const table_component = mount(<TableComponent holidays={data} />);

    const hotelName = table_component.find("th").at(0);
    hotelName.simulate("click");

    // TODO refactor and add more tests
    expect(table_component.find("[data-key='name']").at(0).text()).toEqual(
      "A-name"
    );
  });
});

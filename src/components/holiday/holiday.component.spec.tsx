import { h } from "preact";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-preact-pure";
import { HolidayTableComponent } from "./holiday.component";

configure({ adapter: new Adapter() });

describe("ResultComponent", () => {
  it("should display loading", async () => {
    const table_component = mount(
      <HolidayTableComponent loading={true} error={true} holidays={undefined} />
    );
    expect(table_component.text()).toMatch("Loading...");
  });
});

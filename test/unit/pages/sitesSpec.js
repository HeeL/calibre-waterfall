import { shallow } from "enzyme";
import React from "react";
import { expect } from "chai";
import Link from "next/link";

import Sites from "../../../pages/sites.js";

describe("Sites Page", () => {
  it("renders the page", () => {
    const sites = shallow(<Sites snapshots={[]} />);

    expect(sites).to.be.present();
  });

  xit("renders links to snapshots", () => {
    const sites = shallow(
      <Sites
        router={{ query: { slug: "xxx" } }}
        snapshots={[
          { id: 1, created_at: "2019-06-05T05:03:45.236Z" },
          { id: 42, created_at: "2018-06-05T05:03:45.236Z" }
        ]}
      />
    );
    const links = sites.find(Link);

    expect(links).to.have.length(2);
    expect(links.first()).to.have.prop("href", "/sites/xxx/snapshots/1");
    expect(links.at(1)).to.have.prop("href", "/sites/xxx/snapshots/42");
  });
});

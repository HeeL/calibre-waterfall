import { shallow } from "enzyme";
import React from "react";
import { expect } from "chai";

import Index from "../../../pages/index.js";

describe("Index Page", () => {
  it("renders the page", () => {
    const index = shallow(<Index sites={[]} />);

    expect(index).to.be.present();
  });

  it("renders links to sites", () => {
    const index = shallow(<Index sites={[{ slug: "test", name: "bar" }]} />);
    const links = index.find("Link a");

    expect(links).to.have.length(1);
    expect(links.first()).to.have.prop("href", "/sites/test");
  });
});

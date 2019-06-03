import { shallow } from "enzyme";
import React from "react";
import { expect } from "chai";
import Link from "next/link";

import Home from "../../../pages/index.js";

describe("Home Page", () => {
  it("renders the page", () => {
    const home = shallow(<Home />);

    expect(home).to.be.present();
  });

  it("renders links to sites", () => {
    const home = shallow(<Home />);
    const links = home.find(Link);

    expect(links).to.have.length(1);
    expect(links.first()).to.have.prop("href", "/sites/cruises");
  });
});

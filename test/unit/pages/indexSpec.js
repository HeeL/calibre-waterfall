import { shallow } from "enzyme";
import React from "react";
import { expect } from "chai";
import Link from "next/link";

import Index from "../../../pages/index.js";

describe("Index Page", () => {
  it("renders the page", () => {
    const index = shallow(<Index />);

    expect(index).to.be.present();
  });

  it("renders links to sites", () => {
    const index = shallow(<Index />);
    const links = index.find(Link);

    expect(links).to.have.length(1);
    expect(links.first()).to.have.prop("href", "/sites/cruises");
  });
});

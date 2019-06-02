import { shallow } from "enzyme";
import React from "react";
import Home from "../../../pages/index.js";
import { expect } from "chai";

describe("Home Page", () => {
  it("renders the page", () => {
    const home = shallow(<Home />);

    expect(home).to.be.present();
  });
});

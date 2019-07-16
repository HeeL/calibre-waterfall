import React from "react";
import fetch from "isomorphic-unfetch";
import "react-perfcascade/dist/react-perfcascade.css";

class Snapshots extends React.Component {
  constructor() {
    super();
    this.state = { client: false };
  }

  componentDidMount() {
    this.setState({ client: true });
  }

  renderHar() {
    const HarFileView = require("react-perfcascade").HarFileView;
    return <HarFileView harData={this.props.harData} />;
  }

  render() {
    return <div>{this.state.client ? this.renderHar() : null}</div>;
  }
}

Snapshots.getInitialProps = ({ query: { id, slug, profile_id, mobile } }) =>
  fetch(
    `${process.env.APP_URL}/api/har/${slug}/${id}?profile_id=${profile_id}${
      mobile ? "&mobile=1" : ""
    }`
  )
    .then(response => response.json())
    .then(response => {
      return fetch(response.harUrl)
        .then(result => result.json())
        .then(harData => {
          return { harData };
        });
    });

export default Snapshots;

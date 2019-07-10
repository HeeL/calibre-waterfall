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

Snapshots.getInitialProps = ({ req, query: { id, slug } }) => {
  const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";

  return fetch(
    `${baseUrl}/api/har/${slug}/${id}?profile_id=${req.query.profile_id}${
      req.query.mobile ? "&mobile=1" : ""
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
};

export default Snapshots;

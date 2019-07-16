import React from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

const Index = props => (
  <div>
    {props.sites.map(site => (
      <>
        <Link key={site.slug} href={`/sites/${site.slug}`}>
          <a style={{ lineHeight: "200%", fontSize: "26px" }}>{site.name}</a>
        </Link>
        <br />
      </>
    ))}
  </div>
);

Index.getInitialProps = () =>
  fetch(`${process.env.APP_URL}/api/sites`)
    .then(result => result.json())
    .then(sites => ({
      sites
    }));

export default Index;

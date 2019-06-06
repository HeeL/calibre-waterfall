import React from "react";
import Link from "next/link";

const Sites = props => (
  <div>
    {props.snapshots.map(snapshot => (
      <div style={{ margin: "5px 10px" }}>
        <Link
          key={snapshot.id}
          href={`/sites/${props.url.query.slug}/snapshots/${snapshot.id}`}
        >
          <a style={{ fontSize: "20px" }}>Snapshot #{snapshot.id}</a>
        </Link>{" "}
        <span style={{ fontSize: "16px", color: "#999" }}>
          {snapshot.created_at}
        </span>
      </div>
    ))}
  </div>
);

Sites.getInitialProps = ({ req, query: { slug } }) => {
  const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";

  return fetch(`${baseUrl}/api/snapshots/${slug}`)
    .then(result => result.json())
    .then(snapshots => ({
      snapshots
    }));
};

export default Sites;

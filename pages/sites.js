import React from "react";
import Link from "next/link";

const Sites = props => (
  <div>
    {props.snapshots.map(snapshot => (
      <Link key={snapshot.id} href={`/snapshots/${snapshot.id}`}>
        <a>
          #{snapshot.id} {snapshot.created_at}
        </a>
      </Link>
    ))}
  </div>
);

Sites.getInitialProps = ({ req, query: { slug } }) => {
  console.log(slug);
  const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";

  return fetch(`${baseUrl}/api/snapshots`)
    .then(result => result.json())
    .then(snapshots => ({
      snapshots
    }));
};

export default Sites;

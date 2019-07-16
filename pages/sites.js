import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";

const renderProfile = (slug, snapshotId, profile) => {
  return (
    <div key={profile.id}>
      {profile.name}{" "}
      <Link
        href={`/sites/${slug}/snapshots/${snapshotId}?profile_id=${
          profile.id
        }&mobile=1`}
      >
        <a>3G connection</a>
      </Link>{" "}
      |{" "}
      <Link
        href={`/sites/${slug}/snapshots/${snapshotId}?profile_id=${profile.id}`}
      >
        <a>Desktop</a>
      </Link>
    </div>
  );
};

const Sites = props => (
  <div>
    {props.snapshots.map(snapshot => (
      <div style={{ margin: "35px 10px" }} key={snapshot.id}>
        Snapshot #{snapshot.id}{" "}
        <span style={{ fontSize: "16px", color: "#999" }}>
          {snapshot.created_at}
        </span>
        {snapshot.profiles.map(
          renderProfile.bind(null, props.router.query.slug, snapshot.id)
        )}
      </div>
    ))}
  </div>
);

Sites.getInitialProps = ({ query: { slug } }) =>
  fetch(`${process.env.APP_URL}/api/snapshots/${slug}`)
    .then(result => result.json())
    .then(snapshots => ({
      snapshots
    }));

export default withRouter(Sites);

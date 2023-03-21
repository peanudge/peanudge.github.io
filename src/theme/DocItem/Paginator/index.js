import React from "react";
import Paginator from "@theme-original/DocItem/Paginator";
import Uttrances from "@site/src/components/Uttrances";

export default function PaginatorWrapper(props) {
  return (
    <>
      <Paginator {...props} />
      <div style={{ marginTop: 20 }}>
        <Uttrances />
      </div>
    </>
  );
}

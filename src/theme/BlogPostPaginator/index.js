import React from "react";
import BlogPostPaginator from "@theme-original/BlogPostPaginator";
import Uttrances from "@site/src/components/Uttrances";

export default function BlogPostPaginatorWrapper(props) {
  return (
    <>
      <BlogPostPaginator {...props} />
      <div style={{ marginTop: 20 }}>
        <Uttrances />
      </div>
    </>
  );
}

import React from "react";
import BlogPostItem from "@theme-original/BlogPostItem";
import Uttrances from "@site/src/components/Uttrances";

export default function BlogPostItemWrapper(props) {
  return (
    <>
      <BlogPostItem {...props} />
      <Uttrances />
    </>
  );
}

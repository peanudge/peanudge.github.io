import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <div className={styles.main}>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
      <div className={styles.buttons}>
        <div className={styles.contentBox}>
          <p>관심있는 기술에 대한 이야기</p>
          <Link className={styles.button} to="/blog">
            블로그
          </Link>
        </div>
        <div className={styles.contentBox}>
          <p>정리하고 싶은 기술적인 상세한 내용</p>
          <Link className={styles.button} to="/blog">
            문서
          </Link>
        </div>
      </div>
    </Layout>
  );
}

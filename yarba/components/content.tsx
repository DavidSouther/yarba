import { FC } from "react";
import Head from "next/head";
import Nav from "./nav";

const Content: FC<{ title: string }> = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>

    <Nav></Nav>

    <div className="container mx-auto">{children}</div>
  </>
);

export default Content;

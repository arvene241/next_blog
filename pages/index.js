import Head from "next/head";
import Image from "next/image";
import Categories from "../components/Categories";
import LatestPost from "../components/LatestPost";
import PopularPost from "../components/PopularPost";
import Trending from "../components/Trending";
import Layout from "../layout/Layout";

export default function Home() {
  return (
    <Layout>
      <Trending />
      <LatestPost />
      <PopularPost />
      <Categories />
    </Layout>
  );
}

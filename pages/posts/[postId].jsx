import React from "react";
import Image from "next/image";
import Author from "../../components/Author";
import Layout from "../../layout/Layout";
import RelatedPost from "../../components/RelatedPost";
import getPost from "../../lib/helper";
import fetcher from "../../lib/fetcher";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

const Page = ({ fallback }) => {
  const router = useRouter();
  const { postId } = router.query;
  const { data, isLoading, isError } = fetcher(`api/posts/${postId}`);

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <SWRConfig value={{ fallback }}>
      <Article {...data} />
    </SWRConfig>
  );
};

const Article = ({ title, img, subtitle, description, author }) => {
  return (
    <Layout>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">
          {author ? <Author {...author} /> : <></>}
        </div>

        <div className="post py-10">
          <h1 className="font-bold text-4xl text-center pb-5">
            {title || "No Title"}
          </h1>

          <p className="text-gray-500 text-xl text-center">
            {subtitle || "No Title"}
          </p>

          <div className="py-10">
            <Image src={img || "/"} width={900} height={600}></Image>
          </div>

          <div className="content text-gray-600 text-lg flex flex-col gap-4">
            {description || "No Description"}
          </div>
        </div>

        <RelatedPost />
      </section>
    </Layout>
  );
};

export const getStaticProps = async ({ params }) => {
  const posts = await getPost(params.postId);

  return {
    props: {
      fallback: {
        "/api/posts": posts,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const posts = await getPost();
  const paths = posts.map((value) => {
    return {
      params: {
        postId: value.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default Page;

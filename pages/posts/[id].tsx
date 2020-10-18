import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";

import { getAllPostIds, getPostData } from "../../lib/posts";

import utilStyles from "../../styles/utils.module.scss";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

const Post = ({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) => {
  console.log(postData);
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
};

export default Post;

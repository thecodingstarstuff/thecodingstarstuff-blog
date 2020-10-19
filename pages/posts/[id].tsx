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
    keywords: [string];
    author: string;
    authorLink: string;
    firstOn: string;
    draft: boolean;
    updated: string;
  };
}) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        by <a href={postData.authorLink}>{postData.author}</a>
      </div>
      {postData.draft && <div className={utilStyles.lightText}><small>Keep in mind this is a draft, make sure to check out later for the final version.</small></div>}
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />{postData.updated && <span>. Updated on: <Date dateString={postData.updated} /></span>}
      </div>
      <div className={utilStyles.lightText}>
        {postData.firstOn && (
          <div className={utilStyles.lightText}>
            First on <a href={postData.firstOn}>{postData.firstOn}</a>
          </div>
        )}
        <ul className={utilStyles.keywords}>
          {postData.keywords.map((keyword) => (
            <li key={keyword}>#{keyword}</li>
          ))}
        </ul>
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      {postData.draft && <div className={utilStyles.lightText}><small>Keep in mind this is a draft, make sure to check out later for the final version.</small></div>}
    </Layout>
  );
};

export default Post;

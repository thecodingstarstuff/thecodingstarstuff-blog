import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.scss';
import Link from 'next/link';
import Date from '../components/date';

import { getSortedPostsData } from '../lib/posts';
import PostData from '../lib/post_data.interface';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }: { allPostsData: [PostData] }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map((postData) => (
            <li className={utilStyles.listItem} key={postData.id}>
              <Link href="/posts/[id]" as={`/posts/${postData.id}`}>
                <a>
                  {postData.series
                    ? `${postData.series}. ${postData.title}`
                    : postData.title}
                </a>
              </Link>{' '}
              {postData.draft && `(draft)`}
              <br />
              <small className={utilStyles.lightText}>
                by <a href={postData.authorLink}>{postData.author}</a>
              </small>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={postData.date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

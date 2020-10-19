import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.scss';
import Link from 'next/link';
import Date from '../components/date';

import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({
  allPostsData,
}: {
  allPostsData: [
    {
      id: string;
      date: string;
      title: string;
      author: string;
      authorLink: string;
      draft: boolean;
    }
  ];
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>This is a simple blog developed using{' '}
        <a href="https://nextjs.org/learn/basics/create-nextjs-app">
          NextJS' tutorial
        </a>
        . The idea behind this blog is to have a place to group all my guides and
        posts for future reference. But since they may be of use to
        others cruising similar paths as mine I've decided to make it public.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, author, authorLink, draft }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a> 
              </Link> {draft && `(draft)`}
              <br />
              <small className={utilStyles.lightText}>
                by <a href={authorLink}>{author}</a>
              </small>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

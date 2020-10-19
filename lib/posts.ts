import glob from 'glob';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  let fileNames = glob.sync(`${postsDirectory}/**/*.md`);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '').split('/').pop();

    // Read markdown file as string
    const fileContents = fs.readFileSync(fileName, 'utf8');
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const keywords = matterResult.data.keywords.split(', ');

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as {
        date: string;
        title: string;
        keywords: string;
        author: string;
        authorLink: string;
        firstOn: string;
      }),
      keywords,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  let fileNames = glob.sync(`${postsDirectory}/**/*.md`);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '').split('/').pop(),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = glob.sync(`${postsDirectory}/**/${id}.md`).pop();
  // const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const keywords = matterResult.data.keywords.split(', ');

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
    keywords,
  };
}

export default interface PostData {
  id: string;
  title: string;
  series: string;
  date: string;
  contentHtml: string;
  keywords: [string];
  author: string;
  authorLink: string;
  firstOn: string;
  draft: boolean;
  updated: string;
}

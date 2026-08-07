export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = "https://apscoretracker.com";
  const now = new Date();

  const routes = [
    { url: baseUrl, lastModified: now },
    { url: `${baseUrl}/tracker`, lastModified: now },
    { url: `${baseUrl}/privacy`, lastModified: now },
    { url: `${baseUrl}/terms`, lastModified: now },
    // Only subjects supported by the tracker are indexable at launch.
    { url: `${baseUrl}/ap-lang`, lastModified: now },
    { url: `${baseUrl}/ap-psych`, lastModified: now },
    { url: `${baseUrl}/ap-calculus-ab`, lastModified: now },
    { url: `${baseUrl}/ap-biology`, lastModified: now },
    { url: `${baseUrl}/ap-us-history`, lastModified: now },
    // Blog posts
    { url: `${baseUrl}/blog/how-to-track-ap-progress`, lastModified: now },
    { url: `${baseUrl}/blog/ap-score-improvement-tips`, lastModified: now },
  ];

  return routes;
}

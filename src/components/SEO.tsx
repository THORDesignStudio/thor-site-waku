type SEOProps = {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
};

export function SEO({
  title,
  description,
  image = '/images/hero-hammers/THOR_Hammer_OG_1200x630px.jpg',
  url,
  type = 'website',
  twitterCard = 'summary_large_image',
}: SEOProps) {
  const siteUrl = 'https://www.thor-studio.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </>
  );
}

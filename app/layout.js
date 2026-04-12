export const metadata = {
  title: "Driftbot.ai — Turn Every Visitor Into a Booked Meeting",
  description: "Driftbot is an AI sales agent that lives on your website — engaging visitors, qualifying leads, and booking meetings on your calendar. 24/7.",
  openGraph: {
    title: "Driftbot.ai — Turn Every Visitor Into a Booked Meeting",
    description: "AI sales agent that engages visitors, qualifies leads, and books meetings. 24/7. No code required.",
    url: "https://driftbot.ai",
    siteName: "Driftbot.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Driftbot.ai — Turn Every Visitor Into a Booked Meeting",
    description: "AI sales agent that engages visitors, qualifies leads, and books meetings. 24/7.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}

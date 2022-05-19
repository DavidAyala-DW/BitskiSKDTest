module.exports = {
  reactStrictMode: true,
  images: {
    layoutRaw: true,
    domains: [
      "cdn.bitskistatic.com",
      "www.bitski.com"
    ]
  },
  sassOptions: {

    prependData: `
      $standardMode: ${ process.env.NEXT_PUBLIC_STANDARD_MODE != "" ? process.env.NEXT_PUBLIC_STANDARD_MODE : "no-selected"}; 
      $background_color: ${ process.env.NEXT_PUBLIC_BACKGROUND_COLOR != "" ? process.env.NEXT_PUBLIC_BACKGROUND_COLOR : "no-selected" }; 
      $headlineFontLocal: "${process.env.NEXT_PUBLIC_HEADLINES_FONT_FAMILY}";
      $bodyFontLocal: "${process.env.NEXT_PUBLIC_BODY_FONT_FAMILY}";
      $headlineFontGoogleURL: "${process.env.NEXT_PUBLIC_GOOGLEFONT_HEADLINES_URL}";
      $headlineFontGoogleFont: "${process.env.NEXT_PUBLIC_GOOGLEFONT_HEADLINES_FONT_FAMILY}";
      $bodyFontGoogleURL: "${process.env.NEXT_PUBLIC_GOOGLEFONT_BOY_URL}";
      $bodyFontGoogleFont: "${process.env.NEXT_PUBLIC_GOOGLEFONT_BOY_FONT_FAMILY}";
      $buttonShape: ${ process.env.NEXT_PUBLIC_BUTTON_STYLE != "" ? process.env.NEXT_PUBLIC_BUTTON_STYLE : "none" };
    `,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
}

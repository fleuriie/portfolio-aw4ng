import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Annie's Portfolio",
  description: "6.1040 '24",
  base: "/portfolio-aw4ng/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Blogs", link: "/blogs" },
      { text: "Assignments", link: "/assignments" },
    ], 

    sidebar: [
      {
        text: "Blogs",
        link: "/blogs",
      },
      {
        text: "Assignments",
        link: "/assignments",
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/61040-fa24" }],
  },
});

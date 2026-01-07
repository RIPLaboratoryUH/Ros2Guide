import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ROS2 Guide",
  base: "/Ros2Guide/",
  description: "A comprehensive guide to Robot Operating System 2",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Installation', link: '/guide/installation' },

        ]
      },
      {
        text: 'Core Concepts',
        items: [
          // Add more sections here as you write them
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Glossary', link: '/guide/glossary' }
        ]
      }
    ],

    socialLinks: [
      // { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024'
    }
  }
})

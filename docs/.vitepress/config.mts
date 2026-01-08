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
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'IIR', link: '/iir/iir-quick-start' },
      { text: 'MRUH', link: '/mruh/index' },
      { text: 'Reference', link: '/reference/glossary' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'ROS2 Use Cases and Structure', link: '/guide/ros2-use-cases-and-structure' },
            { text: 'ROS2 Links', link: '/guide/ros2-links' }
          ]
        }
      ],
      '/iir/': [
        {
          text: 'Infrastructure Inspection Robot',
          items: [
            { text: 'Quick Start', link: '/iir/iir-quick-start' },
            { text: 'Operation Guide', link: '/iir/iir-operation-guide' },
            { text: 'Architecture Documentation', link: '/iir/Infrastructure Inspection Robot (IIR) Architecture Documentation' }
          ]
        }
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'Glossary', link: '/reference/glossary' },
            { text: 'NetworkManager CLI nmcli', link: '/reference/NetworkManager CLI nmcli' },
            { text: 'Tailscale ACL Configuration', link: '/reference/Tailscale ACL Configuration' }
          ]
        }
      ],
      '/mruh/': [
        {
          text: 'MRUH',
          items: [
            { text: 'Index', link: '/mruh/index' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/riplaboratoryuh' }
    ],

    footer: {
      message: '',
      copyright: 'Copyright © 2026'
    }
  }
})

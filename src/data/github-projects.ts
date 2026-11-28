interface GitHubProject {
  name: string
  repository: string
  description: string
  technologies: string[]
  website?: string
}

export const githubProjects: GitHubProject[] = [
  {
    name: 'Jokoson',
    repository: 'jokoson',
    description: 'A native JSON viewer for macOS and iOS with an expandable tree, key and value search, JSON paths, and local document history.',
    technologies: ['Swift', 'SwiftUI', 'macOS & iOS'],
  },
  {
    name: 'Iris Network Inspector',
    repository: 'iris',
    description: 'An in-app URLSession inspector with a SwiftUI console for requests, responses, headers, and body details. Distributed as a Swift package.',
    technologies: ['Swift', 'URLProtocol', 'Swift Package Manager'],
  },
  {
    name: 'Iris CLI',
    repository: 'iris-cli',
    description: 'A local command-line companion for todos, work logs, Git activity, and repository workflows, backed by SQLite.',
    technologies: ['Rust', 'SQLite', 'Git'],
  },
  {
    name: 'Cubbl',
    repository: 'cubbl',
    description: 'An offline Android tower-stacking game with moving cranes, swaying houses, changing city skies, and physics-driven collapses.',
    technologies: ['C++', 'Android NDK', 'Box2D'],
  },
  {
    name: 'FreeUtang',
    repository: 'Group-3-FC',
    description: 'A team-built iOS receivables tracker with borrower records, debt histories, and payment flows, using local SwiftData storage.',
    technologies: ['Swift', 'SwiftUI', 'SwiftData'],
  },
  {
    name: 'Congrate',
    repository: 'congrate',
    description: 'An iOS gratitude-journal prototype built around daily reflection prompts and local Core Data storage.',
    technologies: ['Swift', 'UIKit', 'Core Data'],
  },
  {
    name: 'PadLab',
    repository: 'padlab',
    description: 'A local-first browser gamepad diagnostics tool with input visualization, saved reports, exports, and session comparisons.',
    technologies: ['Next.js', 'Gamepad API', 'IndexedDB'],
  },
  {
    name: 'SnapPop',
    repository: 'snap-pop',
    description: 'A browser photo booth with camera capture, customizable frame layouts, photo filters, and downloadable photo strips.',
    technologies: ['Next.js', 'TypeScript', 'Canvas'],
    website: 'https://snap-pop-six.vercel.app/',
  },
  {
    name: 'CCTV Crawler',
    repository: 'cctv-crawler',
    description: 'A Python and OpenCV utility for collecting images from Yogyakarta traffic-camera feeds and organizing them by camera location.',
    technologies: ['Python', 'OpenCV', 'Computer Vision'],
  },
]

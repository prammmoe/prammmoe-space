export const profile = {
  name: "Pramuditha Muhammad Ikhwan",
  role: "Software Engineer",
  description:
    "Software engineer focused on iOS, currently at Arya Noble. Experience in mobile development, full stack development, and system analysis.",
  introduction:
    "Hello, I’m Pram. I build apps and keep notes on work, technology, and the things I enjoy.",
  links: {
    linkedin: "https://linkedin.com/in/ikhwanpram",
    github: "https://github.com/prammmoe",
    instagram: "https://instagram.com/ikhwanpramuditha",
    medium: "https://medium.com/@prammmoe",
    leetcode: "https://leetcode.com/prammmoe",
    upwork: "https://www.upwork.com/freelancers/prammmoe",
  },
  experience: [
    {
      organization: "Arya Noble (ERHA Buddy)",
      role: "iOS Developer",
      period: "Mar 2026 – present",
    },
    {
      organization: "4TITU PTE LTD",
      role: "Full Stack Developer",
      period: "Aug 2025 – Feb 2026",
    },
    {
      organization: "Apple Developer Academy @ Infinite Learning Batam",
      role: "iOS Developer",
      period: "Feb 2025 - Dec 2025",
    },
    {
      organization: "PT Widya Inovasi Indonesia",
      role: "System Analyst",
      period: "Aug 2023 - Dec 2023",
    },
  ],
  education: [
    {
      organization: "Apple Developer Academy",
      role: "Learner, Cohort 6",
      period: "2025",
    },
    {
      organization: "Universitas Negeri Yogyakarta",
      role: "Information Technology",
      period: "2021 – 2025",
    },
    {
      organization: "Bangkit Academy",
      role: "Mobile Development",
      period: "2024 – 2025",
    },
  ],
};

export const formatDate = (date: Date, lang = "en") =>
  new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);

export const techStack = [
  { category: 'Languages & iOS SDK', technologies: ['Swift', 'UIKit', 'SwiftUI', 'SnapKit', 'Lottie', 'SkeletonView', 'XIB'] },
  { category: 'Architecture & design', technologies: ['MVVM', 'Clean Architecture', 'Modularization', 'SOLID Principles'] },
  { category: 'Networking & data', technologies: ['REST APIs', 'Alamofire', 'Moya', 'Server-Sent Events', 'RxSwift', 'Realm', 'UserDefaults', 'RxMoya', 'RxReachability', 'ObjectMapper'] },
  { category: 'Platform & integrations', technologies: ['Firebase Crashlytics', 'Firebase Remote Config', 'MoEngage', 'Qiscus', 'Push Notifications', 'Deep Links', 'Realtime Database'] },
  { category: 'Security', technologies: ['Apple App Attest', 'DeviceCheck', 'Keychain', 'HMAC Request Signing', 'RSA Encryption', 'Certificate Pinning'] },
  { category: 'Tools & delivery', technologies: ['Git', 'GitHub', 'Bitbucket', 'GitHub Actions', 'Postman', 'Docker', 'Figma', 'GitKraken', 'FLEX', 'Netfox', 'App Store Connect', 'TestFlight'] },
]

export const technologyLogos: Record<string, string> = {
  Swift: 'swift',
  'Firebase Crashlytics': 'firebase',
  'Firebase Remote Config': 'firebase',
  Git: 'git',
  GitHub: 'github',
  Bitbucket: 'bitbucket',
  'GitHub Actions': 'githubactions',
  Postman: 'postman',
  Docker: 'docker',
  Figma: 'figma',
}

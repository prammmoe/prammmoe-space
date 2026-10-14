module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        'http://localhost/',
        'http://localhost/blog/',
        'http://localhost/blog/getting-to-know-server-sent-events-on-ios/',
        'http://localhost/projects/curated-works-2025/',
        'http://localhost/projects/erha-buddy/',
        'http://localhost/projects/slng/',
        'http://localhost/projects/rooted-dbt/',
      ],
      numberOfRuns: 3,
      settings: { chromeFlags: '--headless --no-sandbox' },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95, aggregationMethod: 'median' }],
        'categories:accessibility': ['error', { minScore: 1, aggregationMethod: 'median' }],
        'categories:best-practices': ['error', { minScore: 0.95, aggregationMethod: 'median' }],
        'categories:seo': ['error', { minScore: 1, aggregationMethod: 'median' }],
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci/reports' },
  },
}

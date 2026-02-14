module.exports = {
  apps: [{
    name: 'portfolio-api',
    script: 'dist/index.js',
    cwd: '/opt/portfolio-api',
    instances: 1,
    exec_mode: 'fork',
    env_production: {
      NODE_ENV: 'production',
      PORT: 4000,
    },
    max_memory_restart: '256M',
    error_file: '/var/log/pm2/portfolio-api-error.log',
    out_file: '/var/log/pm2/portfolio-api-out.log',
    merge_logs: true,
    time: true,
  }],
};

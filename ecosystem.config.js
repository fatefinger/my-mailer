module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // First application
        {
            name: 'start',
            script: './bin/www',
            env: {
                COMMON_VARIABLE: 'true'
            },
            env_production: {
                NODE_ENV: 'production'
            },
            watch: [
                'routes',
                'service',
                'app.js',
                'bin',
                'utils',
                'filter',
                'conf'
            ],
            ignore_watch: [  // 从监控目录中排除
                "node_modules",
                "public",
                'upload'
            ],
            cwd: "./",
            error_file: "./logs/app-err.log",  // 错误日志路径
            out_file: "./logs/app-out.log",  // 普通日志路径
        }
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    // deploy : {
    //   production : {
    //     user : 'node',
    //     host : '212.83.163.1',
    //     ref  : 'origin/master',
    //     repo : 'git@github.com:repo.git',
    //     path : '/var/www/production',
    //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    //   },
    //   dev : {
    //     user : 'node',
    //     host : '212.83.163.1',
    //     ref  : 'origin/master',
    //     repo : 'git@github.com:repo.git',
    //     path : '/var/www/development',
    //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
    //     env  : {
    //       NODE_ENV: 'dev'
    //     }
    //   }
    // }
};

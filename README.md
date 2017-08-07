# nodejs_nodemailer

写给啸豪的邮件定时发送工具
# 准备
去nodejs官网下载安装nodejs 6.XX.XX版本即可，安装后

# 安装
 进入package.json所在目录下执行以下命令，等待安装成功
> npm install


# 运行

> node bin/www


# 配置

 conf/conf.js

# 测试

 routes/index.js 将rule.second取消注释，将rule.hour注释掉，运行后即为每分钟的第20秒发送邮件
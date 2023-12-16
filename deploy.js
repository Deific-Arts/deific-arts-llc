const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

require('dotenv').config();

const config = {
    user: process.env.FTP_DEPLOY_USERNAME,
    // Password optional, prompted if none given
    password: process.env.FTP_DEPLOY_PASSWORD,
    host: process.env.FTP_DEPLOY_HOST,
    port: process.env.FTP_DEPLOY_HOST || 21,
    localRoot: __dirname + "/dist",
    remoteRoot: "/",
    include: ["*.php", "dist/*", ".*"],
    exclude: [
        "dist/**/*.map",
        "node_modules/**",
        "node_modules/**/.*",
        ".git/**",
    ],
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: false,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true,
    // use sftp or ftp
    sftp: false,
};

ftpDeploy
    .deploy(config)
    .then((res) => console.log("finished:", res))
    .catch((err) => console.log(err));

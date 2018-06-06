import config from 'nconf'

config
    .file('../../hbud.config.json');

config.get('env') && (process.env.NODE_ENV = config.get('env'));

process.env.appname = 'server';

export default config;
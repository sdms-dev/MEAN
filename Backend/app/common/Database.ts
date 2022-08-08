import { ExitStatus } from '@common/enum/Server';
import { CONF_ENV, MONGO_APP_URL, MONGO_DEBUG } from '@config/config';
import { logger } from '@utils/logger';
import { connect, connection, set } from 'mongoose';

class Database {
    public count = 0;
    public maxRetry = 5;
    public mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000,
    };

    constructor() {
        if (CONF_ENV !== 'production' && MONGO_DEBUG == 'true') {
            set('debug', true);
            logger.debug('Database connected in debugger mode');
        }
    }

    connectDatabase = async (): Promise<boolean> => {
        try {
            logger.debug('Attempting Database connection');

            connection.once('connected', async () => {
                logger.info('Database is connected');
            });

            connection.once('open', async () => {
                logger.info('Database is ready to use');
            });

            connection.on('error', () => {
                logger.error('Error connecting to database');
            });

            connection.on('disconnected', () => {
                logger.warn(`Database disconnected`);
            });

            connection.on('reconnected', () => {
                logger.info('Database reconnected');
            });

            connection.on('reconnectFailed', () => {
                logger.error('Database reconnectFailed');
            });

            connection.on('fullsetup', () => {
                logger.info('Database reconnecting...');
            });

            await connect(MONGO_APP_URL, this.mongooseOptions);
            return true;
        } catch (err) {
            const retrySeconds = 5;
            logger.warn(`MongoDB connection unsuccessful (will retry #${++this.count} after ${retrySeconds} seconds):`, err);
            if (this.maxRetry <= this.count) {
                setTimeout(this.connectDatabase, retrySeconds * 1000);
            } else {
                process.exit(ExitStatus.Failure);
            }
        }
    };
}

export default new Database();

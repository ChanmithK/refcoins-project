import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService) => ({
  uri:
    configService.get<string>('MONGODB_URI') ||
    'mongodb://localhost:27017/real-estate',
  connectionOptions: {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    bufferMaxEntries: 0,
    retryWrites: true,
    retryReads: true,
    ssl: true,
    tlsAllowInvalidCertificates: false,
  },
});

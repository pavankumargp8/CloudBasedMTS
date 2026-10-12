import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
	PORT: z.coerce.number().default(4000),
	DATABASE_URL: z.string().url(),
	JWT_SECRET: z.string().min(32),
	JWT_EXPIRES_IN: z.string().default('15m'),
	REFRESH_TOKEN_DAYS: z.coerce.number().default(7),
	CORS_ORIGIN: z.string().default('http://localhost:5173'),

	STORAGE_PROVIDER: z.enum(['minio', 's3']).default('minio'),
	MINIO_ENDPOINT: z.string().optional(),
	MINIO_ACCESS_KEY: z.string().optional(),
	MINIO_SECRET_KEY: z.string().optional(),
	MINIO_BUCKET: z.string().optional(),
	AWS_ACCESS_KEY_ID: z.string().optional(),
	AWS_SECRET_ACCESS_KEY: z.string().optional(),
	AWS_REGION: z.string().optional(),
	AWS_S3_BUCKET: z.string().optional(),

	EMAIL_PROVIDER: z.enum(['nodemailer', 'resend']).default('nodemailer'),
	EMAIL_FROM: z.string().default('SCLIP <no-reply@sclip.local>'),
	SMTP_HOST: z.string().optional(),
	SMTP_PORT: z.coerce.number().optional(),
	SMTP_USER: z.string().optional(),
	SMTP_PASS: z.string().optional(),
	RESEND_API_KEY: z.string().optional(),

	TWILIO_ACCOUNT_SID: z.string().optional(),
	TWILIO_AUTH_TOKEN: z.string().optional(),
	TWILIO_FROM_NUMBER: z.string().optional(),

	CRON_SECRET: z.string().min(16).optional(),
	MAX_UPLOAD_MB: z.coerce.number().default(10),
});

export const env = schema.parse(process.env);

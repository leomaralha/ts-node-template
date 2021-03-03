import logColors from 'sequelize-log-syntax-colors';
import { Logger } from '@overnightjs/logger';

export const logger = (text: string): void => Logger.Imp(logColors(text));

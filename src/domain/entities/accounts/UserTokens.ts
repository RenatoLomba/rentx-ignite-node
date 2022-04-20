import {
  compareIfBefore,
  dateUTCNow,
  daysBetweenDates,
  hoursBetweenDates,
} from '@application/shared/utils/date';

import { IUser } from './IUser';

export class UserTokens {
  id?: string;
  refresh_token: string;
  user_id: string;
  expires_date: Date;
  created_at?: Date;
  user?: IUser;

  public daysUntilTokenExpires() {
    return daysBetweenDates(this.expires_date, new Date());
  }

  public hoursUntilTokenExpires() {
    return hoursBetweenDates(this.expires_date, new Date());
  }

  public tokenIsExpired() {
    return compareIfBefore(this.expires_date, dateUTCNow());
  }
}

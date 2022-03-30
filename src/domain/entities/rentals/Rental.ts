import {
  dateUTCNow,
  hoursBetweenDates,
} from '../../../application/shared/utils/date';
import { CreateRentalEnum } from '../../enums/rentals/CreateRentalEnum';

export class Rental {
  id?: string;
  user_id: string;
  car_id: string;
  start_date?: Date;
  end_date?: Date;
  expected_return_date: Date;
  created_at?: Date;
  updated_at?: Date;
  total?: number;

  constructor() {
    if (!this.start_date) {
      this.start_date = dateUTCNow();
    }

    if (!this.total) {
      this.total = 0;
    }
  }

  public isFinished() {
    return !!this.end_date;
  }

  public hasMinimumHoursToReturn() {
    const hoursToReturn = hoursBetweenDates(
      this.expected_return_date,
      this.start_date,
    );

    return hoursToReturn >= CreateRentalEnum.MINIMUM_HOURS_TO_RETURN;
  }
}

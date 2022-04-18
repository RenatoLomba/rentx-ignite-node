import {
  dateUTCNow,
  daysBetweenDates,
  hoursBetweenDates,
} from '../../../application/shared/utils/date';
import { CreateRentalEnum } from '../../enums/rentals/CreateRentalEnum';
import { Car } from '../cars/Car';

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
  car?: Car;

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

  private calculateFine(carFineAmount: number) {
    let fine = 0;

    const delay = this.daysDelayed();

    if (delay > 0) {
      fine = delay * carFineAmount;
    }

    return fine;
  }

  private calculateDailyRate(carDailyRate: number) {
    let dailyInDays = this.daysInRent();

    if (dailyInDays <= 0) {
      dailyInDays = CreateRentalEnum.MINIMUM_DAILY;
    }

    return dailyInDays * carDailyRate;
  }

  public calculateTotal(carDailyRate: number, carFineAmount: number) {
    const fine = this.calculateFine(carFineAmount);
    const dailyRate = this.calculateDailyRate(carDailyRate);

    let total = 0;

    total += dailyRate;
    total += fine;

    return total;
  }

  public hasMinimumHoursToReturn() {
    const hoursToReturn = hoursBetweenDates(
      this.expected_return_date,
      this.start_date,
    );

    return hoursToReturn >= CreateRentalEnum.MINIMUM_HOURS_TO_RETURN;
  }

  public daysInRent() {
    const daysInRent = daysBetweenDates(this.start_date, this.end_date);

    return daysInRent;
  }

  public daysDelayed() {
    const delayDays = daysBetweenDates(
      this.end_date,
      this.expected_return_date,
    );

    return delayDays;
  }
}

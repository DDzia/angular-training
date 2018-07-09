export interface ICourse {
  id: number;
  title: string;
  creationDate: Date;
  durationMin: number;
  description: string;
  topRated: boolean;
}

export class Course implements ICourse {
  id = Date.now();
  title = '';
  creationDate = new Date();
  durationMin = 0;
  description = '';
  topRated: boolean;
}

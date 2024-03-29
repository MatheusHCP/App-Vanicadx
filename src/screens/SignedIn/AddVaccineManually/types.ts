export enum HasSecondShotEnum {
  YES = 'yes',
  NO = 'no',
  SINGLE = 'single',
}

export type HasSecondShot =
  | HasSecondShotEnum.YES
  | HasSecondShotEnum.NO
  | HasSecondShotEnum.SINGLE;

export type Fields =
  | 'name'
  | 'brand'
  | 'applicationDate'
  | 'applicationLocation'
  | 'nextApplicationDate'
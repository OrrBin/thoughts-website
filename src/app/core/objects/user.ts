export class User {
  userId: String;
  username: String;
  birthday: number;
  gender: Gender;

  constructor(userId: String, username: String, birthday: number, gender: Gender) {
    this.userId = userId;
    this.username = username;
    this.birthday = birthday;
    this.gender = gender;
  }
}

export enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}

export class UserIndex {
  userId: String;
  username: String;

  constructor(userId: String, username: String) {
    this.userId = userId;
    this.username = username;
  }
}

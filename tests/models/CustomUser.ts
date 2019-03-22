import { User } from '../../src/models/index';

export class CustomUser extends User {
  // tslint:disable-next-line:variable-name
  public custom_claim: string;
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    deviceToken: `token-${i + 1}`,
  }));

  getAllUsers() {
    return this.users;
  }
}
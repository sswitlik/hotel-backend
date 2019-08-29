import { Entity } from 'typeorm';
import { User } from '../user.entity';

@Entity()
export class Guest extends User {

  // @OneToOne(type => Client, client => client.guest, { cascade: true })
  // @JoinColumn()
  // client: Client;
}

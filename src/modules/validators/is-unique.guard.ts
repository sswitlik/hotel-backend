import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Connection } from 'typeorm';

interface UniqunessData {
  entity: any;
  property: string;
}

export const UniquenessRepo = (data: UniqunessData) => SetMetadata('uniqueness', data);

@Injectable()
export class IsUniqueGuard<T> implements CanActivate {
  constructor(private readonly reflector: Reflector,
              private connection: Connection) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const data = this.reflector.get<UniqunessData>('uniqueness', context.getHandler());
    const value = context.switchToHttp().getRequest().body[data.property];
    const repo = this.connection.getRepository(data.entity);

    return !(await repo.findOne({ where: { [data.property]: value } }));
  }
}

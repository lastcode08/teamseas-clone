import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PrismaService } from 'src/common/services/prisma.service';
import { OrderByParams } from 'src/graphql';
import { CreateDonationInput } from './dto/create-donation.input';

const pubSub = new PubSub();

@Injectable()
export class DonationsService {
  constructor(private readonly db: PrismaService) {}

  async create(dto: CreateDonationInput) {
    const result = await this.db.donation.create({
      data: dto,
    });

    const total = await this.getTotal();

    pubSub.publish('totalUpdated', { totalUpdated: { total } });

    return result;
  }

  findAll(orderBy?: OrderByParams) {
    const { field = 'createdAt', direction = 'desc' } = orderBy || {};

    return this.db.donation.findMany({
      orderBy: {
        [field]: direction,
      },
    });
  }

  findOne(uniqueInput: Prisma.DonationWhereUniqueInput) {
    return this.db.donation.findUnique({
      where: uniqueInput,
    });
  }

  async getTotal() {
    const donations = await this.db.donation.aggregate({
      _sum: {
        count: true,
      },
    });

    return donations._sum.count;
  }

  subscribeTotalUpdated() {
    return pubSub.asyncIterator('totalUpdated');
  }
}

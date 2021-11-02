import { Donation } from '.prisma/client';
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { OrderByParams } from 'src/graphql';
import { DonationsService } from './donations.service';
import { CreateDonationInput } from './dto/create-donation.input';

@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @Mutation('createDonation')
  create(
    @Args('createDonationInput') dto: CreateDonationInput,
  ): Promise<Donation> {
    return this.donationsService.create(dto);
  }

  @Query('donations')
  findAll(@Args('orderBy') orderBy?: OrderByParams): Promise<Donation[]> {
    return this.donationsService.findAll(orderBy);
  }

  @Query('donation')
  findOne(@Args('id') id: string): Promise<Donation> {
    return this.donationsService.findOne({
      id,
    });
  }

  @Query('totalDonations')
  totalDonations() {
    return this.donationsService.getTotal();
  }

  @Subscription()
  totalUpdated() {
    return this.donationsService.subscribeTotalUpdated();
  }
}

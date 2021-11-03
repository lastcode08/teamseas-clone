export const totalDonationQuery = `
  query Query {
    totalDonations
  }
`;

export const donationsQUery = `
query Query($orderBy: OrderByParams) {
  donations(orderBy: $orderBy) {
    id
    count
    email
    displayName
    mobile
    team
    message
    createdAt
  }
  totalDonations
}
`;

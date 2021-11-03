import { Col, Image, Layout, Row, Spin, Typography } from "antd";
import { useQuery, useSubscription } from "urql";
import "./App.css";
import { Counter } from "./components/Counter";
import { Leaderboard } from "./components/Leaderboard";
import { totalDonationQuery } from "./graphql/queries";
import { totalUpdatedSubscription } from "./graphql/subscriptions";

const { Title } = Typography;

function App() {
  const [{ data, fetching }] = useQuery({
    query: totalDonationQuery,
  });

  const [totalUpdateSubscriptionResponse] = useSubscription(
    { query: totalUpdatedSubscription },
    (prev: any, result: any) => result?.totalUpdated?.total
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Row justify="center">
        <Col span={24} style={{ textAlign: "center" }}>
          <Image
            src="https://assets01.teamassets.net/assets/images/teamseas-tm-logo.png"
            preview={false}
          />
          <br />

          <Title level={1}>JOIN THE MOVEMENT!</Title>

          <Title level={2}>
            Help us remove 30 million pounds of trash by January 1st, 2022.
          </Title>

          <Title>
            {fetching ? (
              <Spin />
            ) : (
              <Counter
                from={0}
                to={totalUpdateSubscriptionResponse.data || data.totalDonations}
              />
            )}
          </Title>

          <Leaderboard />
        </Col>
      </Row>
    </Layout>
  );
}

export default App;

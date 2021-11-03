import { Card, Divider, List, Skeleton, Typography } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "urql";
import { donationsQUery } from "../../graphql/queries";
import { IDonation } from "../../types";
import { LeaderboardItem } from "./LeaderboardItem";

interface ILeaderBoardProps {}

interface ILeaderboardState {
  data: IDonation[];
  field: string;
}

type donationsQueryResult = {
  donations: IDonation[];
  totalDonations: number;
};

export const Leaderboard = (props: ILeaderBoardProps) => {
  const [state, setState] = useState<ILeaderboardState>({
    field: "createdAt",
    data: [],
  });

  const [{ data, fetching, error }] = useQuery<donationsQueryResult>({
    query: donationsQUery,
    variables: {
      orderBy: {
        field: state.field,
        direction: "desc",
      },
    },
  });

  const loadMoreData = () => {
    if (fetching) {
      return;
    }

    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then(() => {
        setState({ ...state });
      })
      .catch(() => {
        setState({ ...state });
      });
  };

  useEffect(() => loadMoreData(), []);

  const { data: donations } = state;

  return (
    <Card
      title={<Typography.Title level={1}>Leaderboard</Typography.Title>}
      style={{
        width: 800,
        margin: "auto",
        padding: 0,
      }}
    >
      <h1>{data?.donations.length}</h1>

      <Card
        bordered={false}
        id="scrollableDiv"
        style={{
          height: 280,
          overflow: "auto",
          padding: "0 50px",
          margin: "auto",
        }}
      >
        <InfiniteScroll
          dataLength={data?.donations.length || 0}
          next={loadMoreData}
          // hasMore={(data?.donations.length || 0) < 50}
          hasMore={false}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          {error ? (
            <p>Something went wrong...</p>
          ) : fetching || !data ? (
            <Skeleton />
          ) : (
            <List
              dataSource={data?.donations}
              renderItem={(item) => <LeaderboardItem donation={item} />}
            />
          )}
        </InfiniteScroll>
      </Card>
    </Card>
  );
};

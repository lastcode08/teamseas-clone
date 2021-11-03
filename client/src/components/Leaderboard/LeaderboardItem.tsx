import { Avatar, List, Tag } from "antd";
import { IDonation } from "../../types";

interface ILeaderboardItemProps {
  donation: IDonation;
}

export function LeaderboardItem(props: ILeaderboardItemProps) {
  const { donation } = props;

  return (
    <List.Item key={donation.id}>
      <List.Item.Meta
        style={{ textAlign: "left" }}
        avatar={
          <Avatar src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        }
        title={<>{donation.displayName}</>}
        description={donation?.message}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tag style={{ marginRight: 0, marginBottom: 10 }} color="success">
          <b>{donation.count} pounds</b>
        </Tag>
        <small>10/29/2021, 10:31 AM</small>
      </div>
    </List.Item>
  );
}

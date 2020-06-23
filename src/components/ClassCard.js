import React from 'react';
import './ClassCard.css';
import { Card, Avatar } from 'antd';
import { useRecoilValue } from 'recoil';
import { authState } from '../utils';

const { Meta } = Card;

function ClassCard() {

  const username = useRecoilValue(authState);

  return (
    <div>
      <Card
        style={{ marginTop: 30, marginBottom: 30, borderLeft: 'solid rgb(0, 128, 32)'}}
        >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={username}
        />
        <hr></hr>
        <Meta
          title="Internet of Things"
          description="5:30 PM - 9:30 PM"
        />
      </Card>
    </div>

  )
}

export default ClassCard;
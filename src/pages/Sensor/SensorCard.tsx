import React, { useState, useEffect } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import axios from "axios";
import { IUser } from "modules/auth/types";

interface SensorData {
  id: number;
  name: string;
  status: number;
  serial_number: string;
  last_verification: string | null;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export const SensorCard = () => {
  const host = import.meta.env.VITE_API_HOST;
  const [loading, setLoading] = useState<boolean>(true);
  const [sensorData, setSensorData] = useState<SensorData | null>(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")!) as IUser;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const getSensorData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${host}/v1/device/user/${user.id}`,
          config
        );

        setSensorData(response.data);
      } catch (error) {
        //
      } finally {
        setLoading(false);
      }
    };

    getSensorData();
  }, []);

  const actions: React.ReactNode[] = [<EditOutlined key="edit" />];

  return (
    <div className="flex justify-center">
      <Card
        loading={loading}
        actions={actions}
        cover={
          <img
            alt="example"
            src="images/modelosensor.png"
          />
        }
        className="max-w-[300px]"
      >
        <Card.Meta
          avatar={
            <Avatar src="images/arduino-logo.png" />
          }
          title={sensorData?.name}
          description={
            <>
              <p>NS: {sensorData?.serial_number}</p>
              <p>Status: {sensorData?.status}</p>
            </>
          }
        />
      </Card>
    </div>
  );
};

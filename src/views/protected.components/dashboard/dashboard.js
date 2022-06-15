import React from "react";
import StatsCard from "./statsCard";
import MedalCard from "./medalCard";
import { Row, Col } from "reactstrap";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { profile } = useSelector((state) => state.app);

  return (
    <div>
      <Helmet>
        <title>Dashboard | JSONONE</title>
        <meta name="description" content="JSONONE" />
      </Helmet>
      <div id="dashboard-ecommerce">
        <Row className="match-height">
          <Col xl="4" md="6" xs="12">
            <MedalCard userData={profile} />
          </Col>
          <Col xl="8" md="6" xs="12">
            <StatsCard cols={{ xl: "3", sm: "6" }} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
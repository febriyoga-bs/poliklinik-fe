import React from 'react'
import { Row, Col, Typography, Modal } from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;

const DetailObat = (props) => {
    return (
        <Modal
            destroyOnClose={true}
            visible={props.visible}
            className="informasi-card"
            footer={null}
            closable={true}
            onCancel={props.buttonCancel}
            centered
            width="600px"
            height="300px"
            style={{borderRadius:30}}
        >

        <Title level={3} style={{textAlign: "center", color: "#072A6F"}}>
            DETAIL OBAT
        </Title>

        <Row>
          <Col span={8}>
            <Text> Nama Obat </Text>
          </Col>
          <Col span={1}>
            <Text> : </Text>
          </Col>
          <Col span={8}>
            {props.dataObat.namaObat}
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Text> Jumlah Obat </Text>
          </Col>
          <Col span={1}>
            <Text> : </Text>
          </Col>
          <Col span={8}>
            {props.dataObat.jumlah}
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Text> Komposisi </Text>
          </Col>
          <Col span={1}>
            <Text> : </Text>
          </Col>
          <Col span={8}>
            {props.dataObat.komposisi}
          </Col>
        </Row>
        </Modal>
    )
}

export default DetailObat
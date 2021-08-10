import React from 'react'
import { Row, Col, Typography, Modal } from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;

const DetailPasien = (props) => {
    let tanggal_lahir = moment(props.dataPasien.tanggal_lahir, 'YYYY-MM-DD');

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
            DETAIL PASIEN
        </Title>

        <Row>
          <Col span={8}>
            <Text> Nama </Text>
          </Col>
          <Col span={1}>
            <Text> : </Text>
          </Col>
          <Col span={8}>
            {props.dataPasien.nama}
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Text> Kode Pasien </Text>
          </Col>
          <Col span={1}>
            <Text> : </Text>
          </Col>
          <Col span={8}>
            {props.dataPasien.kode_pasien}
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Text> Nomor Identitas </Text>
          </Col>
          <Col span={1}>
            <Text> : </Text>
          </Col>
          <Col span={8}>
            {props.dataPasien.no_identitas}
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Text> Nomor Telepon </Text>
          </Col>
          <Col span={1}>
            <Text> : </Text>
          </Col>
          <Col span={8}>
            {props.dataPasien.no_telepon}
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Text> Kategori </Text>
          </Col>
          <Col span={1}>
            <Text> : </Text>
          </Col>
          <Col span={8}>
            {props.dataPasien.kategori}
          </Col>
        </Row>

        {props.dataPasien.kategori==="Mahasiswa" &&
          <div>
            <Row>
            <Col span={8}>
              <Text> Jurusan </Text>
            </Col>
            <Col span={1}>
              <Text> : </Text>
            </Col>
            <Col span={8}>
              {props.dataPasien.jurusan}
            </Col>
            </Row>
          
            <Row>
              <Col span={8}>
                <Text> Program Studi </Text>
              </Col>
              <Col span={1}>
                <Text> : </Text>
              </Col>
              <Col span={8}>
                {props.dataPasien.prodi}
              </Col>
            </Row>
          </div>
        }

        <Row>
          <Col span={8}>
            <Text> Tanggal Lahir </Text>
          </Col>
          <Col span={1}>
            <Text> : </Text>
          </Col>
          <Col span={8}>
            {tanggal_lahir.format('DD-MM-YYYY')}
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Text> Jenis Kelamin </Text>
          </Col>
          <Col span={1}>
            <Text> : </Text>
          </Col>
          <Col span={8}>
            {props.dataPasien.jenis_kelamin}
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Text> Alamat</Text>
          </Col>
          <Col span={1}>
            <Text> : </Text>
          </Col>
          <Col span={8}>
            {props.dataPasien.alamat}
          </Col>
        </Row>
        </Modal>
    )
}

export default DetailPasien
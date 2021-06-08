import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Card, Typography, Form, Input, Upload, Button, message } from 'antd';
import { HomeOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Text } = Typography;

const FormDataDokter = (props) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        console.log(props.location)
        if(props.location.state){
          form.setFieldsValue(props.location.state);
        }else{
          form.resetFields()
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onFinish= (values) => {
        setLoading(true);

    }

    const UploadProps = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
    
    return(
        <Layout style={{backgroundColor: "#072A6F"}}>
        <Content className="layout-content">
        <Breadcrumb style={{marginLeft:40, marginBottom:20}}>
                <Breadcrumb.Item href="/">
                    <Text className="title">
                        <HomeOutlined />
                    </Text>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/profil-staf">
                    <Text className="title">
                        Admin
                    </Text>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/kelola-data-pengguna/dokter">
                    <Text className="title">
                        Kelola Data Dokter
                    </Text>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Text className="title">
                        {props.match.params.aksi === "ubah-data" ? "Ubah Data" : "Tambah Data"}
                    </Text>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row justify="center">
            <Card className="form-card" style={{width: 400, textAlign:"left"}}>
                <Row>
                        <Text className="title-tabel">
                            {props.match.params.aksi === "ubah-data" ? "Ubah Data" : "Tambah Data"}
                        </Text>
                    </Row>
                <Form form={form} name="control-hooks" onFinish={onFinish}>
                    <Row justify="center">
                        <Col span={24}>
                                <Text className="title-label">ID Dokter</Text>
                                <Form.Item name="id_dokter" >
                                        <Input className="input-form secondary" disabled/>
                                </Form.Item>

                                <Text className="title-label">Nomor Telepon</Text>
                                <Form.Item name="no_telepon">
                                        <Input className="input-form secondary" disabled/>
                                </Form.Item>

                                <Text className="title-label">Foto</Text>
                                <Form.Item name="avatar" rules={[{ required: true }]}>
                                    <Upload {...UploadProps}>
                                        <Button>
                                            <UploadOutlined /> Unggah Foto
                                        </Button>
                                    </Upload>
                                </Form.Item>

                                <Text className="title-label">Nama Dokter</Text>
                                <Form.Item name="nama" rules={[{ required: true }]}>
                                        <Input className="input-form secondary" />
                                </Form.Item>

                                <Text className="title-label">Spesialisasi</Text>
                                        <Form.Item name="spesialisasi" rules={[{ required: true }]}>
                                            <Input className="input-form secondary" />
                                        </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Button className="app-btn tertiary" onClick={()=> {history.goBack()}}>
                            Cancel
                        </Button>
                        &nbsp;
                        <Button className="app-btn secondary" 
                            type="primary"
                            htmlType="submit"
                            disabled={loading}
                        >
                            {loading && <LoadingOutlined />}
                            Submit
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Row>
        </Content>
        </Layout>
    );
    
}

export default withRouter(FormDataDokter)
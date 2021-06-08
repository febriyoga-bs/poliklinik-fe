import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Card, Typography, Form, Input, Upload, Button, message } from 'antd';
import { HomeOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Text } = Typography;

const FormProfilPoliklinik = (props) => {
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
                <Breadcrumb.Item href="/kelola-informasi">
                    <Text className="title">
                        Kelola Informasi
                    </Text>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Text className="title">
                        Ubah Profil Poliklinik
                    </Text>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row justify="center">
            <Card className="form-card" style={{width:800, textAlign:"left"}}>
                <Row style={{marginBottom:20}}>
                    <Text className="title-tabel">
                        Ubah Profil Poliklinik
                    </Text>
                </Row>
                <Form form={form} name="control-hooks" onFinish={onFinish}>
                    <Row justify="center">
                        <Col span={24}>
                                <Text className="title-label">Gambar</Text>
                                <Form.Item name="gambar" >
                                    <Upload {...UploadProps}>
                                        <Button>
                                            <UploadOutlined /> Unggah Gambar
                                        </Button>
                                    </Upload>
                                </Form.Item>

                                <Text className="title-label">Deskripsi</Text>
                                <Form.Item name="deskripsi">
                                    <Input.TextArea className="input-form secondary" />
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

export default withRouter(FormProfilPoliklinik)
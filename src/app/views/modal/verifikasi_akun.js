import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { Row, Typography, Modal, Form, Input, Button, message } from 'antd';
import { NumberOutlined, LoadingOutlined } from '@ant-design/icons';
import { APIServices } from '../../service'
import Auth from '../../service/auth'

const { Title, Text } = Typography;

const VerifikasiOTP = (props) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinishVerifikasi = (values) =>{
        setLoading(true);
        let body = {
            no_identitas: props.data.no_identitas,
            kode_otp: values.kode_otp,
        }
        APIServices.verifikasi(body).then(res => {
            setLoading(false);
            if(res.data){
                message.success("Verifikasi Berhasil")
                localStorage.setItem('no_identitas', JSON.stringify(props.data.no_identitas));
                localStorage.setItem('no_telepon', JSON.stringify(props.data.no_telepon));
                localStorage.setItem('role', JSON.stringify(props.data.role));
                localStorage.setItem('token', JSON.stringify(props.data.token));
                localStorage.setItem('login', JSON.stringify(props.data.login));
            }

            if(Auth.isLogin()){
                if (props.data.role/props.data.login === 3){
                    history.push('/dashboard-pasien');
                }
            }
          }).catch(err => {
            setLoading(false);
            if(err){
                message.error("Verifikasi Gagal")
            }
          })
    }

    return (
        <Modal
            destroyOnClose={true}
            visible={props.visible}
            className="informasi-card"
            footer={null}
            maskClosable={false}
            closable={true}
            onCancel={props.buttonCancel}
            centered
            width="400px"
            height="300px"
            style={{borderRadius:30}}
        >

        <Title level={3} style={{textAlign: "center", color: "#072A6F"}}>
            Verifikasi Akun
        </Title>

        <Row justify="center">
            <Text style={{textAlign:"center"}}>
                Kode verifikasi akun telah dikirim melalui SMS ke <br></br>
                <b>{props.data.no_telepon}</b>
            </Text>
        </Row>

        <Row justify="center">
            <Form form={form} onFinish={onFinishVerifikasi}>
                <Form.Item
                        name="kode_otp"
                        required
                        rules={[
                        {
                            required: true,
                            message: 'Harap masukkan Kode OTP!'
                        },
                        {
                            pattern: new RegExp('^[0-9]+$'),  
                            message: 'Harap hanya masukkan angka!',
                        }]}
                        style={{marginBottom:10}}
                        >
                        
                        <Input className="input-form" 
                            max={5}
                            placeholder={"5 digit angka"}
                            prefix={<NumberOutlined />}
                        />
                    </Form.Item>
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        className="app-btn lg block secondary"
                        style={{width:290}}
                        disabled={loading}
                    >
                        {loading && <LoadingOutlined />}
                        Verifikasi
                    </Button>
                </Form>
        </Row>

        </Modal>
    )
}

export default VerifikasiOTP
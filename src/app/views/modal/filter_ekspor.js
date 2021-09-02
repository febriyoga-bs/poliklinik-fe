import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { Row, Typography, Modal, Form, Select, Button, message } from 'antd';
import { NumberOutlined, LoadingOutlined } from '@ant-design/icons';
import { APIServices } from '../../service'
import Auth from '../../service/auth'
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;

const FilterEkspor = (props) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [rangeYear, setRangeYear] = useState([]);
    const currentYear = moment().format('YYYY')

    const eksporRiwayatKunjungan = (values) => {
        let body = {
            bulan: values.bulan ? values.bulan : "",
            tahun: values.tahun ? Number(values.tahun) : ""
        }
        console.log("body: ", body)
        setLoading(true);

        if(props.title === "Data Pasien"){
            APIServices.getExportDataPasien(body).then(res => {
                if(res.data){
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    //let tanggal = moment().format('DD-MM-YYYY')
                    link.setAttribute('download', `Data_Pasien(${body.bulan}-${body.tahun}).xlsx`); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    setLoading(false)
                }
            }).catch(err => {
                if(err){
                    console.log(err.response)
                    setLoading(false)
                }
            })
        } else {
            APIServices.getExportRiwayatKunjungan(body).then(res => {
                if(res.data){
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    // let tanggal = moment().format('DD-MM-YYYY')
                    link.setAttribute('download', `Data_Riwayat_Kunjungan(${body.bulan}-${body.tahun}).xlsx`); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    setLoading(false)
                }
            }).catch(err => {
                if(err){
                    console.log(err.response)
                    setLoading(false)
                }
            })
        }
    }

    useEffect(()=>{
        let arr = []
        for(let i = 2018; i<=currentYear; i++){
            arr.push({tahun: i})
        }

        setRangeYear(arr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
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
            Ekspor {props.title}
        </Title>

        <Row justify="center">
            <Form form={form} onFinish={eksporRiwayatKunjungan}>
                <Text className="title-label">Bulan</Text>
                <Form.Item
                    name="bulan"
                    required
                    style={{marginBottom:30}}
                    >
                    <Select defaultValue="Semua" className="input-form">
                        <Option value="">Semua</Option>
                        <Option value={1}>Januari</Option>
                        <Option value={2}>Februari</Option>
                        <Option value={3}>Maret</Option>
                        <Option value={4}>April</Option>
                        <Option value={5}>Mei</Option>
                        <Option value={6}>Juni</Option>
                        <Option value={7}>Juli</Option>
                        <Option value={8}>Agustus</Option>
                        <Option value={9}>September</Option>
                        <Option value={10}>Oktober</Option>
                        <Option value={11}>November</Option>
                        <Option value={12}>Desember</Option>
                    </Select>
                </Form.Item>
                <Text className="title-label">Tahun</Text>
                <Form.Item
                    name="tahun"
                    required
                    style={{marginBottom:30}}
                    >
                    <Select defaultValue="Semua" className="input-form">
                        <Option value="">Semua</Option>
                        {rangeYear.map(res => {
                            return <Option value={res.tahun}>{res.tahun}</Option>
                        })}
                        
                    </Select>
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
                    Ekspor Data
                </Button>
            </Form>
        </Row>

        </Modal>
    )
}

export default FilterEkspor
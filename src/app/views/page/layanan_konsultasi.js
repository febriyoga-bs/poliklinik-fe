import React, {useState, useEffect} from "react";
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Typography, Card, Menu, Image, Form, Input, Button } from 'antd';
import { HomeOutlined, SendOutlined, PaperClipOutlined} from '@ant-design/icons';
import { APIServices }  from '../../service';
import CONFIG from '../../service/config';

const { Content } = Layout;
const { Text } = Typography;

const Konsultasi = () => {
    const [dataDokter, setDataDokter] = useState(null)
    const [formPesanInput] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState(0);
    const [menukey, setMenuKey] = useState(0);

    useEffect(()=>{
        let _role = JSON.parse(localStorage.getItem('role'));
        let login_time = JSON.parse(localStorage.getItem('login'));
        setRole(_role/login_time)

        console.log(_role/login_time)
        if(_role/login_time === 2){

        } else if(_role/login_time === 3){
            getDataDokter();
        } 
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataDokter = () => {
        setLoading(true);
        APIServices.getAllDokter().then(res => {
                if(res.data){
                    setDataDokter(res.data.data);
                    console.log(res.data.data)
                    setLoading(false)
                }
            }).catch(err => {
                if(err){
                    //setDataDokter(Dummy.dataDokter);
                    console.log(err.response)
                    setLoading(false)
                }
            })
        }
    
    const onFinishPesan = () => {
        console.log("Pesan dikirim!")
    }

    return(
        <Layout style={{backgroundColor: "#072A6F"}}>
            <Content className="layout-content-new">
                <Breadcrumb style={{marginTop: 10, marginLeft:40, marginBottom:20, color:"#FFF"}} separator=">">
                    <Breadcrumb.Item href="/">
                        <Text className="title">
                            <HomeOutlined />
                        </Text>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/konsultasi-online">
                        <Text className="title">
                            <span>Konsultasi Online</span>
                        </Text>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{marginBottom:20, marginRight:20}}>
                    <Card className="konsultasi-card" style={{width:"100%", minHeight: 500, marginLeft:40}}>
                        {/* RUANG KONSULTASI PASIEN */}
                        {(role === 3 && !!dataDokter) &&
                        <Row>
                        <Col span={6}>
                            <Row>
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>List Dokter</Text>
                            </Row>
                            <Menu
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                            >
                                {dataDokter.map((res, idx) =>{
                                    return(
                                        <Menu.Item key={idx} onClick={(item) => {console.log(item); setMenuKey(Number(item.key))}}>
                                            <Row>
                                                <Image
                                                    style={{marginTop:5, marginRight:10, width: 30, height: 30, borderRadius: 90}}
                                                    alt={res.avatar}
                                                    src={CONFIG.BASE_URL+"/"+res.avatar}
                                                />
                                                <Text style={{color:"#EB3D00"}}>{res.spesialisasi==="Umum" ? "dr. " : "drg. "} {res.nama}</Text>
                                            </Row>
                                        </Menu.Item>
                                    )
                                })}
                            </Menu>
                        </Col>
                        <div style={{height: "100%", borderLeft:"3px solid #8F8F8F"}}></div>
                        <Col span={17}>
                            <Row>
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>Ruang Konsultasi</Text>
                            </Row>
                            <Row>
                                <Image
                                    style={{marginTop:5, marginRight:10, width: 30, height: 30, borderRadius: 90}}
                                    alt={dataDokter[menukey].avatar}
                                    src={CONFIG.BASE_URL+"/"+dataDokter[menukey].avatar}
                                />
                                <Text style={{color:"#EB3D00", marginTop:5}}>{dataDokter[menukey].spesialisasi==="Umum" ? "dr. " : "drg. "} {dataDokter[menukey].nama}</Text>
                            </Row>
                            <div style={{width: "100%", borderBottom:"3px solid #8F8F8F", marginTop: 10, marginBottom: 30}}></div>
                            <Row style={{height: 300}}>
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}></Text>
                            </Row>
                            <Row>
                                <Form form={formPesanInput} onFinish={onFinishPesan}>
                                    <Form.Item name="alamat">
                                        <Input style={{minWidth: 300, width: 450, borderRadius: 10}}
                                            placeholder="Ketik pesan anda . . ."
                                        />
                                    </Form.Item>
                                </Form>
                                <Button type="text" onClick={()=>{console.log("ATTACH FILE")}} >
                                    <Text>
                                        <PaperClipOutlined style={{fontSize:25, color: "#EB3D00"}}/>
                                    </Text>
                                </Button>
                                <Button type="text" htmlType="submit" >
                                    <Text>
                                        <SendOutlined style={{fontSize:25, color: "#EB3D00"}}/>
                                    </Text>
                                </Button>
                            </Row>
                        </Col>
                        </Row>
                        }
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(Konsultasi)
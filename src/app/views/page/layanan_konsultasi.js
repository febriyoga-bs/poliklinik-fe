import React, {useState, useEffect} from "react";
import { withRouter } from 'react-router-dom';
import 'react-chat-elements/dist/main.css';
import { MessageList } from 'react-chat-elements'
import { Layout, Row, Col, Breadcrumb, Typography, Card, Menu, Image, Form, Input, Button } from 'antd';
import { HomeOutlined, SendOutlined, PaperClipOutlined} from '@ant-design/icons';
import { APIServices }  from '../../service';
import CONFIG from '../../service/config';

const { Content } = Layout;
const { Text } = Typography;

const Konsultasi = () => {
    const [dataDokter, setDataDokter] = useState(null)
    const [dataPasien, setDataPasien] = useState(null)
    const [dataPesan, setDataPesan] = useState([
            {
                position: 'left',
                type: 'text',
                text: 'Lorem ipsum dolor sit amet, ',
                date: new Date(),
            },
            {
                position: 'right',
                type: 'text',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
                date: new Date(),
            },
    ])
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
            getKonsultasi();
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
    
    const getKonsultasi = () => {
        setLoading(true);
        APIServices.getKonsultasi({id_dokter: 1, id_pasien: null}).then(res => {
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
        
    const getPesan = () => {
        setLoading(true);
        APIServices.getPesan().then(res => {
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
    
    const onFinishPesan = (values) => {
        if(values.pesan !== undefined && values.pesan !== " "){
            console.log("list pesan: ", dataPesan)
            let _dataPesan = [...dataPesan];
            _dataPesan.push(
                {
                    position: 'right',
                    type: 'text',
                    text: values.pesan,
                    date: new Date(),
                }
            )
            setDataPesan(_dataPesan)
        }
        
        formPesanInput.resetFields()
    }

    useEffect(()=>{
        console.log("Pesan dikirim!", dataPesan)
    }, [dataPesan])

    return(
        <Layout style={{backgroundColor: "#072A6F", minWidth:700, minHeight:"100vh"}}>
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
                    <Card className="konsultasi-card" bodyStyle={{padding:0}} style={{width:"100%", minHeight: 500, marginLeft:40}}>
                        {/* RUANG KONSULTASI PASIEN */}
                        {(role === 3) &&
                        <Row>
                        <Col span={7}>
                            <Row style={{marginLeft:20, marginTop: 10}}>
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>List Dokter</Text>
                            </Row>
                            {!!dataDokter &&
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
                            }
                        </Col>
                        <Col span={17} style={{height: 500, borderLeft:"4px solid #8F8F8F", backgroundColor:"#F8F8F8"}}>
                            <Row style={{marginLeft:20, marginTop: 10}}>
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>Ruang Konsultasi</Text>
                            </Row>
                            {!!dataDokter && 
                            <Row style={{marginLeft:20}}>
                                <Image
                                    style={{marginTop:5, marginRight:10, width: 30, height: 30, borderRadius: 90}}
                                    alt={dataDokter[menukey].avatar}
                                    src={CONFIG.BASE_URL+"/"+dataDokter[menukey].avatar}
                                />
                                <Text style={{color:"#EB3D00", marginTop:5}}>{dataDokter[menukey].spesialisasi==="Umum" ? "dr. " : "drg. "} {dataDokter[menukey].nama}</Text>
                            </Row>
                            }
                            <div style={{width: "100%", borderBottom:"4px solid #8F8F8F", marginTop: 10, marginBottom: 20}}></div>
                            <Row style={{height: 340, overflowY:"scroll", marginBottom: 10, backgroundColor:"#F8F8F8"}}>
                            <MessageList
                                className='message-list'
                                lockable={false}
                                toBottomHeight={'100%'}
                                dataSource={dataPesan} 
                                />
                            </Row>
                            <Row style={{marginLeft:20}}>
                                <Form form={formPesanInput} onFinish={onFinishPesan}>
                                    <Row style={{width: "100%"}}>
                                    <Form.Item name="pesan">
                                        <Input style={{width:500, borderRadius: 10}}
                                            placeholder="Ketik pesan anda . . ."
                                        />
                                    </Form.Item>
                                
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
                                </Form>
                            </Row>
                        </Col>
                        </Row>
                        }
                        {/* RUANG KONSULTASI DOKTER */}
                        {(role === 2) &&
                        <Row>
                        <Col span={7}>
                            <Row > 
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>List Pasien</Text>
                            </Row>
                            {!!dataPasien && 
                            <Menu
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                            >
                                {dataPasien.map((res, idx) =>{
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
                            }
                        </Col>
                        <div style={{height: 500, borderLeft:"4px solid #8F8F8F"}}></div>
                        <Col span={17}>
                            <Row style={{marginLeft:20}}>
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}>Ruang Konsultasi</Text>
                            </Row>
                            {!!dataPasien && 
                            <Row style={{marginLeft:20}}>
                                <Image
                                    style={{marginTop:5, marginRight:10, width: 30, height: 30, borderRadius: 90}}
                                    alt={dataPasien[menukey].avatar}
                                    src={CONFIG.BASE_URL+"/"+dataPasien[menukey].avatar}
                                />
                                <Text style={{color:"#EB3D00", marginTop:5}}>{dataPasien[menukey].nama}</Text>
                            </Row>
                            }
                            <div style={{width: "150%", borderBottom:"3px solid #8F8F8F", marginTop: 10, marginBottom: 30}}></div>
                            <Row style={{height: 300}}>
                                <Text style={{color:"#EB3D00", fontWeight:"bold"}}></Text>
                            </Row>
                            <Row style={{marginLeft:20}}>
                                <Form form={formPesanInput} onFinish={onFinishPesan}>
                                    <Form.Item name="pesan">
                                        <Input style={{minWidth: 300, width: 450, borderRadius: 10}}
                                            placeholder="Ketik pesan anda . . ."
                                        />
                                    </Form.Item>
                                
                                    <Button type="text" onClick={()=>{console.log("ATTACH FILE")}} >
                                        <Text>
                                            <PaperClipOutlined style={{fontSize:25, color: "#EB3D00"}}/>
                                        </Text>
                                    </Button>
                                    <Form.Item>
                                    <Button type="primary" htmlType="submit" >
                                        <Text>
                                            <SendOutlined style={{fontSize:25, color: "#EB3D00"}}/>
                                        </Text>
                                    </Button>
                                    </Form.Item>
                                </Form>
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
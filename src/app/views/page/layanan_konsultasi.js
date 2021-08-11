import React, {useState, useEffect} from "react";
import { withRouter } from 'react-router-dom';
import 'react-chat-elements/dist/main.css';
import { MessageList } from 'react-chat-elements'
import { Layout, Row, Col, Breadcrumb, Typography, Card, Menu, Image, Form, Input, Button } from 'antd';
import { HomeOutlined, SendOutlined, PaperClipOutlined} from '@ant-design/icons';
import { APIServices }  from '../../service';
import CONFIG from '../../service/config';
import moment from 'moment';

const { Content } = Layout;
const { Text } = Typography;

const Konsultasi = () => {
    const [dataDokter, setDataDokter] = useState(null)
    const [dataPasien, setDataPasien] = useState(null)
    const [dataKonsultasi, setDataKonsultasi] = useState([])
    const [dataPesan, setDataPesan] = useState([])
    const [formPesanInput] = Form.useForm();
    const [loadingKonsultasi, setLoadingKonsultasi] = useState(false)
    const [loadingPesan, setLoadingPesan] = useState(false)
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
    
    const getKonsultasi = (id_dokter, id_pasien) => {
        setLoadingKonsultasi(true);
        APIServices.getKonsultasi({id_dokter: id_dokter, id_pasien: id_pasien}).then(res => {
                if(res.data){
                    getPesan(res.data.data[0].id_konsultasi)
                    setDataKonsultasi(res.data.data);
                    console.log(res.data.data)
                    setLoadingKonsultasi(false)
                }
            }).catch(err => {
                if(err){
                    //setDataDokter(Dummy.dataDokter);
                    console.log(err.response)
                    setLoadingKonsultasi(false)
                }
            })
        }
        
    const getPesan = (id_konsultasi) => {
        setLoadingPesan(true);
        APIServices.getPesan(id_konsultasi).then(res => {
                if(res.data){
                    let _dataPesan = [];
                    res.data.data[0].pesan.forEach((val) => {
                        let _position = ""

                        if(role === 3 && val.pengirim === "pasien"){
                            _position =  'right'
                        } else if(role === 2 && val.pengirim === "dokter"){
                            _position = 'right'
                        } else {
                            _position = 'left'
                        }

                        _dataPesan.push(
                            {
                                position: _position,
                                type: val.type,
                                text: val.pesan,
                                date: moment(val.created_at, 'YYYY-MM-DD HH:mm:ss').toDate(),
                            }
                        )
                    })
                    setDataPesan(_dataPesan);
                    console.log(res.data.data)
                    setLoadingPesan(false)
                }
            }).catch(err => {
                if(err){
                    //setDataDokter(Dummy.dataDokter);
                    console.log(err.response)
                    setLoadingPesan(false)
                }
            })
        }
    
    const handleGantiRuangKonsultasi = (key, data) => {
        setMenuKey(key); 
        setDataPesan([])
        setDataKonsultasi([])
        if(role === 2){
            getKonsultasi(JSON.parse(localStorage.getItem('id_dokter'), data.id_pasien))
        } else if (role === 3){
            getKonsultasi(data.id_dokter, JSON.parse(localStorage.getItem('id_pasien')))
        }
        console.log("data: ", data)
    } 

    const buatKonsultasi = () => {
        let body = {
            
        }
        APIServices.postKonsultasi({body}).then(res => {
            if(res.data){

            }
          }).catch(err => {
            if(err){
                // dialog({icon: "error", title:"Gagal Mengirim Pesan!"}).then(()=>{
                //     console.log(err);
                // })
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
                    status: "waiting"
                }
            )
            setDataPesan(_dataPesan)

            let body = {
                id_konsultasi: dataKonsultasi[0].id_konsultasi,
                pesan: values.pesan,
                type: "text"
            }
            APIServices.postPesan(body).then(res => {
                if(res.data){
                    console.log("Pesan berhasil dikirim!");
                    getPesan(dataKonsultasi[0].id_konsultasi)
                }
              }).catch(err => {
                if(err){
                    // dialog({icon: "error", title:"Gagal Mengirim Pesan!"}).then(()=>{
                    //     console.log(err);
                    // })
                }
              })
        }
        
        formPesanInput.resetFields()
    }

    useEffect(()=>{
        console.log("dataPesan: ", dataPesan)
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
                                {/* LIST DOKTER */}
                                <Row style={{marginLeft:20, marginTop: 10}}>
                                    <Text style={{color:"#EB3D00", fontWeight:"bold"}}>List Dokter</Text>
                                </Row>
                                {!!dataDokter &&
                                <Menu
                                    defaultSelectedKeys={['0']}
                                    mode="inline"
                                >
                                    {dataDokter.map((res, idx) =>{
                                        return(
                                            <Menu.Item key={idx} onClick={(item) => {console.log(item); handleGantiRuangKonsultasi(Number(item.key), res);}}>
                                                <Row>
                                                    <Image
                                                        style={{marginTop:5, marginRight:10, width: 30, height: 30, borderRadius: 90}}
                                                        alt={res.avatar}
                                                        src={CONFIG.BASE_URL+"/"+res.avatar}
                                                        preview={false}
                                                    />
                                                    <Text style={{color:"#EB3D00"}}>{res.spesialisasi==="Umum" ? "dr. " : "drg. "} {res.nama}</Text>
                                                </Row>
                                            </Menu.Item>
                                        )
                                    })}
                                </Menu>
                                }
                            </Col>

                            {/* RUANG KONSULTASI */}
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
                                
                                {   loadingKonsultasi ?
                                    <Row justify="center" align="middle" style={{width:"100%", height: 340, overflowY:"scroll", marginBottom: 10, backgroundColor:"#F8F8F8"}}>
                                        <Col>
                                        <Row justify="center">    
                                            <Text>
                                                Memuat data konsultasi . . . 
                                            </Text>
                                        </Row>
                                        </Col>
                                    </Row>
                                : (dataKonsultasi.length !== 0) ? 

                                    /* LIST PESAN */
                                    (loadingPesan) ?
                                        <Row justify="center" align="middle" style={{width:"100%", height: 340, overflowY:"scroll", marginBottom: 10, backgroundColor:"#F8F8F8"}}>
                                            <Col>
                                            <Row justify="center">    
                                                <Text>
                                                    Memuat data pesan . . . 
                                                </Text>
                                            </Row>
                                            </Col>
                                        </Row>
                                    :
                                        <>
                                        <Row style={{width:"100%",height: 340, overflowY:"scroll", marginBottom: 10, backgroundColor:"#F8F8F8"}}>
                                            <MessageList
                                                className='message-list'
                                                lockable={false}
                                                toBottomHeight={'100%'}
                                                dataSource={dataPesan} 
                                                style={{width:500}}
                                                />
                                        </Row>
                                        
                                        <Row style={{marginLeft:20}}>
                                            <Form form={formPesanInput} onFinish={onFinishPesan}>
                                                <Row style={{width: "100%"}}>
                                                <Form.Item name="pesan">
                                                    <Input style={{width:500, borderRadius: 10}} focus={true} autoFocus={true}
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
                                        </>
                                    /*END OF LIST PESAN */
                                :
                                    (!!dataDokter) &&
                                    <Row justify="center" align="middle" style={{width:"100%", height: 340, overflowY:"scroll", marginBottom: 10, backgroundColor:"#F8F8F8"}}>
                                        <Col>
                                        <Row justify="center">    
                                            <Text>
                                                Anda belum pernah melakukan konsultasi dengan 
                                                <b>{dataDokter[menukey].spesialisasi==="Umum" ? " dr. " : " drg. "}
                                                {dataDokter[menukey].nama}</b>
                                            </Text>
                                        </Row>
                                        <Row justify="center">
                                            <Button type='primary' className="app-btn secondary" info style={{marginTop: 10}} 
                                                loading={loading}
                                                onClick={() => {
                                                    buatKonsultasi();
                                                }}
                                                >
                                                Konsultasi Sekarang
                                            </Button>
                                        </Row>
                                        </Col>
                                    </Row>
                                }
                            </Col>
                            </Row>
                        }


                        {/* RUANG KONSULTASI DOKTER */}
                        {(role === 2) &&
                            <Row>
                            <Col span={7}>
                                {/* LIST PASIEN */}
                                <Row style={{marginLeft:20, marginTop: 10}}>
                                    <Text style={{color:"#EB3D00", fontWeight:"bold"}}>List Pasien</Text>
                                </Row>
                                {!!dataPasien &&
                                <Menu
                                    defaultSelectedKeys={['0']}
                                    mode="inline"
                                >
                                    {dataPasien.map((res, idx) =>{
                                        return(
                                            <Menu.Item key={idx} onClick={(item) => {console.log(item); handleGantiRuangKonsultasi(Number(item.key), res);}}>
                                                <Row>
                                                    <Image
                                                        style={{marginTop:5, marginRight:10, width: 30, height: 30, borderRadius: 90}}
                                                        alt={res.avatar}
                                                        src={CONFIG.BASE_URL+"/"+res.avatar}
                                                        preview={false}
                                                    />
                                                    <Text style={{color:"#EB3D00"}}>{res.spesialisasi==="Umum" ? "dr. " : "drg. "} {res.nama}</Text>
                                                </Row>
                                            </Menu.Item>
                                        )
                                    })}
                                </Menu>
                                }
                            </Col>

                            {/* RUANG KONSULTASI */}
                            <Col span={17} style={{height: 500, borderLeft:"4px solid #8F8F8F", backgroundColor:"#F8F8F8"}}>
                                <Row style={{marginLeft:20, marginTop: 10}}>
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
                                <div style={{width: "100%", borderBottom:"4px solid #8F8F8F", marginTop: 10, marginBottom: 20}}></div>
                                
                                {   loadingKonsultasi ?
                                    <Row justify="center" align="middle" style={{width:"100%", height: 340, overflowY:"scroll", marginBottom: 10, backgroundColor:"#F8F8F8"}}>
                                        <Col>
                                        <Row justify="center">    
                                            <Text>
                                                Memuat data konsultasi . . . 
                                            </Text>
                                        </Row>
                                        </Col>
                                    </Row>
                                : (dataKonsultasi.length !== 0) ? 

                                    /* LIST PESAN */
                                    (loadingPesan) ?
                                        <Row justify="center" align="middle" style={{width:"100%", height: 340, overflowY:"scroll", marginBottom: 10, backgroundColor:"#F8F8F8"}}>
                                            <Col>
                                            <Row justify="center">    
                                                <Text>
                                                    Memuat data pesan . . . 
                                                </Text>
                                            </Row>
                                            </Col>
                                        </Row>
                                    :
                                        <>
                                        <Row style={{width:"100%",height: 340, overflowY:"scroll", marginBottom: 10, backgroundColor:"#F8F8F8"}}>
                                            <MessageList
                                                className='message-list'
                                                lockable={false}
                                                toBottomHeight={'100%'}
                                                dataSource={dataPesan} 
                                                style={{width:500}}
                                                />
                                        </Row>
                                        
                                        <Row style={{marginLeft:20}}>
                                            <Form form={formPesanInput} onFinish={onFinishPesan}>
                                                <Row style={{width: "100%"}}>
                                                <Form.Item name="pesan">
                                                    <Input style={{width:500, borderRadius: 10}} focus={true} autoFocus={true}
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
                                        </>
                                    /*END OF LIST PESAN */
                                :
                                    (!!dataDokter) &&
                                    <Row justify="center" align="middle" style={{width:"100%", height: 340, overflowY:"scroll", marginBottom: 10, backgroundColor:"#F8F8F8"}}>
                                        <Col>
                                        <Row justify="center">    
                                            <Text>
                                                Anda belum pernah melakukan konsultasi dengan 
                                                <b>{dataDokter[menukey].spesialisasi==="Umum" ? " dr. " : " drg. "}
                                                {dataDokter[menukey].nama}</b>
                                            </Text>
                                        </Row>
                                        <Row justify="center">
                                            <Button type='primary' className="app-btn secondary" info style={{marginTop: 10}} 
                                                loading={loading}
                                                onClick={() => {
                                                    buatKonsultasi();
                                                }}
                                                >
                                                Konsultasi Sekarang
                                            </Button>
                                        </Row>
                                        </Col>
                                    </Row>
                                }
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
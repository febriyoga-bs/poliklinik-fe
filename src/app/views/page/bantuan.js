import React from "react";
import { withRouter, NavLink } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Typography, Collapse } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Text } = Typography;
const { Panel } = Collapse;

const Bantuan = () => {

    return(
        <Layout style={{backgroundColor: "#072A6F", minWidth: 700}}>
            <Content className="layout-content">
                <Breadcrumb style={{marginTop: 20, marginLeft:40, marginBottom:20, color:"#FFF"}} separator=">">
                    <Breadcrumb.Item>
                        <NavLink to="/">
                        <Text className="title">
                            <HomeOutlined />
                        </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <NavLink to="/bantuan">
                        <Text className="title">
                            <span>Bantuan</span>
                        </Text>
                        </NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{minHeight:600, marginBottom:20, marginRight:20, marginLeft: 40, fontWeight:"bold"}} justify="center">
                    <Col style={{width:"100%"}}>
                    <Collapse defaultActiveKey={['1', '2', '3']}>
                        <Panel header="Pendaftaran Pasien" key="1">
                            <Collapse defaultActiveKey="1">
                                <Panel header="Siapa saja yang dapat mendaftar sebagai pasien poliklinik?" key="1">
                                    <p>
                                        1. Mahasiswa POLBAN<br/>
                                        (Menunjukkan kartu mahasiswa POLBAN)<br/>
                                        2. Dosen/Staf POLBAN<br/>
                                        (Menyampaikan nomor induk pegawai atau nomor induk kepegawaian POLBAN)<br/>
                                        3. Masyarakat Umum <br/>
                                        (Menunjukkan KTP)
                                    </p>
                                </Panel>
                                <Panel header="Bagaimana cara melakukan pendaftaran sebagai pasien poliklinik secara online?" key="2">
                                    <p>
                                        1. Buka halaman login pada web<br/>
                                        2. Tekan tombol daftar yang tertulis di dalam formulir login<br/>
                                        3. Isi formulir pendaftaran pasien pada web sesuai data diri pasien<br/>
                                        4. Lakukan verifikasi pendaftaran dengan login menggunakan akun yang baru didaftarkan<br/>
                                        5. Masukkan kode verifikasi pendaftaran sesuai dengan sms yang dikirim ke nomor telepon 
                                    </p>
                                </Panel>
                            </Collapse>
                        </Panel>
                        <Panel header="Ambil Nomor Antrean" key="2">
                            <Collapse defaultActiveKey="1">
                                <Panel header="Bagaimana cara mengambil nomor antrean secara online?" key="1">
                                    <p> 
                                        1. Anda perlu login menggunakan akun yang Anda miliki<br/>
                                        2. Buka halaman layanan antrean poliklinik<br/>
                                        3. Tekan tombol ambil antrean<br/>
                                        4. Jika proses berhasil maka Nama Anda akan berada dalam list antrean poliklinik
                                    </p>
                                </Panel>
                                <Panel header="Apakah pasien bisa mendapatkan nomor antrean secara langsung di poliklinik?" key="2">
                                    <p> 
                                        Ya, jika sudah terdaftar di poliklinik pasien bisa mendapatkan nomor antrean dengan 
                                        menunjukkan kartu identitasnya kepada petugas poliklinik<br/>
                                    </p>
                                </Panel>
                                <Panel header="Kapan pasien dapat mengambil nomor antrean?" key="3">
                                    <p> 
                                        Pasien hanya dapat mengambil nomor antrean 1 (satu) jam sebelum jam buka poliklinik hingga 1 (satu) jam sebelum jam tutup poliklinik
                                    </p>
                                </Panel>
                            </Collapse>
                        </Panel>
                        <Panel header="Konsultasi Online" key="3">
                            <Collapse defaultActiveKey="1">
                                <Panel header="Bagaimana cara melakukan konsultasi online?" key="1">
                                    <p> 
                                        1. Anda perlu login menggunakan akun yang Anda miliki.<br/>
                                        2. Buka halaman layanan konsultasi online<br/>
                                        3. Pilih dokter yang tersedia<br/>
                                        4. Tekan tombol mulai konsultasi<br/>
                                        5. Tulis pesan konsultasi yang ingin Anda sampaikan kepada Dokter<br/>
                                        6. Tunggu pesan tanggapan dari dokter
                                    </p>
                                </Panel>
                                <Panel header="Kapan pasien dapat melakukan konsultasi online?" key="2">
                                    <p> 
                                        Pasien hanya dapat melakukan konsultasi pada jam pelayanan poliklinik
                                    </p>
                                </Panel>
                            </Collapse>
                        </Panel>
                    </Collapse>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(Bantuan)
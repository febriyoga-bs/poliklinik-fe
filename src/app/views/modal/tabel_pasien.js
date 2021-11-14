import React, {useState, useEffect}  from "react"
import { Row, Col, Typography, Modal, Table, Input, Select } from 'antd';
import { APIServices }  from '../../service';
import moment from 'moment';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const TabelPasien = (props) => {
    const [dataPasien, setDataPasien] = useState([]);
    const [loading, setLoading] = useState(false)
    const [searchKey, setSearchKey] = useState("");
    const [filterKey, setFilterKey] = useState("");
    const [pagination, setPagination] = useState({current:1, pageSize:5, total:10});

    useEffect(()=>{
        getDataPasien(searchKey, filterKey, pagination.current,  pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKey, filterKey]);

    const getDataPasien = (nama, kategori, current, limit) => {
        setLoading(true);
        APIServices.getAllDataPasien(nama, kategori, current, limit)
            .then(res => {
                if(res.data){
                    let _data = Object.values(res.data.data)
                    let _meta = _data.pop()
                    console.log("Pagination: ", _meta)
                    setPagination({
                        current: _meta.pagination.current_page,
                        pageSize: _meta.pagination.per_page,
                        total: _meta.pagination.total
                    })
                    _data.forEach((item, idx) => {
                        _data[idx].no = ((current-1)*limit) + (idx+1);
                    })
                    setDataPasien(_data);
                    setLoading(false)
                }
            })
            .catch(err => {
                if(err){
                    //setDataPasien(Dummy.dataPasien);
                    console.log(err.response)
                    setLoading(false)
                }
            })
        }

    const handleTableChange = (_pagination) =>{
        getDataPasien(searchKey, filterKey, _pagination.current, _pagination.pageSize)
    }

    const columnsPasien = [
        {
            title: "No.",
            dataIndex: 'no',
            key: 'no',
            width: '20',
            align: 'center',
            sorter: (a, b) => a.no - b.no,
        },
        {
            title: "Kode Pasien",
            dataIndex: 'kode_pasien',
            key: 'kode_pasien',
            width: '20',
            align: 'center',
            sorter: (a, b) => a.kode_pasien - b.kode_pasien,
        },
        {
            title: "Nama Pasien",
            dataIndex: 'nama',
            key: 'nama',
            width: '20',
            align: 'center',
            sorter: (a, b) => a.nama - b.nama,
        },
        {
            title: "Kategori",
            dataIndex: 'kategori',
            key: 'kategori',
            width: '20',
            align: 'center',
            sorter: (a, b) => a.nama - b.nama,
        },
        {
            title: "Usia",
            dataIndex: 'tanggal_lahir',
            key: 'tanggal_lahir',
            align: 'center',
            sorter: (a, b) => a.tanggal_lahir - b.tanggal_lahir,
            render: (value) => {
                let usia = moment().diff(moment(value, 'YYYY-MM-DD'), 'years');;

                return (
                    <Text>{usia}</Text>
                )
            } 
        },
    ]

    const rowSelection = {
        type:"radio",
        selectedRowKeys:[props.setSelectedPasien]
    };

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
            style={{borderRadius:30}}
        >
            <Title level={3} style={{textAlign: "center", color: "#072A6F"}}>
                PILIH PASIEN
            </Title>

            <Row style={{width:"100%"}}>
                    <Col>
                        <Search 
                            allowClear
                            placeholder="Cari berdasarkan Nama Pasien" 
                            onChange={(e)=> setSearchKey(e.target.value)} 
                            style={{ width: 300, maxWidth:"90%", marginLeft: 20, marginBottom: 20, borderRadius: 20}}
                        />
                    </Col>
                    <Col>
                        <Select
                            allowClear
                            placeholder="Filter berdasarkan Kategori Pasien"
                            onChange={(val) => setFilterKey(val)}
                            style={{ width: 300, maxWidth:"90%", marginLeft: 20, marginBottom: 20, borderRadius: 20}}
                        >
                            <Option value="Umum">Umum</Option>
                            <Option value="Mahasiswa">Mahasiswa</Option>
                            <Option value="Staf/Dosen">Staf/Dosen</Option>
                            <Option value="Keluarga Staf/Dosen">Keluarga Staf/Dosen</Option>
                        </Select>
                    </Col>
                </Row>

            <Table
                columns={columnsPasien}
                size="middle"
                bordered={false}
                loading={loading}
                dataSource={dataPasien}
                pagination={{...pagination, showSizeChanger: true}}
                onChange={handleTableChange}
                scroll={{ x: 500 }}
                rowSelection={rowSelection}
                onRow={(data, index) => {
                    return {
                        onClick: () => {
                            console.log(data)
                            props.setSelectedPasien(data)
                            props.buttonCancel()
                        }
                    }
                }}
                style={{cursor: "pointer"}}
            />
        </Modal>
    )
}

export default TabelPasien
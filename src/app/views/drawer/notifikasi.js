import React from 'react'
import { Drawer, Row, Typography } from 'antd'

const { Text } = Typography;

const NotifikasiDrawer = props => {
    console.log(props)

    return(
        <Drawer
            destroyOnClose={true}
            visible={props.visible}
            title="Notifikasi"
            placement="right"
            closable={true}
            footer={null}
            width="300px"
            onClose={props.buttonCancel}
            bodyStyle={{backgroundColor:"#072A6F"}}
            headerStyle={{height: 85, backgroundColor:"#EB3D00", alignItems:"center"}}
        >
            {props.listNotifikasi ?
                (props.listNotifikasi.map((item, idx) => 
                    <Row>
                        {idx}
                    </Row>
                ))
                :
                <Row>
                    <Text style={{color: "#FFF"}}>
                        Tidak ada notifikasi untuk Anda
                    </Text>
                </Row>
            }
        </Drawer>
    )
}

export default NotifikasiDrawer
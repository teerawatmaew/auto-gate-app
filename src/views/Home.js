import { Fragment, useEffect, useState } from 'react'
import { Search, Home as HomeFeather, ChevronDown, Grid, ChevronsDown, Users, User } from 'react-feather'
import { Card, CardBody, CardText, Input, InputGroupAddon, InputGroupText, InputGroup, Col, Row, Table, Button, Alert, CardHeader, Badge } from 'reactstrap'
import searchBackground from '../assets/images/background/passport-bg.png'
import axios from 'axios'
import moment from "moment"
import 'moment/locale/th'
import { toBuddhistYear } from '@utils'
import DataTable from 'react-data-table-component'
const baseURL = process.env.REACT_APP_SERVER_URL

const Home = () => {
    const [id, setId] = useState('')
    const [userList, setUserList] = useState([])

    const indexCell = (row, index, col) => {
        return <span style={{ fontSize: '16px' }}>{index + 1}</span>
    }

    const nameCell = (row, index, col) => {
        return <span style={{ fontSize: '16px' }}>{`${row?.fname_en || ''} ${row?.lname_en || ''}`}</span>
    }

    const genderCell = (row, index, col) => {
        return <span style={{ fontSize: '16px' }}>{row?.sex || "ไม่พบข้อมูล"}</span>
    }

    const nationCell = (row, index, col) => {
        return <span style={{ fontSize: '16px' }}>{row?.country_code || "ไม่พบข้อมูล"}</span>
    }

    const birthCell = (row, index, col) => {
        return <span style={{ fontSize: '16px' }}>{`${row?.date_of_birth ? toBuddhistYear(moment(row?.date_of_birth, 'DDMMYYYY').locale('th'), 'D MMMM YYYY') : "ไม่พบข้อมูล"}`}</span>
    }

    const passportCell = (row, index, col) => {
        return <span style={{ fontSize: '16px' }}>{row?.passport_no || "ไม่พบข้อมูล"}</span>
    }
    
    const dateRecordCell = (row, index, col) => {
        return <span style={{ fontSize: '16px' }}>{`${row?.date_of_recording ? toBuddhistYear(moment(row?.date_of_recording, 'DDMMYYYY').locale('th'), 'D MMMM YYYY') : "ไม่พบข้อมูล"}`}</span>
    }

    const datePermissionCell = (row, index, col) => {
        return <span style={{ fontSize: '16px' }}>{`${row?.date_of_permission_stay ? toBuddhistYear(moment(row?.date_of_permission_stay, 'DDMMYYYY').locale('th'), 'D MMMM YYYY') : '-'}`}</span>
    }

    const overStayCell = (row, index, col) => {
        return <Badge color={row?.is_over_stay === 'Y' ? 'light-danger' : 'light-primary'} pill>{`${row?.is_over_stay ? (row?.is_over_stay === 'Y' ? 'เกินกำหนด' : 'ไม่เกินกำหนด') : '-'}`}</Badge>
        //<span style={{ fontSize: '16px' }}>{`${row?.is_over_stay ? (row?.is_over_stay === 'Y' ? 'เกินกำหนด' : 'ไม่เกินกำหนด') : '-'}`}</span>
    }

    const titleCol = (text) => {
        return <h4>{text}</h4>
    }

    const basicColumns = [
        {
            name: titleCol('ลำดับ'),
            cell: indexCell,
            center: true,
            width: '80px'
        },
        {
            name: titleCol('เลขที่หนังสือเดินทาง'),
            cell: passportCell,
            center: true,
            minWidth: '150px'
        },
        {
            name: titleCol('สัญชาติ'),
            cell: nationCell,
            center: true,
            width: '90px'
        },
        {
            name: titleCol('ชื่อ นามสกุล'),
            cell: nameCell,
            center: true,
            width: '280px'
        },
        {
            name: titleCol('วันเดือนปีเกิด'),
            cell: birthCell,
            center: true,
            minWidth: '175px'
        },
        {
            name: titleCol('วันที่เข้าเมือง'),
            cell: dateRecordCell,
            center: true,
            minWidth: '175px'
        },
        {
            name: titleCol('อนุญาตพำนักถึงวันที่'),
            cell: datePermissionCell,
            center: true,
            minWidth: '175px'
        },
        {
            name: titleCol('สถานะอยู่เกินกำหนด'),
            cell: overStayCell,
            minWidth: '150px',
            center: true
        }
        // {
        //     name: 'เพศ',
        //     cell: genderCell,
        //     minWidth: '120px'
        // },
    ]

    const getPassportData = (id) => {
        axios.post(`${baseURL}/POCAutoChannel/api/ServiceGate/CheckPassportEntryAutoGate`, { passport_no: id })
            .then((res) => {
                if (res.status === 200) {
                    //console.log(res?.data)
                    setUserList(res?.data)
                }
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        if (id !== '' && id?.length === 9) {
            getPassportData(id)
        }
    }, [id])

    return (
        <div>
            <Row className='ml-25 mb-1'>
                <Button.Ripple color='flat-dark'>
                    <HomeFeather size={14} />
                    <span className='align-middle mx-50'>หน้าหลัก</span>
                    <ChevronDown color='gray' size={14} />
                </Button.Ripple>
                {/* <Button.Ripple color='primary'>
                    <Grid size={14} />
                    <span className='align-middle mx-50'>ตรวจสอบตราประทับฯ</span>
                    <ChevronDown size={14} />
                </Button.Ripple> */}
            </Row>

            <Card className='text-center' style={{ backgroundImage: `url(${searchBackground})`, backgroundColor: '#ece9f5' }}>
                <CardBody>
                    <CardText style={{ fontSize: '20px' }} className='font-weight-bolder'>ตรวจสอบตราประทับอนุญาตให้พำนักในราชอาณาจักร</CardText>
                    <Row>
                        <Col xs={{ size: 6, offset: 3 }}>
                            <InputGroup className='input-group-merge mb-2'>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <Search size={14} />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type='text'
                                    placeholder='AC123456789..'
                                    maxLength={9}
                                    onChange={(e) => {
                                        if (e.target?.value?.length === 9) {
                                            setId(e.target?.value)
                                        } else {
                                            setId('')
                                        }
                                    }}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    {/* <CardText>ใช้สำหรับตรวจสอบข้อมูลตราประทับอนุญาตให้พำนักในราชอาณาจักร</CardText> */}
                </CardBody>
            </Card>
            <Row>
                {userList?.length > 0 && (
                    <Col xs='12'>
                        <Card className='mb-1'>
                            <CardHeader>พบข้อมูลจำนวน {userList?.length} รายการ {userList?.length > 1 ? <Users /> : <User /> }</CardHeader>
                            <DataTable
                                noHeader
                                //pagination
                                data={userList}
                                columns={basicColumns}
                                className='react-dataTable'
                                //sortIcon={<ChevronsDown size={10} />}
                                //paginationRowsPerPageOptions={[10, 25, 50, 100]}
                            />
                        </Card>
                    </Col>
                    // userList?.map((userData, index) => {
                    //     return (
                    //         <Col xs='6'>
                    //             <Card style={{ minHeight: '500px' }}>
                    //                 <CardBody>
                    //                     <Table size="sm" borderless responsive>
                    //                         <tbody>
                    //                             <tr>
                    //                                 <td width="200px" height='50px' className='text-muted text-align-top'><h2>{`รายการที่ ${index + 1}`}</h2></td>
                    //                             </tr>
                    //                             <tr>
                    //                                 <td width="200px" className='font-weight-bolder'><h3>ชื่อ นามสกุล</h3></td>
                    //                                 <td><span><h3>{`${userData?.fname_en || ''} ${userData?.lname_en || ''}`}</h3></span></td>
                    //                             </tr>
                    //                             <tr>
                    //                                 <td width="200px" className='font-weight-bolder'><h3>เพศ</h3></td>
                    //                                 <td><span><h3>{userData?.sex || "ไม่พบข้อมูล"}</h3></span></td>
                    //                             </tr>
                    //                             <tr>
                    //                                 <td width="200px" className='font-weight-bolder'><h3>สัญชาติ</h3></td>
                    //                                 <td><span><h3>{userData?.country_code || "ไม่พบข้อมูล"}</h3></span></td>
                    //                             </tr>
                    //                             <tr>
                    //                                 <td width="200px" className='font-weight-bolder'><h3>วันเดือนปีเกิด</h3></td>
                    //                                 <td><span><h3>{`${userData?.date_of_birth ? toBuddhistYear(moment(userData?.date_of_birth, 'DDMMYYYY').locale('th'), 'D MMMM YYYY') : "ไม่พบข้อมูล"}`}</h3></span></td>
                    //                             </tr>
                    //                             <tr>
                    //                                 <td width="200px" className='font-weight-bolder'><h3>เลขที่หนังสือเดินทาง</h3></td>
                    //                                 <td><span><h3>{userData?.passport_no || "ไม่พบข้อมูล"}</h3></span></td>
                    //                             </tr>
                    //                             <tr>
                    //                                 <td width="200px" className='font-weight-bolder'><h3>วันที่เข้าเมือง</h3></td>
                    //                                 <td><span><h3>{`${userData?.date_of_recording ? toBuddhistYear(moment(userData?.date_of_recording, 'DDMMYYYY').locale('th'), 'D MMMM YYYY') : "ไม่พบข้อมูล"}`}</h3></span></td>
                    //                             </tr>
                    //                             <tr>
                    //                                 <td width="200px" className='font-weight-bolder'><h3>อนุญาตพำนักถึงวันที่</h3></td>
                    //                                 <td><span><h3>{`${userData?.date_of_permission_stay ? toBuddhistYear(moment(userData?.date_of_permission_stay, 'DDMMYYYY').locale('th'), 'D MMMM YYYY') : '-'}`}</h3></span></td>
                    //                             </tr>
                    //                             <tr>
                    //                                 <td width="200px" className='font-weight-bolder'><h3>สถานะอยู่เกินกำหนด</h3></td>
                    //                                 <td><span><h3>{`${userData?.is_over_stay ? (userData?.is_over_stay === 'Y' ? 'เกินกำหนด' : 'ไม่เกินกำหนด') : '-'}`}</h3></span></td>
                    //                             </tr>
                    //                         </tbody>
                    //                     </Table>
                    //                 </CardBody>
                    //             </Card>
                    //         </Col>
                    //     )
                    // })
                )}
            </Row>
            {userList?.length === 0 && id?.length > 0 &&
                <Row>
                    <Col xs='12'>
                        <Alert color='danger' className='w-100 mb-0'>
                            <div className='alert-body p-2'>ไม่พบข้อมูลตราประทับอนุญาตให้พำนักในราชอาณาจักร กรุณาตรวจสอบใหม่</div>
                        </Alert>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default Home

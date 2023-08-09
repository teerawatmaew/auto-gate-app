import { useEffect, useState } from 'react'
import { Search, Home as HomeFeather, ChevronDown, Grid } from 'react-feather'
import { Card, CardBody, CardText, Input, InputGroupAddon, InputGroupText, InputGroup, Col, Row, Table, Button, Alert } from 'reactstrap'
import Avatar from '@components/avatar'
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import searchBackground from '../assets/images/background/passport-bg.png'
import axios from 'axios'
import moment from "moment"
import 'moment/locale/th'
import { toBuddhistYear } from '@utils'
const baseURL = process.env.REACT_APP_SERVER_URL

const Home = () => {
    const [id, setId] = useState('')
    const [userData, setUserData] = useState([])

    const getPassportData = (id) => {
        axios.post(`${baseURL}/POCAutoChannel/api/ServiceGate/CheckPassportEntryAutoGate`, { passport_no: id })
            .then((res) => {
                if (res.status === 200) {
                    //console.log(res?.data)
                    setUserData(res?.data)
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
                <Button.Ripple color='primary'>
                    <Grid size={14} />
                    <span className='align-middle mx-50'>ตรวจสอบตราประทับฯ</span>
                    <ChevronDown size={14} />
                </Button.Ripple>
            </Row>

            <Card className='text-center' style={{ backgroundImage: `url(${searchBackground})`, backgroundColor: '#ece9f5' }}>
                <CardBody>
                    <CardText style={{ fontSize: '20px' }} className='font-weight-bolder'>ตรวจสอบตราประทับฯ</CardText>
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
                    <CardText>ใช้สำหรับตรวจสอบข้อมูลตราประทับอนุญาตให้พำนักในราชอาณาจักร</CardText>
                </CardBody>
            </Card>
            {userData?.is_datafound === 'Y' && (
                <Row>
                    <Col xs='4'>
                        <Card style={{ minHeight: '500px' }}>
                            <CardBody className='text-center'>
                                <img height='160' width='130' className='shadow m-1 cursor-default'
                                    src={userData?.bio_face_live ? `data:image;base64,${userData?.bio_face_live}` : defaultAvatar} color='primary' />
                                {/* <Avatar img={defaultAvatar} className='shadow m-1' color='primary' size='xl' /> */}
                                <div className='text-center'>
                                    <h4>{`${userData?.fname_en || ''} ${userData?.lname_en || ''}`}</h4>
                                    <span>{userData?.passport_no || "-"}</span>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs='8'>
                        <Card style={{ minHeight: '500px' }}>
                            <CardBody>
                                <Table size="sm" borderless responsive>
                                    <tbody>
                                        <tr>
                                            <td width="200px" height='50px' className='text-muted text-align-top'>ข้อมูลส่วนตัว</td>
                                        </tr>
                                        <tr>
                                            <td width="200px" className='font-weight-bolder'>ชื่อ นามสกุล</td>
                                            <td><span>{`${userData?.fname_en || ''} ${userData?.lname_en || ''}`}</span></td>
                                        </tr>
                                        <tr>
                                            <td width="200px" className='font-weight-bolder'>เพศ</td>
                                            <td><span>{userData?.sex || "ไม่พบข้อมูล"}</span></td>
                                        </tr>
                                        <tr>
                                            <td width="200px" className='font-weight-bolder'>สัญชาติ</td>
                                            <td><span>{userData?.country_code || "ไม่พบข้อมูล"}</span></td>
                                        </tr>
                                        <tr>
                                            <td width="200px" className='font-weight-bolder'>วันเดือนปีเกิด</td>
                                            <td><span>{`${userData?.date_of_birth ? toBuddhistYear(moment(userData?.date_of_birth, 'DDMMYYYY').locale('th'), 'D MMMM YYYY') : "ไม่พบข้อมูล"}`}</span></td>
                                        </tr>
                                        <tr>
                                            <td width="200px" className='font-weight-bolder'>เลขที่หนังสือเดินทาง</td>
                                            <td><span>{userData?.passport_no || "ไม่พบข้อมูล"}</span></td>
                                        </tr>
                                        <tr>
                                            <td width="200px" className='font-weight-bolder'>วันที่เข้าเมือง</td>
                                            <td><span>{`${userData?.date_of_recording ? toBuddhistYear(moment(userData?.date_of_recording, 'DDMMYYYY').locale('th'), 'D MMMM YYYY') : "ไม่พบข้อมูล"}`}</span></td>
                                        </tr>
                                        <tr>
                                            <td width="200px" className='font-weight-bolder'>อนุญาตพำนักถึงวันที่</td>
                                            <td><span>{`${userData?.date_of_permission_stay ? toBuddhistYear(moment(userData?.date_of_permission_stay, 'DDMMYYYY').locale('th'), 'D MMMM YYYY') : '-'}`}</span></td>
                                        </tr>
                                        <tr>
                                            <td width="200px" className='font-weight-bolder'>สถานะอยู่เกินกำหนด</td>
                                            <td><span>{`${userData?.is_over_stay ? (userData?.is_over_stay === 'Y' ? 'เกินกำหนด' : 'ไม่เกินกำหนด') : '-'}`}</span></td>
                                            {/* <td><span>{`${userData?.date_of_permission_stay ? moment(userData?.date_of_permission_stay, 'DDMMYYYY').isBefore(moment()) ? 'เกินกำหนด' : 'ไม่เกินกำหนด' : '-'}`}</span></td> */}
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            )}
            {userData?.is_datafound === 'N' && id?.length > 0 &&
                <Row>
                    <Col xs='12'>
                        <Alert color='danger' className='w-100 mb-0'>
                            <div className='alert-body p-2'>ไม่พบข้อมูลหนังสือเดินทาง กรุณาตรวจสอบใหม่</div>
                        </Alert>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default Home

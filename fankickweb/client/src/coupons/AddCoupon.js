import React from 'react';
import { Icon, Col, Row, Button } from 'antd';
import { Link } from 'react-router';
import $ from 'jquery';
import './AddCoupon.css';
//import css from './Coupons.css';
import Dashboard from '../Dashboard/Dashboard';
import AddCouponCode from './newcopuons/AddCouponCode';
import AddNewCoupon from './newcopuons/AddNewCoupon';





class AddCoupon extends React.Component {
    state ={
        size : 'large',
        resetData : []
    };
  
componentDidMount(){
    $(function () {

        // Then hide the second div
        $("#div2").hide();
    
        // Then add a click handlers to the buttons
        $("#button1").click(function () {
            $("#div1").show();
            $("#div2").hide();
            $(this).addClass('addbuttonColor');
            $('#button2').removeClass('addbuttonColor');
        });
        $("#button2").click(function () {
            $(this).addClass('addbuttonColor');
            $('#button1').removeClass('addbuttonColor');
            $("#div1").hide();
            $("#div2").show();
        });
    })
}

    render() {
        return (
            <Dashboard>
                <div>
                    <Row>
                        <Col span={20}>
                            <h2 className="MarginTop20"><b>Coupons Configuration</b></h2>
                        </Col>
                        <Col span={4} className="padng10">
                            <Link to="/allcoupons"> <Button type="primary" className="createFun2Win MarginTop20"><Icon type="arrow-left" />Back To Coupons</Button></Link>
                        </Col>
                    </Row>
                    
                     <Row className="Addcoupnsnavgations">
                        <Col span={24} className="AddCouponsNewcomp">
                            <Col span={3} >
                                <p style={{ textAlign: 'center' }} id="button1" className="addbuttonColor" >Add New Coupon</p>
                            </Col>
                            <Col span={3} className="AddcouponTab2">
                                <p style={{ textAlign: 'center' }} id="button2" >Add Coupon Code</p>
                            </Col>
                        </Col>
                    </Row>
                    </div>

                   
                     <div id="div1">
                    <AddNewCoupon />
                    </div>
                   <div id="div2">         
                  <AddCouponCode />
                </div>
            </Dashboard>
        );
    }
}
export default AddCoupon;
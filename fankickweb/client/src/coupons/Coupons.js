/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import css from './Coupons.css';
import axios from 'axios';
import $ from "jquery";
import Dashboard from '../Dashboard/Dashboard'
import { Layout, Menu, Breadcrumb, Icon, Col, Card, Button } from 'antd';
import challengepng from '../images/challenge.png';
//import CouponsPage from './CouponsPage';
import CouponsDashboard from './CouponsDashboard';
const { Header, Content, Footer, Sider } = Layout;

class Coupons extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            totalcontests: []
        }
    }

    componentDidMount() {

        $(".localIdentName-layout__leftMenu").show();
        $(".localIdentName-layout__rightMenu").show();
        $(".ant-layout-header").show();
        $(".ant-layout-footer").show();
    }
    render() {
        return (
            <Dashboard>
                <div>
                  
                        <CouponsDashboard />
                    {/* <CouponsPage /> */}
                </div>
            </Dashboard>
        );

    }
}


export default (Coupons);
/* eslint-disable */
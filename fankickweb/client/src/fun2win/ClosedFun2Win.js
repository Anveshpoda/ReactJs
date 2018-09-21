/* eslint-disable */
import React from 'react';
import { Link } from 'react-router';
import css from './FuntoWinmain.css';
import { Layout, Menu, Breadcrumb, Icon, Col, Card, Button, Dropdown, message, Select, Modal } from 'antd';
import challengepng from '../images/challenge.png';
import ClosedList from './ClosedList';
import Dashboard from '../Dashboard/Dashboard';
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;

class ClosedChallenge extends React.Component {
    render() {


        return (
            <Dashboard>
                <div>
                    <div>
                        <ClosedList />
                    </div>
                </div>
            </Dashboard>
        )
    }
}


export default (ClosedChallenge);
/* eslint-disable */
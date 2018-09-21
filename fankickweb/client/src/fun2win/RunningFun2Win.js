/* eslint-disable */
import React from 'react';
import { Link } from 'react-router';
import css from './FuntoWinmain.css';
import Dashboard from '../Dashboard/Dashboard'
import { Layout, Menu, Breadcrumb, Icon, Col, Card, Button, Select } from 'antd';
import challengepng from '../images/challenge.png';
import RunningList from './RunningList';
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;
class RunningChallenge extends React.Component {
    render() {


        return (
            <Dashboard>
                <div>
                    <div>
                        <RunningList />
                    </div>
                </div>
            </Dashboard>
        )
    }
}


export default (RunningChallenge);
/* eslint-disable */
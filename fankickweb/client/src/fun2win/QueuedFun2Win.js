/* eslint-disable */
import React from 'react';
import { Link } from 'react-router';
import css from './FuntoWinmain.css';
import { Layout, Menu, Breadcrumb, Icon, Col, Card, Button, Select } from 'antd';
import challengepng from '../images/challenge.png';

import QueuedList from './QueuedList';
import Dashboard from '../Dashboard/Dashboard';

const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;

class QueuedChallenge extends React.Component {
    render() {

        return (
            <Dashboard>
                <div>
                    <div>
                        <QueuedList />
                    </div>
                </div>
            </Dashboard>
        )
    }
}


export default (QueuedChallenge);
/* eslint-disable */
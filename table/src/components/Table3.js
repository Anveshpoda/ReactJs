import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} 
        from 'react-bootstrap-table'
//import '../css/Table.css'
import './Table.css'; 
//import '../dist/react-bootstrap-table-all.min.css'
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
 
 
function rowClassNameFormat(row, rowIdx) {
  // row is whole row object
  // rowIdx is index of row
  console.log(row)
//   return row['name'] === 'George Michael' ? 
//     'GeorgeMichael-Row' : 'Other-Row';
}
 
 
class Table3 extends Component {
  render() {
    return (
      <div>
       
        <BootstrapTable data={this.props.data} 
                        trClassName={rowClassNameFormat}
        >
          <TableHeaderColumn isKey dataField='id'
          >
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField='name'
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField='value'
          >
            Value
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}
 
export default Table3
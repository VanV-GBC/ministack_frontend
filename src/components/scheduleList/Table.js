import React, { Component } from 'react'
//import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

import DataTable from 'react-data-table-component'


const columns = [
    {
        name: 'Name',
        selector: (row) => row.values.name,
        sortable: true
    },
    {
        name: 'Description',
        selector: (row) => row.values.description,
        sortable: true
    },
    {
        name: 'Action',
        minWidth: "30%",
        sortable: false,
        button: true,
        cell: (row) => {
            //console.log("data: ", row)
            return <div>
                <Link to={'/edit/' + row.values.key} className="btn btn-success">
                    Edit
                </Link>{'  '}
                <Button type="button" key={row.values.key} onClick={() => row.onDeleted(row.values.key)} className="btn btn-danger">
                    Delete
                </Button>
            </div>
        }
    }
    
]
class Table extends Component {
    

    render() {
        //console.log("props:", this.props.data)
        return (
            // <tr>
            //     <td>{this.props.obj.name}</td>
            //     <td>{this.props.obj.description}</td>
            //     <td>
            //         <Link to={'/edit/' + this.props.obj.id} className="btn btn-success">
            //             Edit
            //         </Link>
            //     </td>
            //     <td>
            //         <Button type="button" onClick={this.DeleteSchedule} className="btn btn-danger">
            //             Delete
            //         </Button>
            //     </td>
            // </tr>
            <DataTable columns={columns} data={this.props.data} expandableRows /> //data={this.dataTable()}


        )
    }
}





export default Table
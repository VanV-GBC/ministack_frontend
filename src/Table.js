import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

class Table extends Component {

    DeleteSchedule = () => {
        axios.delete('https://localhost:7155/DeleteSchedule?id=' + this.props.obj.id).then((json) => {
            if (json.data.status === 'Success') {
                alert('Record deleted successfully')
            }
        })
    }
    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.description}</td>
                <td>
                    <Link to={'/edit/' + this.props.obj.Id} className="btn btn-success">
                        Edit
                    </Link>
                </td>
                <td>
                    <Button type="button" onClick={this.DeleteSchedule} className="btn btn-danger">
                        Delete
                    </Button>
                </td>
            </tr>
        )
    }
}

export default Table
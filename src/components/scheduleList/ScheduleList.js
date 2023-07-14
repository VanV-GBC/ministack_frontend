import React, { Component } from 'react'
import axios from 'axios'
import Table from './Table'
import { Container } from 'reactstrap'

export default class ScheduleList extends Component {
    constructor(props) {
        super(props)
        this.state = { business: [] }
    }

    componentDidMount() {
        axios
            .get('https://localhost:7155/GetSchedules')
            .then((response) => {
                this.setState({ business: response.data })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    onBusinessDeleted = (id) => {
        console.log("onBusinessDeleted id:", id)
        this.setState( (state) => ({ business : state.business.filter(x => x.id !== id) }))
        this.DeleteSchedule(id)
    }

    DeleteSchedule = (id) => {
        console.log("deleteSchedule id:", id)
        
        axios.delete('https://localhost:7155/DeleteSchedule?id=' + id).then((json) => {
            if (json.data.status === 'Success') {
                alert('Record deleted successfully')
            }
        })
        
    }

    // tabRow() {
    //     return this.state.business.map( object => {
    //         return <Table obj={object} key={object.id} onDeleted={this.onBusinessDeleted} />
    //     })
    // }

    dataTable (){
        return this.state.business.map( object => {
            return {values: { name: object.name, description: object.description, key: object.id }, onDeleted: this.onBusinessDeleted }
        })
    }

    
    render() {
        //console.log("state:", this.state)
        return (
            <Container className="App">
                <h4 className="PageHeading light-text">Schedules List</h4>
                
                {/* <table className="table" style={{ marginTop: 10 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th colSpan="4">Action</th>
                        </tr>
                    </thead>
                    <tbody>{this.tabRow()}</tbody>
                </table> */}

                <Table data={this.dataTable()}/>

                
            </Container>
        )
    }
}
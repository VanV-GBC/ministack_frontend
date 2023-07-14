import React from 'react'
import axios from 'axios'
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import AddScheduleCalendar from './AddSchedCalendar'

class AddSchedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: '',
            Description: '',
            calendarToggle: false
        }
        
    }

    AddSchedule = () => {
        axios
            .post('https://localhost:7155/AddOrUpdateSchedule?name=' + this.state.Name + '&Description=' + this.state.Description)
            .then((json) => {
                if (json.data.status === 'Success') {
                    console.log(json.data.status)
                    alert('Data Save Successfully')
                    this.props.history.push('/ScheduleList')
                } else {
                    alert('Data not Saved')
                    this.props.history.push('/ScheduleList')
                }
            })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    CalendarToggle = () => {
        this.setState(prevState => ({
            calendarToggle: !prevState.calendarToggle
          }));
    }


    render() {
        return (
            <Container className="App">
                <h4 className="PageHeading light-text">Enter Schedule Details</h4>
                <Form className="form">
                    <FormGroup row>
                        <Label for="Name" sm={2} className='light-text'>
                            Name
                        </Label>
                        <Input
                            type="text"
                            name="Name"
                            id="Name"
                            onChange={this.handleChange}
                            placeholder="Enter Name"
                        />
                    </FormGroup>
                    <FormGroup row>
                        <Label for="Description" sm={2} className='light-text'>
                            Description
                        </Label>
                        <Input
                            type="text"
                            name="Description"
                            onChange={this.handleChange}
                            placeholder="Enter Description"
                        />
                    </FormGroup>

                    <div>
                        { this.state.calendarToggle ? <AddScheduleCalendar/> : null }
                    </div>

                    <Button type="button" onClick={this.CalendarToggle} className="btn btn-success">
                        { this.state.calendarToggle ? "Clear Events" : "Add Events" }
                    </Button>{' '}

                    <Button type="button" onClick={this.AddSchedule} className="btn btn-success">
                        Submit
                    </Button>{' '}
                    <Button color="danger">Cancel</Button>{' '}
                </Form>
            </Container>
        )
    }
}

export default AddSchedule
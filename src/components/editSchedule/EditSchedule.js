import React from 'react'
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios'

class EditSchedule extends React.Component {
    constructor(props) {
        super(props)

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            Name: '',
            Description: '',
        }
    }

    componentDidMount() {
        axios
            .get('https://localhost:7155/GetScheduleById?id=' + this.props.match.params.id)
            .then((response) => {
                console.log("res:", response)
                this.setState({
                    Name: response.data.name,
                    Description: response.data.description,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    onChangeName(e) {
        this.setState({
            Name: e.target.value,
        })
    }
    onChangeDescription(e) {
        this.setState({
            Description: e.target.value,
        })
    }

    onSubmit(e) {
        e.preventDefault()
        const obj = {
            Id: this.props.match.params.id,
            Name: this.state.Name,
            Description: this.state.Description,
        }
        axios.post('https://localhost:7155/AddOrUpdateSchedule/?Id=' + this.props.match.params.id + '&Name='+ this.state.Name + '&Description='+ this.state.Description, obj).then((res) => console.log(res.data))

        this.props.history.push('/ScheduleList')
    }
    render() {
        return (
            <Container className="App">
                <h4 className="PageHeading light-text">Update Schedule Details</h4>
                <Form className="form" onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="Name" sm={2} className='light-text'>
                            Name
                        </Label>
                        <Input
                            type="text"
                            name="Name"
                            value={this.state.Name}
                            onChange={this.onChangeName}
                            placeholder="Enter Name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Description" sm={2} className='light-text'>
                            Description
                        </Label>
                        <Input
                            type="text"
                            name="Description"
                            value={this.state.Description}
                            onChange={this.onChangeDescription}
                            placeholder="Enter Description"
                        />
                    </FormGroup>
                    <Button type="submit" color="success">
                        Submit
                    </Button>
                    <Button color="danger">Cancel</Button>{' '}
                </Form>
            </Container>
        )
    }
}

export default EditSchedule
import { useState, useRef } from 'react';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import { Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap-icons/font/bootstrap-icons.css'; // needs additional webpack config!
import bootstrap5Plugin from '@fullcalendar/bootstrap5';


import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

//import PropTypes from 'prop-types';

//import { computeEdges } from '@fullcalendar/core/internal';

// eventID
let eventGuid = 0

const AddScheduleCalendar = _ => {
    
    const calendarRef = useRef(null);
    //const [calendarApi, setCalendarApi] = useState()
    //const [eventInfo, setEventInfo] = useState() 
   
    const [modalTitle, setModalTitle] = useState(null)
    const [modalEventDescription, setModalEventDescription] = useState(null)
    const [modalAddressLine1, setModalAddressLine1] = useState(null)
    const [modalAddressLine2, setModalAddressLine2] = useState(null)
    const [modalCountry, setModalCountry] = useState(null)
    const [modalCountryCode, setModalCountryCode] = useState(null)
    const [modalState, setModalState] = useState(null)
    const [modalProvince, setModalProvince] = useState(null)
    const [modalPostalCode, setModalPostalCode] = useState(null)
    const [modalRegion, setModalRegion] = useState(null)
    const [modalCity, setModalCity] = useState(null)
    const [modalPhone, setModalPhone] = useState(null)
    
    const [stateProvinceRegion, setStateProvinceRegion] = useState('State')
    
    //const [modalEventLocation, setModalEventLocation] = useState({ })
    
    
    const [tempEvent, setTempEvent] = useState([])
    const [localEvents, setLocalEvents] = useState([])
    const [lastAddedEventId, setLastAddedEventId] = useState('')
    
    const [modal, setModal] = useState(false);
    const modalToggle = () => setModal(!modal);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownToggle = () => setDropdownOpen((prevState) => !prevState)

    
    
    // useEffect( _ => {
        
    // }, [])


    const addToLocalEvents = () => {
        modalToggle()
        const event = {
            Title: modalTitle,
            Description: modalEventDescription,
            StartDateTime: '',
            EndDateTime: '',
            Location: {
                AddressLine1: modalAddressLine1,
                AddressLine2: modalAddressLine2,
                Country: modalCountry,
                CountryCode: modalCountryCode,
                State: modalState,
                Province: modalProvince,
                Region: modalRegion,
                PostalCode: modalPostalCode,
                City: modalCity,
                Phone: modalPhone
            }
        }
        setTempEvent([event]);

        modalToggle()

    }   
    

    function handleEventSelect(eventInfo) {
        let calendarApi = eventInfo.view.calendar
      
        calendarApi.unselect() // clear date selection
        let eId = createEventId()
        
        calendarApi.addEvent({
          id: eId,
          title: 'In Progress...',
          start: eventInfo.startStr,
          end: eventInfo.endStr,
          extendedProps: {},
          backgroundColor: "rgba(255, 167, 0, 0.75)",
          borderColor: "rgba(255, 167, 0, 0.75)",

        })
        setLastAddedEventId(eId);

    
        const Events = calendarApi.getEvents()
        calendarApi.removeAllEvents()
        modalToggle()
        setLocalEvents(Events)
    }


    return (
        <div className='col-lg-6 mb-4'>
              
            <Modal isOpen={modal} toggle={modalToggle}>
                <ModalHeader toggle={modalToggle}>Event Details</ModalHeader>
                <ModalBody>
              
                    <Form className="form">
                        <FormGroup row>
                            <Label for="Title" sm={2} >
                                Title
                            </Label>
                            <Input
                                type="text"
                                name="Title"
                                id="Title"
                                onChange={e => setModalTitle(e.target.value)}
                                placeholder="Enter Event Title"
                            />
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Description" sm={2} >
                                Event Description
                            </Label>
                            <Input
                                type="textarea"
                                name="Description"
                                onChange={e => setModalEventDescription(e.target.value)}
                                placeholder="Enter Description"
                            />
                        </FormGroup>
                        <br/>
                        <hr/>
                        <h3>Location</h3>

                        <FormGroup row>
                            <Label for="AddressLine1" sm={2} >
                                Address Line 1
                            </Label>
                            <Input
                                type="text"
                                name="AddressLine1"
                                id="AddressLine1"
                                onChange={e => setModalAddressLine1(e.target.value)}
                                placeholder="Enter Address Line 1"
                            />
                        </FormGroup>

                        <FormGroup row>
                            <Label for="AddressLine2" sm={2} >
                                Address Line 2
                            </Label>
                            <Input
                                type="text"
                                name="AddressLine2"
                                id="AddressLine2"
                                onChange={e => setModalAddressLine2(e.target.value)}
                                placeholder="Enter Address Line 2"
                            />
                        </FormGroup>

                        <FormGroup row>
                            <Label for="PostalCode" sm={1} >
                                Postal Code
                            </Label>
                            <Input
                                type="text"
                                name="PostalCode"
                                id="PostalCode"
                                onChange={e => setModalPostalCode(e.target.value)}
                                placeholder="Enter Postal Code"
                            />
                        </FormGroup>

                        <FormGroup row>
                            <Label for="City" sm={1} >
                                City
                            </Label>
                            <Input
                                type="text"
                                name="City"
                                id="City"
                                onChange={e => setModalCity(e.target.value)}
                                placeholder="Enter City"
                            />
                        </FormGroup>

                        <FormGroup row>
                        
                            <Dropdown isOpen={dropdownOpen} toggle={dropdownToggle} >
                                <DropdownToggle caret>{stateProvinceRegion}</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem value='State' onSelect={e => setStateProvinceRegion(e.target.value)}>State</DropdownItem>
                                    <DropdownItem value='Province' onSelect={e => setStateProvinceRegion(e.target.value)}>Province</DropdownItem>
                                    <DropdownItem value='Region' onSelect={e => setStateProvinceRegion(e.target.value)}>Region</DropdownItem>
                                    </DropdownMenu>
                            </Dropdown>
                            <Input
                                type="text"
                                name="StateProvinceRegion"
                                id="StateProvinceRegion"
                                onChange={e => setModalState(e.target.value)}
                                placeholder="Enter State/Province/Region"
                            />
                        </FormGroup>

                        <FormGroup row>
                            <Label for="Country" sm={2} >
                                Country Code
                            </Label>
                            <Input
                                type="text"
                                name="Country"
                                id="Country"
                                onChange={e => setModalCountry(e.target.value)}
                                placeholder="Enter Country Code"
                            />
                        </FormGroup>

                        <FormGroup row>
                            <Label for="CountryCode" sm={2} >
                                Country Code
                            </Label>
                            <Input
                                type="text"
                                name="CountryCode"
                                id="CountryCode"
                                onChange={e => setModalCountryCode(e.target.value)}
                                placeholder="Enter Country Code"
                            />
                        </FormGroup>

                        <FormGroup row>
                            <Label for="Phone" sm={1} >
                                Phone Number
                            </Label>
                            <Input
                                type="text"
                                name="Phone"
                                id="Phone"
                                onChange={e => setModalPhone(e.target.value)}
                                placeholder="Enter Phone Number"
                            />
                        </FormGroup>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={addToLocalEvents}>
                        Add Event
                    </Button>{' '}
                    <Button color="secondary" onClick={modalToggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
                                  
            <Card className='CardNoSizing'>
                <CardTitle>Events</CardTitle>
                <CardBody>
                    <FullCalendar id="C2"
                        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin ]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        ref={calendarRef}
                        initialView="timeGridWeek"
                        editable={true}
                        selectable={true}
                        navLinks={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={true}
                        eventContent={renderEventContent}
                        dateClick={handleDateClick}
                        select={handleEventSelect}
                        eventClick={handleEventClick}
                        events={localEvents}
                        allDaySlot={false}
                    />
                </CardBody>
            </Card>
        </div>
    )

}



function createEventId() {
    console.log(eventGuid)
    return String("local_" + eventGuid++)
}

function handleEventClick(clickInfo) {
    clickInfo.event.remove()
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove()
    // }
}

function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.event.title}</b>
      </>
    )
}

function handleDateClick(arg) {
    // console.log(arg.dateStr)
    // console.log(arg)
}

export default AddScheduleCalendar
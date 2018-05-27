import React from 'react';
import { Grid, Col, Row, Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import style from './App.css'

import { subscribeToMessage } from './__data__/socket'
import { ChatWindow, Contacts, InputMessage } from './components'
import { fetchMessages, fetchContacts, fetchCurrentUser, addMessage } from './__data__/actions'

const mapDispatchToProps = (dispatch) => ({ 
  fetchMessages: bindActionCreators (fetchMessages, dispatch),
  fetchContacts: bindActionCreators (fetchContacts, dispatch),
  fetchCurrentUser: bindActionCreators (fetchCurrentUser, dispatch),
  addMessage: bindActionCreators(addMessage, dispatch)
})

const mapStateToProps = (state) => ({ 
    messages: state.messages,
    contacts: state.contacts,
    currentUser: state.currentUser
})

class App extends React.Component {
    constructor (props){
        super(props)
        subscribeToMessage((err, message) => this.props.addMessage(message))
    }

    componentDidMount () {
        this.props.fetchMessages()
        this.props.fetchContacts()
        this.props.fetchCurrentUser()
    }

    render() {
        const { currentUser, messages, contacts } = this.props

      return (
        <Grid>
            <Row>
                <Navbar inverse collapseOnSelect fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">SberCHAT</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="#">
                                About
                            </NavItem>
                            <NavDropdown eventKey={3} title="Settings" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>Action</MenuItem>
                                <MenuItem eventKey={3.2}>Another action</MenuItem>
                                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#">
                               { currentUser.auth ? 'Logout' : 'Login' }
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Row>
            <Row className="show-grid">
                <Col md={4}>
                    <Contacts contacts={contacts} className={style.contacts}/>
                </Col>
                <Col md={8}>
                    <ChatWindow messages={messages}/>  
                </Col>
            </Row>
            <Row>
                <Col md={4} />
                <Col md={8}>
                    <InputMessage className={style.inputMessage} user={currentUser}/>
                </Col>
            </Row>
        </Grid>
      );
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);
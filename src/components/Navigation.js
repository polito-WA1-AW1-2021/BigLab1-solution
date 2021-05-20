import {Navbar, Nav, Form} from 'react-bootstrap/';
import { PersonCircle, CheckAll } from 'react-bootstrap-icons';


const Navigation = (props) => {
  const { onToggleSidebar } = props;

  return (
    <Navbar bg="success" expand="sm" variant="dark" fixed="top">
      { /* <Navbar.Toggle aria-controls="left-sidebar" onClick={this.showSidebar}/> */}
      <Navbar.Toggle aria-controls="left-sidebar" onClick={onToggleSidebar}/>
      <Navbar.Brand href="/">
        <CheckAll className="mr-1" size="30" /> ToDo Manager
      </Navbar.Brand>
      <Form inline className="my-2 my-lg-0 mx-auto d-none d-sm-block" action="#" role="search" aria-label="Quick search">
        <Form.Control className="mr-sm-2" type="search" placeholder="Search" aria-label="Search query" />
      </Form>
      <Nav className="ml-md-auto">
        <Nav.Item>
          <Nav.Link href="#">
            <PersonCircle size="30" />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  )
}

export default Navigation;
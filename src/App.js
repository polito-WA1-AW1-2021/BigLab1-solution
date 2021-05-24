import { React, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Container, Row, Col, Button, Collapse } from 'react-bootstrap/';

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import TASKS from './tasks';

import Navigation from './components/Navigation';
import Filters from './components/Filters';
import ContentList from './components/ContentList';
import ModalForm from './components/ModalForm';

import { BrowserRouter as Router, Route, useParams, useHistory, Switch, Redirect } from 'react-router-dom';

dayjs.extend(isToday);

const App = () => {

  // This state is used for enabling the mobile mode (not required)
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  // This state is an object containing the list of tasks, and the last used ID (necessary to create a new task that has a unique ID)
  const [taskList, setTaskList] = useState(TASKS);

  // use an enum
  const MODAL = { CLOSED: -2, ADD: -1 };
  const [selectedTask, setSelectedTask] = useState(MODAL.CLOSED);

  
  const toggleSidebar = () => {
    // Commented out because not required
    setOpenMobileMenu((flag) => !flag)
  }
  


  const addTask = (task) => {
    const id = Math.max(...taskList.map( t => t.id )) + 1;
    setTaskList((oldTasks) => [...oldTasks, { ...task, id: id }] );
  }

  const deleteTask = (task) => {
    setTaskList((oldTasks) => oldTasks.filter( t => t.id !== task.id ));
  }

  const updateTask = (task) => {
    setTaskList( oldTasks => oldTasks.map( t => t.id === task.id ? {...task} : t) );
  }

  const findTask = (id) => {
    return taskList.find( t => t.id === id);
  }

  // add or update a task into the list
  const handleSaveOrUpdate = (task) => {
    // if the task has an id it is an update
    if(task.id) updateTask(task); 
    // otherwise it is a new task to add
    else addTask(task);
    setSelectedTask(MODAL.CLOSED); 
  }

  const handleEdit = (task) => {
    setSelectedTask(task.id);
  }
  
  const handleClose = () => {
    setSelectedTask(MODAL.CLOSED);
  }

  // we need to render the ModalForm subject to a condition, so that it is created and destroyed every time, thus useState is called again to initialize the state variables
  return (
    <Router>
      <Container fluid>
        <Navigation onToggleSidebar={toggleSidebar} />
        <Row className="vh-100">
          <Switch>
            <Route path={["/list/:filter"]}>
              <TaskMgr collapsed={openMobileMenu} taskList={taskList} onDelete={deleteTask} onEdit={handleEdit}></TaskMgr>
              <Button variant="success" size="lg" className="fixed-right-bottom" onClick={() => setSelectedTask(MODAL.ADD)}>+</Button>
              {(selectedTask !== MODAL.CLOSED) && <ModalForm task={findTask(selectedTask)} onSave={handleSaveOrUpdate} onClose={handleClose}></ModalForm>}
            </Route>
            <Redirect to="/list/all" />
          </Switch>
        </Row>
      </Container>
    </Router>
  );

}


const TaskMgr = (props) => {

  const { collapsed, taskList, onDelete, onEdit } = props;

  // Gets active filter from route if matches, otherwise the dafault is all
  const params = useParams();
   
  // ** FILTER DEFINITIONS AND HELPER FUNCTIONS **
  const filters = {
    'all': { label: 'All', id: 'all', filterFn: () => true },
    'important': { label: 'Important', id: 'important', filterFn: t => t.important },
    'today': { label: 'Today', id: 'today', filterFn: t => t.deadline && t.deadline.isToday() },
    'nextweek': { label: 'Next 7 Days', id: 'nextweek', filterFn: t => isNextWeek(t.deadline) },
    'private': { label: 'Private', id: 'private', filterFn: t => t.private },
  };

  const activeFilter = (params && params.filter && params.filter in filters) ? params.filter : 'all';

  const isNextWeek = (d) => {
    const tomorrow = dayjs().add(1, 'day');
    const nextWeek = dayjs().add(7, 'day');
    const ret = d && (!d.isBefore(tomorrow, 'day') && !d.isAfter(nextWeek, 'day'));
    return ret;
  }

  const history = useHistory();
  // if(! (activeFilter in filters) ) history.push('/');


  // Route to the filter view
  function handleSelection(filter) {
    history.push("/list/" + filter);
  }


  return (
    <>
      <Collapse in={collapsed}>
        <Col sm={4} bg="light" className="collapse d-sm-block below-nav" id="left-sidebar">
          <Filters items={filters} defaultActiveKey={activeFilter} onSelection={handleSelection} />
        </Col>
      </Collapse>
      <Col sm={8} className="col-sm-8 col-12 below-nav">
        <h1 className="pb-3">Filter: <small className="text-muted">{activeFilter}</small></h1>
        <ContentList 
          tasks={taskList.filter(filters[activeFilter].filterFn)} 
          onDelete={onDelete} onEdit={onEdit}
          />
      </Col>
    </>
  )

}

export default App;

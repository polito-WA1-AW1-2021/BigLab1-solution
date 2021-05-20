
import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isToday from 'dayjs/plugin/isToday';

import { Form, ListGroup, Button } from 'react-bootstrap/';
import { PersonSquare, PencilSquare, Trash } from 'react-bootstrap-icons';

dayjs.extend(isYesterday).extend(isToday).extend(isTomorrow);


const formatDeadline = (d) => {
  if (!d) return '--o--';
  else if (d.isToday()) {
    return d.format('[Today at] HH:mm');
  } else if (d.isTomorrow()) {
    return d.format('[Tomorrow at] HH:mm');
  } else if (d.isYesterday()) {
    return d.format('[Yesterday at] HH:mm');
  } else {
    return d.format('dddd DD MMMM YYYY [at] HH:mm');
  }
}

const TaskRowData = (props) => {
  const { task } = props;

  return (
    <>
      <div className="flex-fill m-auto">
        <Form.Group className="m-0" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label={task.description} className={task.important ? 'important' : ''} />
        </Form.Group></div>
      <div className="flex-fill mx-2 m-auto"><PersonSquare className={task.private ? 'invisible' : ''} /></div>
      <div className="flex-fill m-auto"><small>{formatDeadline(task.deadline)}</small></div>
    </>
  )
}

const TaskRowControl = (props) => {
  const { onDelete, onEdit } = props;
  return (
    <>
      <div className="flex-fill m-auto">
        <Button variant="link" className="shadow-none" onClick={onEdit}><PencilSquare /></Button>
        <Button variant="link" className="shadow-none" onClick={onDelete}><Trash /></Button>
      </div>
    </>
  )
}


const ContentList = (props) => {
  const { tasks, onDelete, onEdit } = props;

  return (
    <>
      <ListGroup as="ul" variant="flush">
        {
          tasks.map(t => {
            return (
              <ListGroup.Item as="li" key={t.id} className="d-flex w-100 justify-content-between">
                  <TaskRowData task={t} />
                  <TaskRowControl task={t} onDelete={() => onDelete(t)} onEdit={() => onEdit(t)} />
              </ListGroup.Item>
            );
          })
        }
      </ListGroup>
    </>
  )
}

export default ContentList;
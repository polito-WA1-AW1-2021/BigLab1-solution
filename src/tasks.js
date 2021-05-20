import dayjs from 'dayjs';

// Task source model has been defined as a constant outside from the App because it will be retrieved from the server in the future
const TASKS = [
    { id: 1, description: "Complete BigLab 1C", important: false, private: true, deadline: dayjs("2021-04-26T14:30:00") },
    { id: 2, description: "Study for BigLab 1C", important: true, private: true, deadline: dayjs("2021-05-05T23:00:00") },
    { id: 3, description: "Buy some groceries", important: false, private: false, deadline: dayjs("2021-05-04T14:00:00") },
    { id: 4, description: "Read a good book", important: true, private: true },
    { id: 5, description: "Watch Mr. Robot", important: false, private: true, deadline: dayjs("2021-05-07T21:30:00") },
    { id: 6, description: "Buy some flowers", important: true, private: true, deadline: dayjs() }, // today task
    { id: 7, description: "Football match", important: false, private: false, deadline: dayjs().add(4, 'day') }, // next 7 days task
];



export default TASKS;

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar } from '@mui/material';
import { FaPlus } from 'react-icons/fa';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import { PieChart } from 'react-minimal-pie-chart';
import { Card, CardContent } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import InfoIcon from "@mui/icons-material/Info";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [task, setTask] = React.useState([])
    const [input, setInput] = React.useState('')
    const [pendingTasks, setPendingTasks] = React.useState([]);
    const [completedTasks, setCompletedTasks] = React.useState([])
    const handleButton = () => {
        if (input.trim() === "") return;
        setTask([...task, input])
        setInput("");
    }
;

    const handleTaskCompletion = (task) => {
        setPendingTasks(pendingTasks.filter(t => t !== task));
        setCompletedTasks([...completedTasks, task]);
    };
    const open1 = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const data = {
        labels: ["Pending", "Done"],
        datasets: [
            {
                label: "Tasks",
                data: [6, 5], // Replace with your dynamic data
                backgroundColor: ["#43A047", "#1B5E20"],
                hoverBackgroundColor: ["#43A047", "#1B5E20"],
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    usePointStyle: true,
                },
            },
        },
        cutout: "70%",
    };
    // const tasks = [
    //     { id: 1, title: "Buy groceries", starred: false },
    //     { id: 2, title: "Finish project report", starred: true },
    //     { id: 3, title: "Call the bank", starred: false },
    //     { id: 4, title: "Schedule dentist appointment", starred: false },
    //     { id: 5, title: "Plan weekend trip", starred: false },
    // ];

    // const completedTasks = [
    //     "Read a book",
    //     "Clean the house",
    //     "Prepare presentation",
    //     "Update blog",
    // ];
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar className='bg-white flex justify-between'>
                    <div className='flex items-center'>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={[
                                {
                                    mr: 2,
                                },
                                open && { display: 'none' },
                            ]}
                        >
                            <MenuIcon className='text-gray-500 h-3 w-4' />
                        </IconButton>
                        <Typography className='text-[#3F9142] font-bold' variant="h5" noWrap component="div">
                            To-Do List
                        </Typography>
                    </div>
                    <div>

                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List className='grid items-center justify-center'>
                    <div>
                        <Avatar
                            alt="Saif Photo"
                            src="https://i.ibb.co.com/m9TDDMz/saif-photo-jpg.jpg"
                            sx={{ width: 100, height: 100, cursor: 'pointer' }}
                            onClick={handleClick}
                        />
                        <Menu
                            anchorEl={anchorEl}
                            open={open1}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem onClick={handleClose}>My Profile</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                </List>
                <p className='text-center text-[15px] m-1'>Hey, Saif Sultan Mizan</p>
                <hr />
                <List className='bg-white shadow-lg'>
                    {['All Tasks', 'Today', 'Important', 'Planned', 'Assigned to me'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <hr />
                <List className='bg-white shadow-lg'>
                    <ListItem key={'Add list'} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <FaPlus />
                            </ListItemIcon>
                            <ListItemText primary={'Add list'} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <hr />
                <List className='bg-white shadow-lg'>
                    <Card sx={{ maxWidth: 300, margin: "0 auto", textAlign: "center" }}>
                        <CardContent>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h6" component="div">
                                    Today Tasks
                                </Typography>
                                <IconButton size="small">
                                    <InfoIcon fontSize="small" />
                                </IconButton>
                            </div>
                            <Typography variant="h3" color="text.secondary" sx={{ margin: "10px 0" }}>
                                11
                            </Typography>
                            <Doughnut data={data} options={options} />
                        </CardContent>
                    </Card>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <div className="bg-gray-50 min-h-screen p-6">
                    {/* Header */}
                    <div className="bg-green-100 p-4 rounded-md mb-6 shadow-md">
                        <div>
                            <input
                                className='bg-green-100 p-1 outline-none'
                                type="text"
                                placeholder='Add a text'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <div className="mt-4 flex justify-between items-center space-x-4 text-gray-500">
                            <div className='space-x-4'>
                                <button className="p-2 bg-white rounded-full shadow hover:text-green-600">
                                    🔔
                                </button>
                                <button className="p-2 bg-white rounded-full shadow hover:text-green-600">
                                    🔄
                                </button>
                                <button className="p-2 bg-white rounded-full shadow hover:text-green-600">
                                    📅
                                </button>
                            </div>
                            <div>
                                <button onClick={handleButton} className="text-sm px-4 py-2  bg-green-600 text-white rounded hover:bg-green-700">
                                    ADD TASK
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Pending Tasks */}
                        <h2 className="text-lg font-semibold mb-4">Pending Tasks</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            {pendingTasks.map((task, index) => (
                                <div key={index} className="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-green-600"
                                            onChange={() => handleTaskCompletion(task)}
                                        />
                                        <span className="text-gray-700">{task}</span>
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Completed Tasks */}
                        <h2 className="text-lg font-semibold mb-4">Completed Tasks</h2>
                        <ul className="space-y-2">
                            {completedTasks.map((task, index) => (
                                <li key={index} className="bg-white p-3 rounded-md shadow-md flex items-center justify-between">
                                    <span className="flex items-center space-x-2">
                                        <input type="checkbox" readOnly checked />
                                        <span className="text-gray-500 line-through">{task}</span>
                                    </span>
                                    <button className="text-gray-400 hover:text-yellow-500 text-xl">★</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Main>
        </Box>
    );
}

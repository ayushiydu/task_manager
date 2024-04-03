import DataTable from 'react-data-table-component';
import { BiSolidEditAlt } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { AiFillEye } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTask } from '../redux/reducers/taskReducer';
import { useEffect, useState } from 'react';

const TaskTable = ({ setEditModalOpen, setDeleteMoalOpen, setViewModalOpen }) => {

  const [currentTask, setCurrentTasks] = useState([])

  const dispatch = useDispatch()

  const handleView = (row) => {
    dispatch(setCurrentTask(row))
    setViewModalOpen(true)
  }
  const handleEdit = (row) => {
    dispatch(setCurrentTask(row))
    setEditModalOpen(true)
  }
  const handleDelete = (row) => {
    dispatch(setCurrentTask(row))
    setDeleteMoalOpen(true)
  }

  const { allTasks } = useSelector((state) => state.task)

  useEffect(() => {
    if (allTasks) {
      setCurrentTasks(allTasks)
    }
  }, [allTasks])
  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true
    },
    {
      name: 'Description',
      selector: row => row.description,
    },
    {
      name: "Created At",
      selector: row => row.createdAt?.substring(0, 10),
      sortable: true
    },
    {
      name: "Status",
      selector: row => row.status[0].toUpperCase() + row.status.substring(1),
      sortable: true
    },
    {
      name: "Actions",
      selector: (row) => <div className='flex items-center gap-1.5 text-2xl'>
        <button className='cursor-pointer' title='Delete' onClick={() => handleView(row)}><AiFillEye className='text-blue-600' /></button>
        <button className='cursor-pointer' title='Edit' onClick={() => handleEdit(row)}><BiSolidEditAlt className='text-green-600' /></button>
        <button className='cursor-pointer' title='Delete' onClick={() => handleDelete(row)}><MdDelete className='text-red-600' /></button>
      </div>
    }
  ];

  const customStyles = {
    headCells: {
      style: {
        background: 'black',
        color: 'white',
        fontSize: "18px",
        fontWeight: "semibold"
      },
    },
    cells: {
      style: {
        fontSize: '14.5px'
      },
    },
  };
  return (
    <div className='py-3'>
      <DataTable
        columns={columns}
        data={currentTask}
        customStyles={customStyles}
        pagination
        // responsive="true"
        fixedHeader
      />
    </div>
  )
}

export default TaskTable
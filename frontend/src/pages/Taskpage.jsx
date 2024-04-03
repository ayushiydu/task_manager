import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TaskHeader from '../components/TaskHeader'
import TaskTable from '../components/TaskTable'
import AddTaskModal from '../components/AddTaskModal'
import EditTaskModal from '../components/EditTaskModal'
import AlertModal from '../components/AlertModal'
import ViewTaskModal from '../components/ViewTaskModal'
import Loading from '../components/Loading'
import { getAllTasks } from '../redux/actions/task'
import Layout from '../Layout'

const Taskpage = () => {

  const user = useSelector((state) => state.user?.user)
  const { loading, allTasks } = useSelector((state) => state.task)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (user && allTasks?.length <= 0)
      dispatch(getAllTasks())
    if (!user) {
      navigate('/')
    }
  }, [user])

  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false);
  const [viewTaskModalOpen, setViewTaskModalOpen] = useState(false)

  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <>
      <AddTaskModal isOpen={addTaskModalOpen} onClose={() => setAddTaskModalOpen(false)} />
      <EditTaskModal isOpen={editTaskModalOpen} onClose={() => setEditTaskModalOpen(false)} />
      <AlertModal isOpen={deleteTaskModalOpen} onClose={() => setDeleteTaskModalOpen(false)} />
      <ViewTaskModal isOpen={viewTaskModalOpen} onClose={() => setViewTaskModalOpen(false)} />
      <div className='md:px-4 px-2.5 md:py-4 py-1.5'>
        <TaskHeader setAddModalOpen={setAddTaskModalOpen} />
        <TaskTable setEditModalOpen={setEditTaskModalOpen} setDeleteMoalOpen={setDeleteTaskModalOpen} setViewModalOpen={setViewTaskModalOpen} />
      </div>
    </>
  )
}
export default Layout(Taskpage)
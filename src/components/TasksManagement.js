import { useContext, useState, useEffect, useMemo, useRef } from 'react'
import { TasksContext } from './Context'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { faker } from '@faker-js/faker'

import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'

export const TasksManagement = () => {
  const { views, setViews, isUpdated, setIsUpdated, taskFilter } =
    useContext(TasksContext)
  const [value, setValue] = useState('')
  const [category, setCategory] = useState({
    type: 'Other',
    color: '#3b3b3b',
    cat_id: 'default_cat_id',
  })
  const inputRef = useRef()
  const [items, setItems] = useLocalStorage('TASKS_LIST', [])
  const [cats, setCats] = useLocalStorage('CATEGORIES_LIST', [])

  const categories_list = useMemo(() => {
    return cats.map((cat) => {
      return <option key={cat.cat_id}>{cat.type}</option>
    })
  }, [cats, isUpdated])

  const clearInput = () => {
    inputRef.current.value = ''
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const isTaskCreated = await updateTasksList()
    if (!isTaskCreated) return

    // clear input fields
    setCategory({
      ...category,
      type: 'Other',
      color: '#3b3b3b',
      cat_id: 'default_cat_id',
    })
    console.log('cleared?', { ...category })

    setValue('')
    clearInput()
    setIsUpdated(Date.now())
  }

  const updateTasksList = async () => {
    if (!value) return false

    await updateCategoriesList()

    const tasks = [...items]
    const new_task = (await createNewTask(value)) || null

    setItems([...tasks, new_task])
    return true
  }

  const updateCategoriesList = async () => {
    const categories = [...cats]

    //if category already exists - do not create new category
    const cat = categories.find((cat) => cat.type === category.type)
    if (cat) return

    const new_category = {
      type: category.type,
      color: category.color,
      cat_id: faker.datatype.uuid(),
    }

    setCategory({
      ...category,
      ...new_category,
    })

    setCats([...categories, new_category])
  }

  const handleCatColor = async (e) => {
    setCategory({
      ...category,
      color: e.target.value,
    })
    // document.documentElement.style.setProperty('--cat-color', e.target.value);
  }

  const handleCategory = async (e) => {
    const catExists = cats.find((cat) => cat.type === e.target.value)

    if (catExists) {
      console.log('it exists')
      setCategory({
        ...category,
        type: catExists.type,
        color: catExists.color,
        cat_id: catExists.cat_id,
      })
      return
    }

    //if category is empty - set default category with chosen color
    if (e.target.value === '') {
      console.log('empty here', category.type)

      setCategory({
        ...category,
        type: 'Other',
        color: category.color,
        cat_id: 'default_cat_id',
      })

      return
    }

    setCategory({
      ...category,
      type: e.target.value.trim() ? e.target.value.trim() : 'Other',
    })
  }

  const createNewTask = async (text) => {
    const uid = Math.floor(Math.random() * Date.now()).toString(16)
    console.log('category_after', category)

    const new_task = {
      content: text,
      completed: false,
      category: {
        ...category,
      },
      id: uid,
      date_created: new Date(Date.now()).toLocaleString().split(',')[0], //get date in format "dd/mm/yy", [1] - for time
    }

    return new_task
  }

  const swithView = async () => {
    const completed = views.includes('completed')
    console.log(completed)
    if (!completed) {
      setViews(['completed'])
    } else {
      setViews(['not-completed'])
    }
  }

  return (
    <div className='tasks-management'>
      <div
        className='tasks-management_user-input'
        style={{ position: 'relative' }}>
        <form>
          <input
            id='add-task'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type='text'
            name='add-task'
            placeholder='Write a new task'
            autoComplete='off'
          />

          <div className='category-choice-wrapper'>
            <input
              list='task-categories'
              id='category-choice'
              name='category-choice'
              placeholder='Other'
              ref={inputRef}
              onChange={(e) => handleCategory(e)}
              autoComplete='off'
            />
            <datalist id='task-categories'>{categories_list}</datalist>
            <input
              value={category.color}
              onChange={(e) => handleCatColor(e)}
              type='color'
              id='colors'
            />
          </div>

          <button
            type='button'
            onClick={submitHandler}
            htmlFor='add-task'
            className='btn add_task_btn'
            title='Add task'
            style={{
              position: 'absolute',
              right: '0px',
            }}>
            <AddIcon />
          </button>
        </form>
      </div>
      <Tooltip
        title={
          views.includes('not-completed') ? 'Show completed' : 'Show ongoing'
        }
        placement='bottom'>
        <a
          className='btn-floating waves-effect waves-red show_completed_btn'
          onClick={swithView}>
          <PlaylistAddCheckOutlinedIcon
            style={{
              margin: '0 auto 3px auto',
              verticalAlign: 'middle',
            }}
          />
        </a>
      </Tooltip>
    </div>
  )
}

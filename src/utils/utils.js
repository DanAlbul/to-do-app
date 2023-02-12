import { faker } from '@faker-js/faker'

export const temp_cats = [
  {
    type: 'Shopping',
    color: '#f7d000',
    cat_id: faker.datatype.uuid(),
  },
  {
    type: 'Health',
    color: '#c60821',
    cat_id: faker.datatype.uuid(),
  },
  {
    type: 'Personal',
    color: '#790e9f',
    cat_id: faker.datatype.uuid(),
  },
  {
    type: 'Work',
    color: '#048a1c',
    cat_id: faker.datatype.uuid(),
  },
  {
    type: 'Other',
    color: '#3b3b3b',
    cat_id: 'default_cat_id',
  },
]

export const generateTasks = () => {
  const todos = [
    'Finish 2nd part of "Anubis" project during',
    'Take pills and vitamines',
    'Pick up delivery from 4:00 PM',
    'Buy "spinach", "feta" and "tomatoes" for dinner pasta',
    'Meditate for 20m',
    'Make a journal note',
    'Clean the PC inside',
    'Go to the cinema on Friday at 6:30 PM',
  ]
  const tasks = []
  for (let i = 0; i < todos.length; i++) {
    const task = {
      content: todos[i],
      completed: faker.datatype.boolean(),
      category: temp_cats[Math.floor(Math.random() * temp_cats.length)],
      id: faker.datatype.uuid(),
      date_created: faker.date.past().toLocaleString().split(',')[0],
    }
    tasks.push(task)
  }
  return tasks
}

export const initializeUser = () => {
  let userDoc = JSON.parse(window.localStorage.getItem('USER_DOC'))
  if (userDoc) return userDoc

  window.localStorage.setItem(
    'USER_DOC',
    JSON.stringify({ user_id: faker.datatype.uuid() })
  )
}

export const initializeTaskList = (user) => {
  if (user) {
    const tasksStorage = JSON.parse(window.localStorage.getItem('TASKS_LIST'))
    const catsStorage = JSON.parse(
      window.localStorage.getItem('CATEGORIES_LIST')
    )
    if (!tasksStorage && !catsStorage) return
    
  } else {
    const temp_tasks = generateTasks()
    console.log('temp_tasks', temp_tasks)
    console.log('temp_cats', temp_cats)

    window.localStorage.setItem('TASKS_LIST', JSON.stringify(temp_tasks))
    window.localStorage.setItem('CATEGORIES_LIST', JSON.stringify(temp_cats))
  }
}

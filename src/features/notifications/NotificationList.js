import { formatDistance, formatDistanceToNow, parseISO } from 'date-fns'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { selectAllNotifications } from './notificationsSlice'

export  function NotificationList() {
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: "Unkonw User"
    }
    return(
      <div key={notification.id}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.message}>
          <i>{timeAgo} ago</i>
        </div>

      </div>
    )
  })

  return (
    <section>
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}

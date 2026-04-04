import { Outlet } from 'react-router-dom'

export function EntryLayout() {
  return (
    <div data-theme="dark" className="min-h-screen bg-surface-primary text-txt">
      <Outlet />
    </div>
  )
}

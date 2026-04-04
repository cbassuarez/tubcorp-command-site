import { Outlet } from 'react-router-dom'

export function EntryLayout() {
  return (
    <div className="min-h-screen bg-stage-dark text-[#f5f0e4]">
      <Outlet />
    </div>
  )
}

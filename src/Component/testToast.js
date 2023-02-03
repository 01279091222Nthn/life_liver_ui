import React from 'react'
import { toast } from 'react-hot-toast'

export const testToast = () => {
  return (
    <div>
        <button onClick={()=>{
            toast.success('hello')
        }}>hello</button>
    </div>
  )
}

import React from 'react'
import styles from './NotFound.module.css'
import NotFoundImg from './../../assets/error.svg'
export default function NotFound() {
  return (
    <>
    <div className="container mx-auto mt-20">
      <img src={NotFoundImg} alt="" />
    </div>
    </>
  )
}

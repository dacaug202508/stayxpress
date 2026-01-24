import React from 'react'
import Card from './Card'



function CardGrid() {
  return (
    <div className="p-6 sm:p-10">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-4xl font-bold">
          Featured Stays
        </h1>
        <p className="text-gray-500">
          Handpicked properties for your next memorable trip.
        </p>
      </div>

      <hr className="border-gray-300 mb-8" />

      {/* GRID */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
        place-items-center
      ">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

    </div>
  )
}

export default CardGrid

import React from 'react'
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-background shadow-sm m-4 dark:bg-backgound">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2030 <Link to="/" className="hover:underline">Streamline™</Link>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="https://github.com/tomiaishasadiq" target="_blank" className="hover:underline me-4 md:me-6" rel="noreferrer">Github</a>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/aisha-tomi-sadiq-a09808251/" target="_blank" className="hover:underline me-4 md:me-6" rel="noreferrer">Linkedln</a>
            </li>
            
        </ul>
        </div>
    </footer>

  )
}

export default Footer



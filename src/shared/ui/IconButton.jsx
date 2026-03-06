import React from 'react'


export default function IconButton({ children, onClick, title }) {
return (
<button
onClick={onClick}
title={title}
className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
>
{children}
</button>
)
}

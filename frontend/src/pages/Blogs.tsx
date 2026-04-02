import React from 'react'
import BlogCard from '../components/BlogCard'

const Blogs = () => {
  return (
    <div className='flex justify-center'>
        <div className=' max-w-xl'>
        {<BlogCard authorName={"Gaurav goswami"} title={"the title is for the testing of blog it is big because we want it to be big okayy so do not mind"} content={" Software (e.g., KMS Lighthouse) that helps organizations capture, store, and retrieve knowledge to improve efficiency and customer service. Centralized services for creating, managing, and rotating cryptographic keys to protect data. They offer high availability and integrate with cloud storage and databases.  volume activation method that allows organizations to activate Windows systems locally without connecting to Microsoft. It requires a KMS host key to set up a host server."} publishedDate={"13/04/2007"}/>}
        {<BlogCard authorName={"Gaurav goswami"} title={"the title is for the testing of blog it is big because we want it to be big okayy so do not mind"} content={" Software (e.g., KMS Lighthouse) that helps organizations capture, store, and retrieve knowledge to improve efficiency and customer service. Centralized services for creating, managing, and rotating cryptographic keys to protect data. They offer high availability and integrate with cloud storage and databases.  volume activation method that allows organizations to activate Windows systems locally without connecting to Microsoft. It requires a KMS host key to set up a host server."} publishedDate={"13/04/2007"}/>}
    </div>
    </div>
    
  )
}

export default Blogs
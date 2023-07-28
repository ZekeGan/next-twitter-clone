import React from 'react'
interface UserContentProps {
  params: {
    userId: string
    slug: string
  }
}
const UserContent: React.FC<UserContentProps> = async ({ params }) => {
  console.log(params)

  return <div>UserContent</div>
}

export default UserContent

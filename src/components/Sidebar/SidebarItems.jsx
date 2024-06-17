import React from 'react'
import HomeLink from './HomeLink'
import Notifications from './Notifications'
import ProfileLink from './ProfileLink'
import Search from './Search'
import CreatePost from './CreatePost'

const SidebarItems = () => {
    return (
        <>
			<HomeLink />
            <Search />
			<Notifications />
            <CreatePost />
			<ProfileLink />
		</>
    )
}

export default SidebarItems
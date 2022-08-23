import { IPublicLayout } from '@core/interfaces'
import React from 'react'

const PublicLayout: React.FC<IPublicLayout> = ({ children }) => {
    return (
        <div className='container'>{children}</div>
    )
}

export default PublicLayout;

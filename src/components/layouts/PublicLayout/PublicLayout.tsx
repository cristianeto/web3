import { IPublicLayout } from '@core/interfaces'
import { Navbar } from '@molecules';

const PublicLayout: React.FC<IPublicLayout> = ({ children }) => {
    return (
        <div className='container'>
            <Navbar />
            {children}
        </div>
    )
}

export default PublicLayout;

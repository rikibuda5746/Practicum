import { useEffect, useState } from 'react';
import { Item } from '../../pages/userDetails/components/userDetails.styled';


interface ClockProps { }

const Clock: React.FC<ClockProps> = (props) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (<Item>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Item>);

};

export default Clock;
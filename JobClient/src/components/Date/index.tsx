import { useEffect, useState } from 'react';
import { Item } from '../../pages/userDetails/components/userDetails.styled';

const MyDate = () => {
    const [date, setDate] = useState(new Date());
    const desiredHour = 0; // Hour to trigger the update

    useEffect(() => {
        const updateDate = () => {
            const currentHour = new Date().getHours();
            if (currentHour === desiredHour) {
                setDate(new Date());
            }
        };

        const timer = setInterval(updateDate, 60000); // Check every minute

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Item>{date.toLocaleDateString("en-GB")}</Item>
    );
};

export default MyDate;

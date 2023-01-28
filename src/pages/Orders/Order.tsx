import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

type Props = {}

const Order = (props: Props) => {

    const { id } = useParams();

    useEffect(() => {
        console.log(id);
    }, [id]);

    return (
        <div>Order</div>
    )
}

export default Order
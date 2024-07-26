'use client';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/stores/cartStore';

const TestPage = () => {

    const { items, addItem, reduceItem, removeItem, clearCart, getTotal } = useCartStore();
    const [onMounted, setOnMounted] = useState(false);

    useEffect(() => {
        setOnMounted(true);
    }, []);

    if (!onMounted) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Cart</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.id}  {item.quantity}
                    </li>
                ))}
            </ul>
            <p>Total: ${getTotal()}</p>
        </div>
    )
}

export default TestPage;
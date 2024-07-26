"use client"
import { useEffect, useState } from 'react';
import { useCartStore } from '@/stores/cartStore';

export default function Home() {

    const { items, addItem, reduceItem, removeItem, clearCart, getTotal } = useCartStore();
    const [onMounted, setOnMounted] = useState(false);

    useEffect(() => {
        setOnMounted(true);
    }, []);

    if (!onMounted) {
        return <div>Loading...</div>;
    }

    const handleAddItem = () => {
        const newItem = {
            id: '1',
            name: 'Sample Item',
            price: 100,
            quantity: 1,
        };
        addItem(newItem);
    };

    const handleReduceItem = (id: string) => {
        reduceItem(id);
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            <button onClick={handleAddItem}>Add Item</button>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price} x {item.quantity}
                        <button onClick={() => handleReduceItem(item.id)}>Reduce</button>
                        /
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <p>Total: ${getTotal()}</p>
            <button onClick={clearCart}>Clear Cart</button>
        </div>
    );
}

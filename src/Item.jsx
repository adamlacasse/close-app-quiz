import { useState } from "react";

export default function Item({ item }) {
    const [farts, setFarts] = useState('not farts');

    return (
        <>
            <li key={item.name} className={`List__item List__item--${item.color}`}>
                {item.name}
                <button type='button' onClick={() => setFarts('farts!')}>farts!</button>
            </li>
        </>
    )
}

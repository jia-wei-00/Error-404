import React from 'react';
import '../styles/pages/favourite.scss';
import { fireStore } from '../store';

const Favourite = () => {
    const list = ["bitcoin", "ethereum", "hello", "bello"];

    return (
        <div>Favourite
            <button onClick={() => {fireStore.getFavouriteList()}}>Post</button>
        </div>
    )
}

export default observer(Favourite)
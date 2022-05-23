import React from 'react'

function ItemOption({item}) {
    return <option value={item.id}>{item.name}</option>
}

export default ItemOption

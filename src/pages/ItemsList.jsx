import ItemCard from '../components/ItemCard'
import { useEffect, useState } from 'react'
import { useItemStore } from '../store/useItemStore'


const ItemsList = () => {
  const { items, getItems, stats, getStats } = useItemStore()
    const [error, setError] = useState('')
   
    const [timerId, setTimerId] = useState(undefined)
    useEffect(() => {
        async function loadItems() {
            setError("")
            try {
                getStats()
                getItems()
            } catch (error) {
                console.error(error)
                setError(error.response.data.error)
            }
        }
        loadItems()
        setTimerId(setInterval(() => {
            (async () => {
                try {
                    await getItems()
                } catch (error) {
                }
            })()
        }, 10000))
        return () => {
            clearInterval(timerId)
        }
    }, [])

    return (
        <div className="container">
            <div class="page-header">
                <h1>Все товары</h1>
            </div>
            <div class="stats">
                <div class="stat-item">
                    <span class="stat-value">{stats?.totalItems ?? 0}</span>
                    <span class="stat-label">Товаров</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{stats?.totalBids ?? 0}</span>
                    <span class="stat-label">Ставок</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{stats?.activeItems ?? 0}</span>
                    <span class="stat-label">Активных</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{stats?.averageItemPrice ?? 0}₽</span>
                    <span class="stat-label">Средняя цена</span>
                </div>
            </div>

            <div class="items-grid">
                {items.map((item, i) => (
                    <ItemCard key={i} {...item} />
                ))}
            </div>
        </div>
    )
}

export default ItemsList
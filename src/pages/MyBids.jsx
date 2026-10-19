import { useState, useEffect } from "react"
import { api } from "../api/api"

const MyBids = () => {
    const [bids, setBids] = useState([])

    useEffect(() => {
        const load = async () => {
            const res = await api.getMyBids()
            setBids(res.data)
        }
        load()
    }, [])

    const totalCount = bids.length
    const winningCount = bids.filter((bid) => bid.isWinning).length
    const totalAmount = bids.reduce((sum, bid) => sum + Number(bid.amount), 0)

    return (
        <div className="container">
            <div className="page-header">
                <h1>Мои ставки</h1>
                <p className="page-subtitle">История ваших ставок на товары</p>
            </div>

            <div className="bids-summary">
                <div className="summary-card">
                    <span className="summary-value">{totalCount}</span>
                    <span className="summary-label">Всего ставок</span>
                </div>
                <div className={`summary-card ${winningCount > 0 ? "winning" : ""}`}>
                    <span className="summary-value">{winningCount}</span>
                    <span className="summary-label">Лидирующих ставок</span>
                </div>
                <div className="summary-card">
                    <span className="summary-value">{totalAmount.toLocaleString("ru-RU")} ₽</span>
                    <span className="summary-label">Общая сумма</span>
                </div>
            </div>

            <div className="bids-list">
                {bids.map((bid) => (
                    <div className={`bid-item ${bid.isWinning ? "winning" : ""}`} key={bid.id}>
                        <div className="bid-item-content">
                            <div className="bid-item-header">
                                <a href={`/item/${bid.itemId}`} className="bid-item-title">
                                    {bid.itemTitle}
                                </a>
                                {bid.isWinning ? (
                                    <span className="winning-badge"> Лидирую</span>
                                ) : (
                                    <span className="outbid-badge">Перебита</span>
                                )}
                            </div>
                            <div className="bid-item-meta">
                                <span>⏰ {new Date(bid.createdAt).toLocaleString("ru-RU")}</span>
                            </div>
                        </div>
                        <div className="bid-item-amount">
                            <span className="bid-amount">{Number(bid.amount).toLocaleString("ru-RU")} ₽</span>
                            <span className="bid-status">Моя ставка</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyBids
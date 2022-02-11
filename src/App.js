import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Basket from './Pages/Basket/Basket'
import Home from './Pages/Home'
import axios from 'axios'
import { MainContext } from '../src/context'

const App = () => {
	const [items, setItems] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [value, setValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage] = useState(4)
	const [selectSort, setSelectSort] = useState('')

	const allItems = cartItems.length
	const allPrice = cartItems.reduce(
		(currentValue, nextValue) => (currentValue += nextValue.price),
		0
	)
	const removeItem = id => {
		axios.delete(`https://61f75dbd2e1d7e0017fd70b7.mockapi.io/cart/${id}`)
		setCartItems(prev => prev.filter(item => item.id != id))
	}
	useEffect(() => {
		async function getRender() {
			try {
				const myItems = await axios.get(
					'https://61f75dbd2e1d7e0017fd70b7.mockapi.io/Products'
				)
				const myCart = await axios.get(
					'https://61f75dbd2e1d7e0017fd70b7.mockapi.io/cart'
				)

				setItems(myItems.data)
				setCartItems(myCart.data)
			} catch (error) {
				alert(`Ошибка ${error}`)
			}
		}

		getRender()
	}, [])

	const sortItems = itemValue => {
		setSelectSort(itemValue)
		setItems([...items].sort((a, b) => a.price - b.price))
	}

	const totalItems = items.length
	const lastItemsIndex = currentPage * itemsPerPage
	const firstItemsIndex = lastItemsIndex - itemsPerPage
	const myCurrentPage = items.slice(firstItemsIndex, lastItemsIndex)

	const paginate = pageNumber => setCurrentPage(pageNumber)

	const addToCart = obj => {
		axios.post('https://61f75dbd2e1d7e0017fd70b7.mockapi.io/cart', obj)
		setCartItems(prev => [...prev, obj])
	}
	return (
		<>
			<MainContext.Provider
				value={{
					items,
					value,
					allItems,
					addToCart,
					setValue,
					cartItems,
					allPrice,
					removeItem,
					allItems,
					isLoading,
					itemsPerPage,
					totalItems,
					myCurrentPage,
					paginate,
					selectSort,
					setSelectSort,
					sortItems,
				}}
			>
				<Routes>
					<Route path='basket' element={<Basket />} />
					<Route path='/' element={<Home />} />
				</Routes>
			</MainContext.Provider>
		</>
	)
}

export default App

import React, { useContext } from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner/Banner'
import Cart from '../components/Cart/Cart'
import { MainContext } from '../context'
import Pagination from '../components/Pagination/Pagination'
import Select from '../components/Select/Select'

const Home = () => {
	const {
		items,
		value,
		setValue,
		addToCart,
		allItems,
		isLoading,
		myCurrentPage,
	} = useContext(MainContext)

	return (
		<>
			{/* Header */}
			<Header value={value} setValue={setValue} allItems={allItems} />
			{/* Main */}
			<main className='main'>
				{/* Banner */}
				<Banner />
				<div className='sort__panel'>
					<Select
						defaultValue='Sorted'
						options={[{ value: 'H price' }, { value: 'S Price' }]}
					/>
					<Pagination />
				</div>

				<div className='cart__container'>
					{isLoading
						? [...Array(12)]
						: myCurrentPage
								.filter(title =>
									title.title.toLowerCase().includes(value.toLowerCase())
								)
								.map(item => (
									<Cart
										title={item.title}
										price={item.price}
										imgUrl={item.image}
										key={item.id}
										onPlus={() => addToCart(item)}
									/>
								))}
				</div>
			</main>
		</>
	)
}

export default Home
